import { Card as MantineCard, CardProps as MantineCardProps, useMantineColorScheme } from '@mantine/core'

// Define props type by extending Mantine's Card props
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends MantineCardProps {}

// Custom Card component that extends Mantine Card
export function Card(props: Props): JSX.Element {
  const { children, ...rest } = props
  const { colorScheme } = useMantineColorScheme()

  return (
    <MantineCard
      withBorder={colorScheme === 'light'}
      {...rest} // Spread the rest of Mantine Card props
    >
      {children}
    </MantineCard>
  )
}
