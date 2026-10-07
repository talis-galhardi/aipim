import '@fontsource/antonio/700.css';
import '@fontsource/karla/400.css';
import '@fontsource/karla/700.css';
import { addons } from 'storybook/manager-api';
import theme from './theme.js';

addons.setConfig({ theme });
