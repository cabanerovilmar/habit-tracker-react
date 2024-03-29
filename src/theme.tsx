export function updatePWAThemeColor() {
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const metaThemeColor = document.querySelector('meta[name=theme-color]')

  if (isDarkMode) {
    metaThemeColor?.setAttribute('content', '#000000') // Dark theme color
  } else {
    metaThemeColor?.setAttribute('content', '#FFFFFF') // Light theme color
  }
}

export function watchThemeChanges() {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updatePWAThemeColor)
}

// TODO: Replace isDarkMode with actual value with the App-Level Dark Mode Setting
