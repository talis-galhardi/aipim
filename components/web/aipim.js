/* Aipim design system · https://github.com/talis-galhardi/aipim · MIT License · Copyright (c) 2026 Talis Galhardi */
/* Optional behavior for the components that need a little script. The CSS works without it.
   - [data-aipim-dismiss] on a button removes the closest alert, toast or tag and moves focus to the next focusable element.
     It fires a cancelable "aipim:dismiss" event first, so your code can react or stop it.
   - .aipim-tabs[role=tablist]: click, arrow keys, Home and End, aria-selected, roving tabindex and panel visibility.
   - Modal: button[command][commandfor] for browsers without invoker commands (show-modal and close).
   - Aipim.init(container): sets up tabs in content added after the page loaded. */
(function () {
  'use strict';

  var FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

  function focusAfter(el) {
    var all = Array.prototype.filter.call(document.querySelectorAll(FOCUSABLE), function (n) {
      return !el.contains(n) && n.getClientRects().length > 0;
    });
    var next = all.filter(function (n) {
      return el.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING;
    })[0] || all[all.length - 1];
    if (next) next.focus();
  }

  function dismiss(button) {
    var item = button.closest('.aipim-toast, .aipim-alert, .aipim-tag');
    if (!item) return;
    if (!item.dispatchEvent(new CustomEvent('aipim:dismiss', { bubbles: true, cancelable: true }))) return;
    focusAfter(item);
    if (item.classList.contains('aipim-toast')) {
      // The exit animation is 100ms, or 0ms with reduced motion. The timeout is a safety net.
      item.setAttribute('data-state', 'closing');
      var remove = function () { item.remove(); };
      item.addEventListener('animationend', remove, { once: true });
      setTimeout(remove, 400);
    } else {
      item.remove();
    }
  }

  function initTabs(list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    function enabled() { return tabs.filter(function (t) { return !t.disabled; }); }
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
    }
    list.addEventListener('click', function (e) {
      var tab = e.target.closest('[role="tab"]');
      if (tab && !tab.disabled) select(tab);
    });
    list.addEventListener('keydown', function (e) {
      var list_ = enabled();
      var i = list_.indexOf(document.activeElement);
      if (i < 0) return;
      var target;
      if (e.key === 'ArrowRight') target = list_[(i + 1) % list_.length];
      else if (e.key === 'ArrowLeft') target = list_[(i - 1 + list_.length) % list_.length];
      else if (e.key === 'Home') target = list_[0];
      else if (e.key === 'End') target = list_[list_.length - 1];
      if (target) { e.preventDefault(); select(target, true); }
    });
    select(enabled().filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || enabled()[0]);
  }

  document.addEventListener('click', function (e) {
    var d = e.target.closest('[data-aipim-dismiss]');
    if (d) { dismiss(d); return; }
    if ('commandForElement' in HTMLButtonElement.prototype) return;
    var b = e.target.closest('button[commandfor]');
    if (!b) return;
    var target = document.getElementById(b.getAttribute('commandfor'));
    var command = b.getAttribute('command');
    if (!target) return;
    if (command === 'show-modal' && target.showModal) target.showModal();
    else if (command === 'close' && target.close) target.close();
  });

  function init(root) {
    var scope = root && root.querySelectorAll ? root : document;
    Array.prototype.forEach.call(scope.querySelectorAll('.aipim-tabs[role="tablist"]'), initTabs);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); });
  else init();
  // For content added after load (single-page apps, Storybook): Aipim.init(container) sets up the tabs inside it.
  window.Aipim = { init: init };
})();
