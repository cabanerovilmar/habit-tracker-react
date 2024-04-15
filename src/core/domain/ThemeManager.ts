import * as localStorageManager from '@/core/data/LocalStorageManager'

export function setDarkMode(isDarkMode: boolean) {
  localStorageManager.setDarkMode(isDarkMode)
}

export function getDarkMode() {
  return localStorageManager.getDarkMode()
}
