import { DarkModeSetting } from '@/core/utils/type'

export function setDarkMode(mode: DarkModeSetting) {
  localStorage.setItem('darkMode', mode)
}

export function getDarkMode() {
  return (localStorage.getItem('darkMode') || 'system') as DarkModeSetting
}
