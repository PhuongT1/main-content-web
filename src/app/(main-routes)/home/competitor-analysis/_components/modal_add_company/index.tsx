import { ChangeEvent, useState } from 'react'
import moment from 'moment'
import * as yup from 'yup'
import { useQuery } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import DatePicker from '@/libs/datepicker/DatePicker'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, MenuItem, useTheme, Button, InputLabel, TextField, Stack } from '@mui/material'
import PlusOutlineIcon from '@/assets/icons/plus-outline'
import InputItem from '@/form/input'
import SelectItem from '@/form/select'
import { ICompetitiveCompaniesResponse } from '@/types/competitor-analysis.type'
import { getCompetitiveCompaniesIndustry } from '@/services/competitor-analysis.service'
import { convertToRem } from '@/utils/convert-to-rem'
import { ModalChildren } from '@/components/dialog/modal-deck'
import InputNumberWithText from '@/components/input/input-number-with-text'
import InventoryImages from '@/components/inventory-image'
import { MAXLENGTH_INPUT } from '../utils'

const optionDefaultModal = {
  title: '기업 직접입력',
  subTitle: `직접 작성한 데이터는 작성자에게만 노출됩니다. 
    작성한 데이터는 추후 관리자에 의해 전체 경쟁기업 POOL에 추가될 수 있습니다.`
}

