/* Aipim design system · https://github.com/talis-galhardi/aipim · MIT License · Copyright (c) 2026 Talis Galhardi */
/* The Brazilian field, without a page: the masks and the checks as plain functions, for a server, a framework or a
   test. Nothing here touches the DOM, so it runs in Node too:

     import { format, check, clean } from 'aipim-ds/br.js';
     check('cpf', '390.533.447-05');   // '' when it is valid, 'incomplete' or 'invalid' otherwise
     clean('date', '20/11/2026');      // '2026-11-20', the value to store or send

   tools/build_web.py copies this file into components/web/aipim.js, between the br: markers, so the field in the
   browser and these functions can never disagree. Change this file, not the copy. */
// Brazilian field. The mask is written while you type and the caret stays after the character you typed. The check
// runs when you leave the field, and an error goes away as soon as the value is valid again, so nobody is told off in
// the middle of typing. Without this script the field is a plain text field: check the value on the server too.
var DDD = '11 12 13 14 15 16 17 18 19 21 22 24 27 28 31 32 33 34 35 37 38 41 42 43 44 45 46 47 48 49 51 53 54 55 61 62 63 64 65 66 67 68 69 71 73 74 75 77 79 81 82 83 84 85 86 87 88 89 91 92 93 94 95 96 97 98 99'.split(' ');
// '#' is a slot. The punctuation between slots is written only once the slot after it has a character.
var MASKS = {
  cpf: function () { return '###.###.###-##'; },
  cnpj: function () { return '##.###.###/####-##'; },
  cep: function () { return '#####-###'; },
  phone: function (c) { return c.length > 10 ? '(##) #####-####' : '(##) ####-####'; },
  date: function () { return '##/##/####'; }
};
var SIZE = { cpf: 11, cnpj: 14, cep: 8, phone: 11, date: 8 };
// The characters that carry the value. The rest is mask, and the caret is placed by counting these.
function significant(type) { return type === 'cnpj' ? /[0-9A-Za-z]/ : type === 'money' ? /[\d,]/ : /\d/; }

// The characters of the value, without the mask. A CNPJ has letters in its first 12 places since July 2026 (the two
// check digits stay numbers). A phone pasted with +55 loses the country code.
function chars(type, value) {
  var c = '';
  String(value).toUpperCase().split('').forEach(function (ch) {
    if (type === 'cnpj' ? (c.length < 12 ? /[0-9A-Z]/ : /\d/).test(ch) : /\d/.test(ch)) c += ch;
  });
  if (type === 'phone' && c.length > 11 && c.slice(0, 2) === '55') c = c.slice(2);
  return c.slice(0, SIZE[type]);
}

// Reais: the last comma is the decimal point and dots are thousands. A pasted 1234.56 (one dot, then one or two
// digits) is read as decimals too.
function money(value, done) {
  var v = String(value).replace(/R\$|\s/g, '');
  if (v.indexOf(',') < 0 && /^[^.]*\.\d{1,2}$/.test(v)) v = v.replace('.', ',');
  var comma = v.indexOf(',');
  var whole = (comma < 0 ? v : v.slice(0, comma)).replace(/\D/g, '').replace(/^0+(?=\d)/, '');
  var cents = comma < 0 ? '' : v.slice(comma + 1).replace(/\D/g, '').slice(0, 2);
  if (!whole && comma < 0) return '';
  if (done) { whole = whole || '0'; cents = (cents + '00').slice(0, 2); }
  return 'R$ ' + (whole || '0').replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (done || comma >= 0 ? ',' + cents : '');
}

// The value with its mask. `done` is for when the person left the field: an amount gets its two decimals.
export function format(type, value, done) {
  if (type === 'money') return money(value, done);
  var c = chars(type, value), mask = MASKS[type](c), out = '', i = 0;
  for (var p = 0; p < mask.length && i < c.length; p++) out += mask[p] === '#' ? c[i++] : mask[p];
  return out;
}

function digitsOk(c, weights) {
  var sum = 0;
  for (var i = 0; i < weights.length; i++) sum += (c.charCodeAt(i) - 48) * weights[i];
  var r = sum % 11;
  return String(r < 2 ? 0 : 11 - r) === c[weights.length];
}

// '' when the value is valid or empty, 'incomplete' when it is short, 'invalid' when it cannot exist.
export function check(type, value) {
  if (type === 'money') return '';
  var c = chars(type, value);
  if (!c) return '';
  if (c.length < (type === 'phone' ? 10 : SIZE[type])) return 'incomplete';
  if (type === 'cpf') {
    return /^(\d)\1+$/.test(c) || !digitsOk(c, [10, 9, 8, 7, 6, 5, 4, 3, 2]) || !digitsOk(c, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]) ? 'invalid' : '';
  }
  if (type === 'cnpj') {
    return /^(.)\1+$/.test(c) || !digitsOk(c, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]) || !digitsOk(c, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]) ? 'invalid' : '';
  }
  if (type === 'phone') {
    // A mobile number has 11 digits and starts with 9 after the area code; a landline has 10 and starts with 2 to 5.
    return DDD.indexOf(c.slice(0, 2)) < 0 || (c.length === 11 ? c[2] !== '9' : !/[2-5]/.test(c[2])) ? 'invalid' : '';
  }
  if (type === 'date') {
    var d = +c.slice(0, 2), m = +c.slice(2, 4), y = +c.slice(4), t = new Date(y, m - 1, d);
    return y < 1000 || t.getFullYear() !== y || t.getMonth() !== m - 1 || t.getDate() !== d ? 'invalid' : '';
  }
  return '';
}

// The value to store or send: digits (a CNPJ in capitals), a date as yyyy-mm-dd, an amount as 1234.56. '' when the
// value is not valid.
export function clean(type, value) {
  if (type === 'money') return money(value, true).replace(/R\$ |\./g, '').replace(',', '.');
  var c = chars(type, value);
  if (!c || check(type, value)) return '';
  return type === 'date' ? c.slice(4) + '-' + c.slice(2, 4) + '-' + c.slice(0, 2) : c;
}
