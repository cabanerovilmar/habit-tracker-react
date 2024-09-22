import { Text as MantineText } from '@mantine/core'

interface Props {
  children: React.ReactNode
  className?: string
}

export function Text(props: Props): JSX.Element {
  const { children, className = '', ...rest } = props
  return (
    <MantineText className={`text-base ${className}`} {...rest}>
      {children}
    </MantineText>
  )
}