interface IModalAddCompany {
  isOpen: boolean
  setIsOpen: () => void
  handleAddCompany: (values: ICompetitiveCompaniesResponse) => void
}
function ModalAddCompany({ isOpen, setIsOpen, handleAddCompany }: IModalAddCompany) {
  const {
    palette: { home }
  } = useTheme()
  const [file, setFile] = useState<string>('')
  const [keywordText, setKeywordText] = useState<string>('')
  const [keywordList, setKeywordList] = useState<string[]>([])
  const [showInventory, setToggleShowInventory] = useState(false)

  const schema = yup.object({
    competitiveCompanyIndustryId: yup.number().required(),
    name: yup.string().max(MAXLENGTH_INPUT.COMPANY_NAME).required(),
    description: yup.string().max(MAXLENGTH_INPUT.COMPANY_DESC).required(),
    websiteUrl: yup.string().max(MAXLENGTH_INPUT.COMPANY_HOMEPAGE),
    numbEmployees: yup.string(),
    cumulativeInvestmentAmount: yup.string(),
    annualRevenue: yup.string(),
    keywords: yup.array().min(1).max(MAXLENGTH_INPUT.KEYWORDS).required()
  })
  const form = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      establishDate: moment().format('YYYY-MM-DD')
    }
  })
  const { handleSubmit, control, setValue, formState, trigger, reset } = form

  const { data: dataCompetitiveCompaniesIndustry } = useQuery({
    queryKey: [`competitor-analysis-industry`],
    queryFn: () => getCompetitiveCompaniesIndustry(),
    meta: {
      offLoading: true
    }
  })

  // ======
  const handleChangeTextKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value
    return keyword.length <= MAXLENGTH_INPUT.KEYWORDS_TEXT && setKeywordText(keyword)
  }
  const handleClickAddKeyword = async () => {
    if (keywordList?.includes(keywordText) || !keywordText || keywordList?.length >= MAXLENGTH_INPUT.KEYWORDS) return

    const updatedKeywords = [...keywordList, keywordText]
    setKeywordList(updatedKeywords)
    setValue('keywords', updatedKeywords)

    await trigger('keywords')
    setKeywordText('')
  }

  const resetForm = () => {
    reset()
    setValue('keywords', [])
    setKeywordList([])
    setKeywordText('')
    setValue('companyImageUrl', '')
    setFile('')
  }

  const handleCloseModal = () => {
    setIsOpen?.()
    resetForm()
  }

  const handleConfirm = handleSubmit((values: ICompetitiveCompaniesResponse) => {
    handleAddCompany(values)
    handleCloseModal()
  })

  return (
    <FormProvider {...form}>
      <ModalChildren
        title={
          <>
            <Box component={'span'} display={'block'} marginBottom={convertToRem(6)}>
              {optionDefaultModal.title}
            </Box>
            <Box
              component={'span'}
              display={'block'}
              whiteSpace={'pre-line'}
              sx={{
                fontSize: convertToRem(14),
                lineHeight: convertToRem(21),
                fontWeight: 400,
                color: '#7E7E86'
              }}
            >
              {optionDefaultModal.subTitle}
            </Box>
          </>
        }
        open={isOpen}
        onCancel={handleCloseModal}
        onSubmit={handleConfirm}
        submitTxt='추가하기'
        sxButtonSubmit={{ opacity: formState.isValid ? 1 : 0.25, pointerEvents: formState.isValid ? '' : 'none' }}
        isFixedFooter={true}
      >
        <Stack gap={convertToRem(20)} margin={convertToRem('20px 0')}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <InputItem
                name='name'
                label='기업명'
                control={control}
                textFieldProps={{
                  required: true,
                  placeholder: '내용 입력',
                  inputProps: {
                    maxLength: MAXLENGTH_INPUT.COMPANY_NAME
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <SelectItem
                textFieldProps={{ required: true, placeholder: '선택' }}
                control={control}
                label='산업분야'
                name='competitiveCompanyIndustryId'
              >
                {dataCompetitiveCompaniesIndustry?.map(({ nameKr, id }) => (
                  <MenuItem key={id} value={id}>
                    {nameKr}
                  </MenuItem>
                ))}
              </SelectItem>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputItem
                name='description'
                label='기업소개'
                control={control}
                textFieldProps={{
                  required: true,
                  placeholder: '예: 상표를 출원한 제품이나 서비스를 간략하게 설명해주세요.',
                  inputProps: {
                    maxLength: MAXLENGTH_INPUT.COMPANY_DESC
                  },
                  multiline: true,
                  rows: 3.8
                }}
                sxInput={{
                  '& .MuiInputBase-multiline': {
                    padding: convertToRem(2),
                    maxHeight: 'unset'
                  }
                }}
              />
            </Grid>
          </Grid>

          <Box>
            <InputLabel sx={{ mb: convertToRem(10), fontWeight: 600 }}>
              <span style={{ color: home.mint500 }}>* </span>키워드 (최대 {MAXLENGTH_INPUT.KEYWORDS}개)
            </InputLabel>
            <Box display='flex' flexWrap='wrap' gap={convertToRem(8)}>
              <TextField
                value={keywordText}
                onChange={handleChangeTextKeyword}
                placeholder='키워드 입력'
                InputProps={{
                  startAdornment: (
                    <Box
                      display='flex'
                      paddingTop={convertToRem(2)}
                      onClick={handleClickAddKeyword}
                      sx={{ cursor: 'pointer' }}
                    >
                      <PlusOutlineIcon rectProps={{ fill: '#37393E' }} />
                    </Box>
                  )
                }}
                inputProps={{
                  style: { padding: '12px 14px 12px 6px' },
                  maxLength: MAXLENGTH_INPUT.KEYWORDS_TEXT
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    maxHeight: 48,
                    maxWidth: 138,
                    borderColor: home.gray200,
                    backgroundColor: home.gray300,
                    borderRadius: `10px`
                  }
                }}
              />
              {keywordList?.map((keyword, index) => (
                <Box
                  key={`${keyword}_${index}`}
                  component={'span'}
                  sx={{
                    height: convertToRem(48),
                    padding: '14px 20px',
                    borderRadius: convertToRem(10),
                    backgroundColor: home.gray300
                  }}
                >
                  {keyword}
                </Box>
              ))}
            </Box>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputItem
                name='websiteUrl'
                label='홈페이지'
                control={control}
                textFieldProps={{
                  placeholder: '내용 입력',
                  inputProps: {
                    maxLength: MAXLENGTH_INPUT.COMPANY_HOMEPAGE
                  }
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                '.MuiButtonBase-root': { border: `1px solid ${home.gray200}` },
                '.MuiTypography-root': { lineHeight: 1.4 }
              }}
            >
              <DatePicker
                value=''
                placeholder='내용 입력'
                labelProps={{
                  label: '설립일자'
                }}
                onDateChange={(date: Date) => {
                  setValue('establishDate', moment(date).format('YYYY-MM-DD'))
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <InputNumberWithText form={form} name='numbEmployees' label='고용인원' unitText='' />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <InputNumberWithText form={form} name='cumulativeInvestmentAmount' label='누적투자금액' />
            </Grid>
            <Grid item xs={12} lg={6}>
              <InputNumberWithText form={form} name='annualRevenue' label='연매출' />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} lg={4}>
              <InputLabel sx={{ mb: '10px', fontWeight: 600 }}>로고 업로드</InputLabel>
              <Button
                component='label'
                role={undefined}
                variant='contained'
                tabIndex={-1}
                startIcon={<PlusOutlineIcon rectProps={{ fill: 'transparent' }} />}
                onClick={() => setToggleShowInventory(true)}
                sx={{
                  padding: `${convertToRem(18)} ${convertToRem(16)}`,
                  backgroundColor: home.alpha_blue_10,
                  color: home.blue500,
                  fontWeight: 600,
                  maxHeight: convertToRem(56),
                  minWidth: convertToRem(160),
                  borderRadius: convertToRem(8),
                  border: `1px solid ${home.blue500}`,
                  svg: { path: { stroke: home.blue500 } },
                  '&:hover': {
                    backgroundColor: home.alpha_blue_10,
                    opacity: 0.75
                  }
                }}
              >
                파일 선택
              </Button>
            </Grid>
            <Grid item xs={12} lg={8} sx={{ display: 'flex', alignItems: 'center' }}>
              {file && (
                <Box
                  width={56}
                  height={56}
                  borderRadius={convertToRem(8)}
                  sx={{
                    marginTop: convertToRem(32),
                    backgroundImage: `url(${file as string})`,
                    backgroundSize: 'cover'
                  }}
                ></Box>
              )}
            </Grid>
          </Grid>

          <InventoryImages
            multiple={false}
            open={showInventory}
            onClose={() => setToggleShowInventory(false)}
            setImages={(images: string[]) => {
              images?.[0] && setValue('companyImageUrl', images[0])
              images?.[0] && setFile(images[0])
              setToggleShowInventory(false)
            }}
          />
        </Stack>
      </ModalChildren>
    </FormProvider>
  )
}

export default ModalAddCompany
