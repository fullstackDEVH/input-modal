import { shortcutSettingData } from "../constant/api.js";

export const name_setting = "user-setting";

export const setCustomSettingLocalStorage = (
  name_localStore_set,
  dataSetting
) => {
  window.localStorage.setItem(name_localStore_set, JSON.stringify(dataSetting));
};

export const getCustomSettingLocalStorage = (name_localStore_get) => {
  try {
    return JSON.parse(window.localStorage.getItem(name_localStore_get));
  } catch (error) {
    alert(
      "There's something wrong your setting, so we will reset them to default !!"
    );
    return checkLocalStorageIsAvaiable(name_setting);
  }
};

export const removeCustomSettingLocalStorage = (name_localStore_remove) => {
  window.localStorage.removeItem(name_localStore_remove);
};

export const checkLocalStorageIsAvaiable = (name_store_check) => {
  if (!getCustomSettingLocalStorage(name_store_check)) {
    setCustomSettingLocalStorage(name_store_check, shortcutSettingData);
  }

  return getCustomSettingLocalStorage(name_store_check);
};
