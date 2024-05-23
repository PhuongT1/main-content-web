import { Typography } from '@/elements'
import { fetchSymbols } from '@/services/logo.service'
import { Alert, Box, Grid, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import Image from 'next/image'
import CardOption from '../../card-option'
import { PrimaryCheckbox } from '@/elements/v2/checkbox'
import { PrimaryCheckedIcon } from '@/assets/icons'
import WhiteUncheckIcon from '@/assets/icons/logo/white-uncheck-icon'
import * as _ from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { step1, step2 } from '@/atoms/logo'
import CloseGreyIcon from '@/assets/icons/close-grey'
import LoadingAI from '@/elements/loadingAI'
import SchumpeterAI from '../../../naming/_clientComponents/step_02/edit-step/schumpeterAI'
import { remConvert } from '@/utils/convert-to-rem'

const Symbols = forwardRef(({}, ref) => {
  const [symbolsSelected, setSymbolsSelected] = useState<any>([])
  const [, setDataStep2]: any = useRecoilState(step2)
  const dataStep2: any = useRecoilValue(step2)
  const data1 = useRecoilValue(step1)
  const [symbolsOverload, setSymbolsOverload] = useState(false)

  useEffect(() => {
    if (dataStep2.length) {
      setSymbolsSelected(dataStep2)
    }
  }, [dataStep2])

  useImperativeHandle(ref, () => ({
    resetSymbols() {
      setSymbolsSelected([])
      setDataStep2([])
    }
  }))
  const {
    palette: { home }
  } = useTheme()

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['fetch-symbols'],
    queryFn: fetchSymbols,
    enabled: false
  })

  const onAddSymbols = (value: any) => {
    const find = symbolsSelected.find((symbol: any) => symbol.id === value.id)
    if (!!find) {
      setSymbolsSelected(symbolsSelected.filter((symbol: any) => symbol.id !== value.id))
      setDataStep2(symbolsSelected.filter((symbol: any) => symbol.id !== value.id))
      setSymbolsOverload(false)
    } else {
      if (symbolsSelected.length >= 10) {
        setSymbolsOverload(true)
        return
      }

      setSymbolsSelected([...symbolsSelected, ...[value]])
      setDataStep2([...symbolsSelected, ...[value]])
      setSymbolsOverload(false)
    }
  }

  return (
    <>
      <LoadingAI isLoading={isFetching}>
        {!data && (
          <Box component={'div'} sx={{ backgroundColor: '#191A1C', width: '100%', borderRadius: remConvert('10px') }}>
            <SchumpeterAI
              onClick={() => {
                refetch()
              }}
            />
          </Box>
        )}
        {!!data && (
          <Box>
            <Box
              component={'div'}
              sx={{
                marginBottom: '20px',
                padding: '20px 24px',
                backgroundColor: home.gray400,
                borderRadius: '10px',
                height: '584px',
                overflow: 'scroll'
              }}
            >
              <Box sx={{ marginBottom: '10px' }}>
                <Typography component={'span'} cate='title_50' sx={{ marginRight: '10px' }} color={home.gray0}>
                  추천 로고
                </Typography>
                <Typography component={'span'} cate='sub_title_30' color={home.mint500}>
                  {data?.data.length}개
                </Typography>
              </Box>
              <Box>
                <Grid container spacing={2}>
                  {data?.data.map((symbol: any, index: number) => {
                    return (
                      <Grid onClick={() => onAddSymbols(symbol)} key={index} item xs={12 / 5}>
                        <CardOption
                          backgroundColorDefault={'#fff'}
                          backgroundColorActive={'#fff'}
                          active={symbolsSelected.findIndex((item: any) => item.id === symbol.id) >= 0}
                          boxShadowWidth='4px'
                        >
                          <Box sx={{ padding: '22px 12px', position: 'relative' }}>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'end',
                                position: 'absolute',
                                top: '10px',
                                right: '10px'
                              }}
                            >
                              <PrimaryCheckbox
                                style={{ padding: '0' }}
                                checkedIcon={<PrimaryCheckedIcon />}
                                icon={<WhiteUncheckIcon />}
                                checked={symbolsSelected.findIndex((item: any) => item.id === symbol.id) >= 0}
                              />
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px'
                              }}
                            >
                              <Image width={50} height={50} src={symbol.url} alt='' />
                              <Typography component={'span'} cate='sub_title_30' color={'#090A0B'}>
                                {data1.ideaSection.title}
                              </Typography>
                            </Box>
                          </Box>
                        </CardOption>
                      </Grid>
                    )
                  })}
                </Grid>
              </Box>
            </Box>
            <Box
              component={'div'}
              sx={{ padding: '20px 24px', borderRadius: '10px', border: `1px solid ${home.gray200}` }}
            >
              <Box sx={{ marginBottom: '10px' }}>
                <Typography component={'span'} cate='title_50' sx={{ marginRight: '10px' }} color={home.gray0}>
                  선택한 항목
                </Typography>
                {!!symbolsSelected.length && (
                  <Typography component={'span'} cate='sub_title_30' color={home.mint500}>
                    {symbolsSelected.length}개
                  </Typography>
                )}
              </Box>
              <Box>
                <Grid container spacing={2}>
                  {symbolsSelected.map((symbol: any, index: number) => {
                    return (
                      <Grid key={index} item xs={3}>
                        <CardOption
                          backgroundColorDefault={'white'}
                          backgroundColorActive={'white'}
                          active={false}
                          boxShadowWidth='4px'
                        >
                          <Box
                            sx={{
                              border: `1px solid #EDEEF1`,
                              borderRadius: '10px',
                              padding: '22px 12px',
                              position: 'relative'
                            }}
                          >
                            <Box
                              sx={{
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '4px',
                                backgroundColor: home.gray400,
                                cursor: 'pointer',
                                position: 'absolute',
                                top: '10px',
                                right: '10px'
                              }}
                              onClick={() => onAddSymbols(symbol)}
                            >
                              <CloseGreyIcon
                                pathProps={[
                                  { stroke: home.gray50, strokeWidth: 2 },
                                  { stroke: home.gray50, strokeWidth: 2 }
                                ]}
                              />
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px'
                              }}
                            >
                              <Image src={symbol.url} width={50} height={50} alt='' />
                              <Typography component={'span'} cate='sub_title_30' color={'#090A0B'}>
                                {data1.ideaSection.title}
                              </Typography>
                            </Box>
                          </Box>
                        </CardOption>
                      </Grid>
                    )
                  })}
                </Grid>
              </Box>
            </Box>
            {symbolsOverload && (
              <Alert sx={{ marginTop: '10px', background: '#EA39391A' }} severity='error'>
                로고는 10개 까지 선택할 수 있습니다.
              </Alert>
            )}
          </Box>
        )}
      </LoadingAI>
    </>
  )
})

export default Symbols
