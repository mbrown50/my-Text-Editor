import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

import { postDb, getAllDb } from './database';

// code for src-sw.js moved to register-sw 
// Require registerSW method
import { registerSW } from './register-sw';

import logo from '../../favicon.ico'

document.getElementById("logo").src = logo;

/*
form.addEventListener('submit', (event) => {
  postDb(jate);
  fetchList();
});
*/

const fetchList = async () => {
  const result = await getAllDb();
  console.log(result);
};

fetchList();

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

