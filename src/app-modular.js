import { FindlyWeb } from './modules/core.js';
import { ThemeSwitcher } from './modules/theme.js';

window.addEventListener('DOMContentLoaded', () => {
  new ThemeSwitcher();
  window.findlyWeb = new FindlyWeb();
}); 