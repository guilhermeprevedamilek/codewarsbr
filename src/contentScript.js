import 'toastify-js/src/toastify.css';
import Toastify from 'toastify-js';

import './contentScript.css';

import { updateKataStatusFromList } from './dashboard.js';
import { translateKatas } from './translate.js';
import {
  allNonCheckedKatasDivPracticeSelector,
  allNonCheckedKatasDivCollectionSelector,
  allNonCheckedKatasDivUsersSelector,
  kataDivsSelector,
  kataNameAsSelector,
  kataNameAsUsersSelector,
  kataDescriptionDivSelector,
} from './selectors.js';
import { translated, statusUpdated } from './controllers.js';

// DETECT URL changes on the website.
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;

  if (url !== lastUrl) {
    lastUrl = url;

    window.location.reload(true);
  }
}).observe(document, { childList: true, subtree: true });

const allNonCheckedKatasDiv = document.querySelector(
  lastUrl.split('/').includes('collections')
    ? allNonCheckedKatasDivCollectionSelector
    : lastUrl.split('/').includes('users')
    ? allNonCheckedKatasDivUsersSelector
    : allNonCheckedKatasDivPracticeSelector
);
let kataDivNodeList = document.querySelectorAll(kataDivsSelector);

const kataNameANodeListSelector = () =>
  lastUrl.split('/').includes('users')
    ? kataNameAsUsersSelector
    : kataNameAsSelector;

let kataNameANodeList = document.querySelectorAll(kataNameANodeListSelector());

const kataDescriptionDiv = document.querySelector(kataDescriptionDivSelector);

const toastDefaultConfig = {
  duration: -1,
  close: false,
  gravity: 'top', // `top` or `bottom`
  position: 'center', // `left`, `center` or `right`
  stopOnFocus: false, // Prevents dismissing of toast on hover
  className: 'toast',
  style: {
    background: '#6795de',
  },
};

if (!!allNonCheckedKatasDiv && !!kataNameANodeList.length) {
  checkStatusObserver();

  new MutationObserver(async () => {
    return await checkStatusObserver();
  }).observe(allNonCheckedKatasDiv, {
    childList: true,
    subtree: true,
  });
} else if (!!kataDescriptionDiv) {
  translateKataObserver();

  new MutationObserver(async () => {
    return await translateKataObserver();
  }).observe(kataDescriptionDiv, {
    childList: true,
  });
}

async function translateKataObserver() {
  if (
    !translated &&
    kataDescriptionDiv.innerText !== 'Loading description...'
  ) {
    const gettingInfoToast = Toastify({
      ...toastDefaultConfig,
      text: 'Obtendo informações da tradução...',
    });
    gettingInfoToast.showToast();

    translated = true;

    await translateKatas(kataDescriptionDiv);
    gettingInfoToast.hideToast();
  }
}

const kataDivNodeListGetter = () => {
  kataDivNodeList = document.querySelectorAll(kataDivsSelector);
};
const kataNameANodeListGetter = () => {
  kataNameANodeList = document.querySelectorAll(kataNameANodeListSelector());
};

async function checkStatusObserver() {
  kataDivNodeListGetter();
  kataNameANodeListGetter();

  if (!statusUpdated && !!kataNameANodeList.length) {
    const gettingInfoToast = Toastify({
      ...toastDefaultConfig,
      text: 'Obtendo informações das traduções...',
    });
    gettingInfoToast.showToast();

    statusUpdated = true;

    await updateKataStatusFromList(kataNameANodeList, kataDivNodeList);
    gettingInfoToast.hideToast();
  }
}
