import { useResponsive } from './use-responsive'

export const useReponsiveCard = (numberItemPerRow: number = 3) => {
  const lgDown = useResponsive('down', 'xl')
  const lgUp = useResponsive('up', 170)

  const countItemInRow = lgUp ? numberItemPerRow : !lgDown ? 3 : 2
  const width = `calc((100% - ${12 * (countItemInRow - 1)}px) / ${countItemInRow})`
  return width
}
