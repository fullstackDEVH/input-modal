import { shortcutSettingData } from "../constant/api.js";

export const setCustomSettingLocalStorage = (
  name_localStore_set,
  dataSetting
) => {
  window.localStorage.setItem(name_localStore_set, JSON.stringify(dataSetting));
};

export const getCustomSettingLocalStorage = (name_localStore_get) => {
  let shortcuts = JSON.parse(window.localStorage.getItem(name_localStore_get));
  return shortcuts;
};

export const removeCustomSettingLocalStorage = (name_localStore_remove) => {
  window.localStorage.removeItem(name_localStore_remove);
};

export const checkLocalStorageIsAvaiable = (name_store_check) => {
  const isShortCut = getCustomSettingLocalStorage(name_store_check);
  if (!isShortCut) {
    setCustomSettingLocalStorage(name_store_check, shortcutSettingData);
  }
  return isShortCut;
};
