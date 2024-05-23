import PlusIcon from '@/assets/icons/plus'
import { ButtonItem } from '@/components/home/button'
import SelectItem from '@/form/select'
import { Grid, useTheme, MenuItem } from '@mui/material'
import styles from './selectcardnewstype.module.scss'
import { CardNewsEvents, FormStatus, cardNewsFormTypes, cardNewsTypes } from '../../utils/common'
import { Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import { useForm } from 'react-hook-form'
import { ICardNews } from '@/types/cardnews/index.type'
import useToggle from '@/hooks/use-toggle'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { allCardData, cardNewsData, editCardNews } from '@/atoms/home/card-news'
import { useState } from 'react'
import { sendEvent } from '@/utils/events'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { ModalNotification } from '@/components/dialog/modal-deck'
import { useLanguage } from '@/hooks/use-language'

interface ISelectCardNewsTypeProps {
  isAddNew: boolean
  onAddCardNews: (param: any) => void
}
interface DialogContentProps {
  title: string
  description: string
}

const SelectCardNewsType: React.FC<ISelectCardNewsTypeProps> = ({ isAddNew, onAddCardNews }) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const [isEdit, setIsEdit] = useRecoilState(editCardNews)
  const resetCardNews = useResetRecoilState(cardNewsData)
  const [allData, setAllData] = useRecoilState(allCardData)
  const [dialogContent, setDialogContent] = useState<DialogContentProps>({ title: '', description: '' })
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const form = useForm<ICardNews>({
    mode: 'all',
    defaultValues: {
      cardNewsType: ''
    }
  })
  const { control, getValues, reset: resetCardNewsForm } = form

  const onAddCardNewsForm = () => {
    if (!form.getValues('cardNewsType')) return

    const isEditForm = allData?.find((item) => item.status === FormStatus.inprogress)

    if (isEdit || isAddNew || isEditForm) {
      setDialogContent({
        title: dict.deck_delete_title,
        description: dict.deck_delete_description
      })
      setToggleShowDialog(true)

      return
    }
    onConfirmAddCardNews()
  }

  const onConfirmAddCardNews = () => {
    setToggleShowDialog(false)
    setIsEdit(false)
    const cardNewsFormType = getValues('cardNewsType')
    const newForms = cardNewsFormTypes.find(({ type }) => type === cardNewsFormType)
    resetCardNews()
    onAddCardNews(newForms)
    setAllData(
      allData?.map((item) =>
        item.status === FormStatus.inprogress ? { ...item, status: FormStatus.completed } : item
      ) || []
    )
    resetCardNewsForm()
    sendEvent(CardNewsEvents.RESET_FORM, () => {})
  }

  const isInvalid = !form.watch('cardNewsType')

  return (
    <>
      <Grid container paddingY='20px' spacing={'20px'} alignItems={'end'}>
        <Grid item md={12}>
          <Typography
            sx={{ marginBottom: '5px', color: home.gray50 + '!important', fontWeight: 600, textAlign: 'center' }}
            plainColor={'home.gray50'}
          >
            카드뉴스 만들기
          </Typography>
          <Typography className={styles.sub_title} plainColor={'home.gray100'}>
            슘페터AI로 카드뉴스를 생성해보세요.
          </Typography>
        </Grid>
        <Grid item xl={7} md={12}>
          <SelectItem textFieldProps={{ placeholder: '카드뉴스 유형' }} control={control} name={'cardNewsType'}>
            {cardNewsTypes.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </SelectItem>
        </Grid>
        <Grid item xl={5} md={12}>
          <ButtonItem
            startIcon={<PlusIcon pathProps={{ stroke: 'currentColor' }} />}
            fullWidth
            sx={{
              flexShrink: 0,
              borderColor: home.blue500,
              backgroundColor: home.blue500,
              lineHeight: remConvert('20px'),
              color: home.gray500,
              minWidth: '0',
              borderRadius: remConvert('10px'),
              '&:hover': {
                backgroundColor: 'main_primary.blue300'
              },
              '&.Mui-disabled': {
                opacity: 0.5,
                borderColor: home.blue500,
                color: home.gray500,
                backgroundColor: home.blue500
              }
            }}
            variant='contained'
            disabled={isInvalid}
            onClick={onAddCardNewsForm}
          >
            만들기
          </ButtonItem>
        </Grid>
      </Grid>

      <ModalNotification
        onSubmit={onConfirmAddCardNews}
        description={dialogContent.description}
        title={dialogContent.title}
        open={showDialog}
        onCancel={toggleShowDialog}
        cancelTxt={dict.common_close}
        submitTxt={dict.common_move}
      />
    </>
  )
}

export default SelectCardNewsType
