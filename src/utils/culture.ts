export const generateYearArray = (startYear: number) => {
  const currentYear = new Date().getFullYear()
  const years = []

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year)
  }

  return years.reverse()
}

export const generateYearMonthArray = (startYear: number) => {
  const currentYear = new Date().getFullYear()

  let yearMonthArray = []

  for (let year = startYear; year <= currentYear; year++) {
    for (let month = 1; month <= 12; month++) {
      yearMonthArray.push(`${year}.${month.toString().padStart(2, '0')}`)
    }
  }

  return yearMonthArray.reverse()
}
