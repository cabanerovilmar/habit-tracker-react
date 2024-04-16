import useThemeStore from '@/core/presentation/store'
import { useUpdatePWAThemeColor } from './theme/useUpdatePWAThemeColor'

export function AppViewModel() {
  const darkModeSetting = useThemeStore(state => state.darkModeSetting)

  useUpdatePWAThemeColor()

  return {
    darkModeSetting,
  }
}
