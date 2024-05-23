import Image from 'next/image'
import { useState, useEffect, useRef, MouseEvent } from 'react'
import { Box, Select, MenuItem, SelectChangeEvent, FormControl, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { convertToRem } from '@/utils/convert-to-rem'
import Input from '@/elements/custom-input'
import ArrowIcon from '@/assets/icons/arrow'
import NoteChromeBrowser from '@/assets/images/note-chrome-browser.png'
import { IGoogleTrendingCountry } from '@/types/advertisement-marketing.type'
import { getGoogleTrendingCountries } from '@/services/advertisement-marketing.service'
import { sxInputGoogleTrendingCustom, DATA_DATETIME } from './../../utils'
import useGoogleTrending from './useGoogleTrending'
import styles from './style.module.scss'

function GoogleTrending() {
  const { palette } = useTheme()
  const [comparisonItemA, setComparisonItemA] = useState('')
  const [comparisonItemB, setComparisonItemB] = useState('')
  const [datetime, setDatetime] = useState('today 12-m')
  const [geo, setGeo] = useState('')

  const [selectedCountry, setSelectedCountry] = useState('worldwide')
  const [dataCountryList, setDataCountryList] = useState<IGoogleTrendingCountry[]>([])
  const countryPrevIndexRef = useRef<number[]>([])

  const { showGoogleTrendChart } = useGoogleTrending({ comparisonItemA, comparisonItemB, datetime, geo })
  const { data: dataCountries = [] } = useQuery({
    queryKey: [`google-trending-countries`],
    queryFn: () => getGoogleTrendingCountries(),
    meta: { offLoading: true }
  })

  // =====
  useEffect(() => {
    if (dataCountries?.length > 0) {
      setDataCountryList(dataCountries)
    }
  }, [dataCountries])

  const handleChangeSelectedCountry = (e: SelectChangeEvent) => {
    const { value } = e.target
    const prevIndex = countryPrevIndexRef.current?.length - 1
    const prevCountry = dataCountries?.[countryPrevIndexRef.current[prevIndex]]

    let geoValue = prevCountry
      ? `${countryPrevIndexRef.current
          ?.slice(0, prevIndex + 1)
          ?.map((index) => dataCountries?.[index]?.id)
          ?.join('-')}-${value}`
      : value === 'worldwide'
      ? ''
      : value

    setSelectedCountry(value)
    setGeo(geoValue)
  }

  const handleClickMore = (e: MouseEvent<HTMLDivElement>, index: number) => {
    e.stopPropagation()
    countryPrevIndexRef.current.push(index)

    const newOptionsCountries = dataCountryList?.[index]?.children ?? []
    setDataCountryList(newOptionsCountries)
  }

  const handleClickBack = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    countryPrevIndexRef.current.pop()

    const lastIndex = countryPrevIndexRef.current?.[countryPrevIndexRef.current?.length - 1] || -1
    const newOptionsCountries = lastIndex >= 0 ? dataCountries?.[lastIndex]?.children ?? [] : dataCountries ?? []
    setDataCountryList(newOptionsCountries)
  }

  // =====
  if (!showGoogleTrendChart) {
    return (
      <Box>
        <Image
          className={styles.image_background}
          src={NoteChromeBrowser}
          alt='We recommend the fast and secure Chrome web browser.'
        />
      </Box>
    )
  }
  return (
    <Box className={styles.box_wrapper} sx={{ paddingBottom: comparisonItemA ? convertToRem(8) : convertToRem(20) }}>
      {/* Filter */}
      <Box>
        <Box
          display={'flex'}
          gap={convertToRem(8)}
          justifyContent={'space-between'}
          sx={{ '.MuiFormControl-root': { flex: 1 } }}
        >
          <Input
            name='comparisonItemA'
            placeholder='검색어 추가'
            value={comparisonItemA}
            onChange={(e) => setComparisonItemA(e.target.value)}
            sx={{ ...sxInputGoogleTrendingCustom }}
          />
          {comparisonItemA && (
            <Input
              name='comparisonItemB'
              placeholder='검색어 추가'
              value={comparisonItemB}
              onChange={(e) => setComparisonItemB(e.target.value)}
              sx={{ ...sxInputGoogleTrendingCustom }}
            />
          )}
        </Box>

        <Box marginTop={convertToRem(8)} display={'flex'} gap={convertToRem(8)}>
          <FormControl sx={{ minWidth: 180 }} size='small'>
            <Select
              value={selectedCountry}
              className={styles.select_custom}
              sx={{ '.MuiSelect-select': { '.countriesMore': { display: 'none' } } }}
              onChange={handleChangeSelectedCountry}
              MenuProps={{
                sx: {
                  '&& .Mui-selected': {
                    backgroundColor: palette.home.blue500
                  }
                }
              }}
            >
              {[{ id: 'worldwide', name: '전 세계' }, ...dataCountryList].map((country, index) => {
                if (index === 0 && countryPrevIndexRef.current?.length > 0) {
                  return (
                    <MenuItem key={index} className={styles.menu_item} sx={{ padding: 0 }}>
                      <Box className={styles.btn_back} onClick={handleClickBack}>
                        <ArrowIcon svgProps={{ stroke: '#fff' }} />
                      </Box>
                    </MenuItem>
                  )
                } else {
                  return (
                    <MenuItem key={index} value={country.id} className={styles.menu_item}>
                      <Box>{country.name}</Box>
                      {country.children && (
                        <Box
                          className={`countriesMore ${styles.btn_more}`}
                          onClick={(e) => handleClickMore(e, index - 1)}
                        >
                          <ArrowIcon svgProps={{ stroke: '#fff' }} />
                        </Box>
                      )}
                    </MenuItem>
                  )
                }
              })}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 125 }} size='small'>
            <Select
              value={datetime}
              className={styles.select_custom}
              onChange={(e: SelectChangeEvent) => setDatetime(e.target.value)}
              MenuProps={{
                sx: {
                  '&& .Mui-selected': {
                    backgroundColor: palette.home.blue500
                  }
                }
              }}
            >
              {DATA_DATETIME.map((datetime, index) => (
                <MenuItem key={index} value={datetime.value} className={styles.menu_item}>
                  {datetime.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Iframe */}
      {comparisonItemA && (
        <Box
          id={'google-trending-wrapper'}
          marginTop={convertToRem(20)}
          sx={{
            minHeight: convertToRem(428),
            iframe: {
              boxShadow: 'none !important',
              minHeight: convertToRem(400)
            }
          }}
        />
      )}
    </Box>
  )
}

export default GoogleTrending
