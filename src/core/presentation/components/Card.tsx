import { Card as MantineCard, CardProps as MantineCardProps, useMantineColorScheme } from '@mantine/core'

// Define props type by extending Mantine's Card props
interface Props extends MantineCardProps {}

// Custom Card component that extends Mantine Card
export default function Card({ children, ...rest }: Props) {
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
