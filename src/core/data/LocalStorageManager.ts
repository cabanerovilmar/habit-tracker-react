export function setDarkMode(isDarkMode: boolean) {
  localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode))
}

export function getDarkMode() {
  return JSON.parse(localStorage.getItem('isDarkMode') || 'false') as boolean
}
