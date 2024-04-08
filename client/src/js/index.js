import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';
// Require registerSW method
import { registerSW } from './register-sw';

import { postDb, getAllDb } from './database';

//import logo from '../../favicon.ico'

//document.getElementById("logo").src = logo;

/*
form.addEventListener('submit', (event) => {
  postDb(jate);
  fetchList();
});
*/

/*
const fetchList = async () => {
  const result = await getAllDb();
  console.log(result);
};
*/

//fetchList();

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}

// Call registerSW method
registerSW();