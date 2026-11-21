import './styles/main.css';
import { ValuationApp } from './ui/app';

document.addEventListener('DOMContentLoaded', () => {
  const app = new ValuationApp();
  app.init();
});
