import * as localStorageManager from '@/core/data/local-storage-manager'
import { DarkModeSetting } from '@/core/utils/type'

export function setDarkMode(darkModeSetting: DarkModeSetting) {
  localStorageManager.setDarkMode(darkModeSetting)
}

export function getDarkMode() {
  return localStorageManager.getDarkMode()
}
