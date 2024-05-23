import { useQuery } from '@tanstack/react-query'
import { Grid, Box, Typography, useTheme, Divider, Stack } from '@mui/material'
import { getCompetitiveAnalysisCharacteristicsExample } from '@/services/competitor-analysis.service'
import {
  ICompetitiveCharacteristicsResponse,
  ICompetitorCharacteristicsResponse
} from '@/types/competitor-analysis.type'
import LikeIcon from '@/assets/icons/like'
import DislikeIcon from '@/assets/icons/dislike'
import { convertToRem } from '@/utils/convert-to-rem'
import Loading from '@/elements/loading'
import { ModalChildren } from '@/components/dialog/modal-deck'

interface IModalViewCharacteristics {
  isOpen: boolean
  setIsOpen: () => void
  data: ICompetitiveCharacteristicsResponse
}
function ModalViewCharacteristics({ isOpen, setIsOpen, data }: IModalViewCharacteristics) {
  const { palette } = useTheme()
  const { data: dataCompetitiveCharacteristicsExample, isLoading } = useQuery({
    queryKey: [`competitor-analysis-characteristics-example`, data?.id],
    queryFn: () => getCompetitiveAnalysisCharacteristicsExample({ id: data?.id }),
    meta: { offLoading: true },
    enabled: !!data?.id
  })

  // ======
  const handleCloseModal = () => setIsOpen?.()

  const renderContentInfo1 = (isAdvance: boolean, data: ICompetitorCharacteristicsResponse) => (
    <>
      <Box display='flex' alignItems='center' gap={convertToRem(6)} marginBottom={convertToRem(20)}>
        {isAdvance ? <LikeIcon /> : <DislikeIcon />}
        <Typography fontWeight={600} color={palette.home.gray50}>
          {isAdvance ? '장점' : '단점'}
        </Typography>
      </Box>
      {data?.descriptions?.map((line, index) => {
        let [nameComp = '', contentComp = ''] = line?.split(':') ?? ({} as any)
        const hasContentText = Boolean(contentComp)
        if (!hasContentText) [nameComp, contentComp] = [contentComp, nameComp]

        return (
          <Grid
            key={`${line}${index}`}
            container
            spacing={2}
            sx={{ '&:last-child': { marginBottom: 0 } }}
            marginBottom={convertToRem(20)}
          >
            <Grid item xs={12} lg={3}>
              <Typography fontWeight={600} color={palette.home.gray50} fontSize={14}>
                {index + 1}. {nameComp}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={9}>
              <Typography fontWeight={400} color={palette.home.gray100} fontSize={14}>
                {contentComp}
              </Typography>
            </Grid>
          </Grid>
        )
      })}
    </>
  )

  const renderContentInfo2 = (data: ICompetitorCharacteristicsResponse) => (
    <>
      <Box marginBottom={convertToRem(24)}>
        <Typography fontWeight={600} color={palette.home.gray50}>
          {'기업 사례'}
        </Typography>
      </Box>
      <Box padding={convertToRem(20)} sx={{ background: palette.home.gray300 }} borderRadius={convertToRem(10)}>
        {data?.descriptions?.map((line, index) => {
          let [nameComp = '', contentComp = ''] = line?.split(':') ?? ({} as any)
          const hasContentText = Boolean(contentComp)
          if (!hasContentText) [nameComp, contentComp] = [contentComp, nameComp]

          return (
            <Box key={`${line}${index}`}>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={2} display={'flex'} alignItems={'center'}>
                  <Typography fontWeight={600} color={palette.home.gray50} fontSize={14}>
                    {nameComp}
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={10}>
                  <Typography fontWeight={600} color={palette.home.gray50} fontSize={14}>
                    {contentComp}
                  </Typography>
                </Grid>
              </Grid>
              {index !== data?.descriptions?.length - 1 && <Divider sx={{ marginY: convertToRem(20) }} />}
            </Box>
          )
        })}
      </Box>
    </>
  )

  return (
    <ModalChildren
      isFixedFooter={true}
      title={
        <>
          <Box component={'span'} display={'block'} marginBottom={convertToRem(6)}>
            {data?.name || ''}
          </Box>
          <Box
            component={'span'}
            display={'block'}
            sx={{
              fontSize: convertToRem(14),
              lineHeight: convertToRem(21),
              fontWeight: 400,
              color: '#7E7E86'
            }}
          >
            {data?.description || ''}
          </Box>
        </>
      }
      open={isOpen}
      onSubmit={handleCloseModal}
      sxDialog={{ '.MuiPaper-root': { width: convertToRem(890), maxWidth: '100%' } }}
    >
      {isLoading ? (
        <Box height={200} display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Loading isLoading={true} />
        </Box>
      ) : (
        <Stack gap={convertToRem(20)} margin={convertToRem('20px 0')}>
          <Grid container spacing={4}>
            {dataCompetitiveCharacteristicsExample?.map((data, index) => {
              const isAdvance = Boolean(index === 0) // because id = 1 > wrong data (3 장점)
              if (index >= 2) return
              return (
                <Grid key={data.id} item xs={12} lg={6}>
                  {renderContentInfo1(isAdvance, data)}
                </Grid>
              )
            })}
          </Grid>

          <Divider sx={{ marginTop: convertToRem(4), marginBottom: convertToRem(8) }} />

          <Box>
            {renderContentInfo2(
              dataCompetitiveCharacteristicsExample?.[2] ?? ({} as ICompetitorCharacteristicsResponse)
            )}
          </Box>
        </Stack>
      )}
    </ModalChildren>
  )
}

export default ModalViewCharacteristics
