'use client'
import { BorderlessPrimaryCheckbox, CirclePrimaryCheckbox, GhostButton, Typography } from '@/elements'
import { useDialog } from '@/hooks/use-dialog'
import { convertArrToObjectStateByKey } from '@/utils/array'
import { Box, SxProps } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import { Card } from '..'
import { CATE } from '@/components/dialog/footer-popup/footer-popup.type'
import FooterPopup from '@/components/dialog/footer-popup'

type GenericData = { title: string; content: ReactNode; required?: boolean; [k: string]: any }

type TermListProps<T> = {
  data: T[]
  checkAllTxt?: string
  showAllBtnTxt?: string
  cardSx?: SxProps
  onChange?: (checkAll: boolean) => void
}

const TermBox = ({ title, content, required }: Pick<GenericData, 'title' | 'content' | 'required'>) => {
  return (
    <Box>
      <Typography cate='sub_title_30' plainColor='popup.general.subtitle'>
        {required && '(필수)'} {title}
      </Typography>
      <Box
        mt={1}
        p={2}
        borderRadius={2}
        bgcolor={'popup.general.background.upper_layer'}
        height={122}
        overflow={'auto'}
        sx={{
          overscrollBehavior: 'contain'
        }}
      >
        <Typography cate='body_10' plainColor='popup.general.subtitle'>
          {content}
        </Typography>
      </Box>
    </Box>
  )
}

const TermList = <T extends GenericData>({
  data,
  checkAllTxt = '모두 동의합니다.',
  showAllBtnTxt = '이용약관 상세보기',
  cardSx,
  onChange
}: TermListProps<T>) => {
  const [checkAll, setCheckAll] = useState(false)
  const [termState, setTermState] = useState(convertArrToObjectStateByKey(data))
  // const { open, onClose, onOpen } = useDialog()
  const { onOpen: onOpenPolicy, open: openPolicy, onClose: onClosePolicy } = useDialog()

  const handleChangeTermState = (idx: number, state: boolean) => {
    const termStateClone = { ...termState, [idx]: state }
    setTermState(termStateClone)
    const values = Object.values(termStateClone)
    const isCheckAll = values.every((i) => i)
    setCheckAll(isCheckAll)
  }

  const handleCheckAll = (state: boolean) => {
    setCheckAll(state)
    const newStates = state ? convertArrToObjectStateByKey(data, true) : convertArrToObjectStateByKey(data)

    setTermState(newStates)
  }

  useEffect(() => {
    onChange?.(checkAll)
  }, [checkAll])

  return (
    <Box>
      <Card
        sx={{
          px: {
            md: 3,
            xs: 2
          },
          py: 3,
          ...cardSx
        }}
      >
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <CirclePrimaryCheckbox
            checked={checkAll}
            value={checkAll}
            onChange={(_, state) => handleCheckAll(state)}
            label={
              <Typography cate='body_40' plainColor='main_grey.gray50'>
                {checkAllTxt}
              </Typography>
            }
          />
          <Box>
            <GhostButton onClick={onOpenPolicy} fitContent>
              <Typography
                sx={{
                  textDecoration: 'underline'
                }}
                cate='button_20'
                plainColor='main_grey.gray200'
              >
                {showAllBtnTxt}
              </Typography>
            </GhostButton>
          </Box>
        </Box>
        <Box display={'flex'} flexDirection={'column'}>
          {data.map((i, idx) => (
            <Box key={idx} display={'flex'} alignItems={'center'}>
              <BorderlessPrimaryCheckbox
                checked={termState[idx]}
                onChange={(_, state) => handleChangeTermState(idx, state)}
              />
              <Typography cate='body_30' plainColor='main_grey.gray50'>
                {i.required && '(필수)'} {i.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Card>
      {/*<Dialog onClose={onClose} open={open} PaperProps={{ sx: { maxWidth: 560 } }}>*/}
      {/*  <DialogTitle>*/}
      {/*    <Typography cate='title_70' plainColor='popup.general.title'>*/}
      {/*      약관 상세보기*/}
      {/*    </Typography>*/}
      {/*  </DialogTitle>*/}
      {/*  <Box display={'flex'} gap={5} mt={5} flexDirection={'column'}>*/}
      {/*    <Box display={'flex'} flexDirection={'column'} gap={3}>*/}
      {/*      {data.map((i, idx) => (*/}
      {/*        <TermBox key={idx} {...i} />*/}
      {/*      ))}*/}
      {/*    </Box>*/}
      {/*    <DesignedPrimaryButton onClick={onClose} sx={{ ml: 'auto', width: 120 }} btnSize='designed-sm'>*/}
      {/*      닫기*/}
      {/*    </DesignedPrimaryButton>*/}
      {/*  </Box>*/}
      {/*</Dialog>*/}
      <FooterPopup
        open={openPolicy}
        onCancel={() => {
          onClosePolicy()
        }}
        cate={CATE.TERM}
      />
    </Box>
  )
}

export default TermList
