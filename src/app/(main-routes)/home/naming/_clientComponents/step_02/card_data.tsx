const dataCart = [
  {
    title: <>기술적/혁신적 네이밍</>,
    idCard: 1
  },
  {
    title: <>기술적/혁신적 네이밍</>,
    idCard: 2
  },
  {
    title: <>기술적/혁신적 네이밍</>,
    idCard: 3
  },
  {
    title: <>기술적/혁신적 네이밍</>,
    idCard: 4
  },
  {
    title: <>기술적/혁신적 네이밍</>,
    idCard: 5
  },
  {
    title: <>기술적/혁신적 네이밍</>,
    idCard: 6
  },
  {
    title: <>기술적/혁신적 네이밍</>,
    idCard: 7
  },
  {
    title: <>기술적/혁신적 네이밍</>,
    idCard: 8
  }
]

export const cardData = dataCart.map((item) => ({
  ...item,
  title: <> {item.title}</>
}))
