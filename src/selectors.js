export const allNonCheckedKatasDivPracticeSelector =
  '#shell_content > ul + section > div:nth-last-child(1)';

export const allNonCheckedKatasDivCollectionSelector =
  '#shell_content > div:nth-last-child(1) .collection-items';

export const allNonCheckedKatasDivUsersSelector =
  '#shell_content ul + div > div:nth-last-child(1) .items-list';

export const kataDivsSelector = "div.list-item-kata:not([id=''])";

export const kataNameAsSelector =
  'a.ml-2[href^="/kata/"]:not([checked="true"])';

export const kataNameAsUsersSelector =
  '.item-title > a[href^="/kata/"]:not([checked="true"])';

export const kataDescriptionDivSelector = '#description';

export const languageSelectorDropdown = '#language_dd span';
