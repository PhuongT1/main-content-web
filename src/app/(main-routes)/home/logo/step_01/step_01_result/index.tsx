import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import SectionTitle from '../../section-title'
import InputItem from '@/form/input'
import { useForm } from 'react-hook-form'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { step1, step2, step3, step4 } from '@/atoms/logo'
import CardItem from '@/components/home/card-item'
import Image from 'next/image'
import styles from './step_01_result.module.scss'
import CardOption from '../../card-option'
import DropdownCustom from '../dropdown-custom'
import { EditButton } from '@/components/home/button'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import useToggle from '@/hooks/use-toggle'

const fontWeights = {
  thin: '100',
  heavy: '900',
  black: '900',
  extraBold: '800',
  medium: '500',
  extraLight: '200',
  bold: '700',
  regular: '400',
  light: '300'
}
const Step01Result = () => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [, setExpandStep] = useRecoilState(expandStepSelector)
  const [, setDataStep2]: any = useRecoilState(step2)
  const [, setDataStep3]: any = useRecoilState(step3)
  const [, setDataStep4]: any = useRecoilState(step4)

  const {
    palette: { home }
  } = useTheme()

  const data = useRecoilValue(step1)
  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const setActiveStep = useSetRecoilState(activeStepSelector)

  const defaultValues: {
    title: string
    idea: string
  } = {
    title: data.ideaSection.title,
    idea: data.ideaSection.idea
  }
  const { control } = useForm({
    defaultValues,
    mode: 'onChange'
  })

  const getColorByNameColor = (name: string) => {
    switch (name) {
      case '레드':
        return '#FF3737'
      case '오렌지':
        return '#FF7F37'
      case '옐로우':
        return '#F0DA15'
      case '그린':
        return '#00C750'
      case '블루':
        return '#3971FF'
      case '핑크':
        return '#FF83DC'
      case '퍼플':
        return '#B721FE'
      case '그레이 스케일':
        return '#AEAEAF'
    }
  }

  const getSubTitleByNameColor = (name: string) => {
    switch (name) {
      case '레드':
        return '강렬, 화려, 열정, 용기, 사랑, 대담, 주도, 결단'
      case '오렌지':
        return '열정, 희망, 긍정, 따뜻, 유쾌, 활력, 화려, 신선'
      case '옐로우':
        return '행복, 화합, 창조, 긍정, 유쾌, 활기, 창의, 명량'
      case '그린':
        return '자연, 청정, 신뢰, 안정, 건강, 성장, 조화, 희망'
      case '블루':
        return '평온, 차분, 청량, 시원, 안정, 신뢰, 진실, 충실'
      case '핑크':
        return '사랑, 우애, 희망, 예술, 포근, 로열, 매력, 경쾌'
      case '퍼플':
        return '독창, 신비, 우아, 창의, 환상, 지성, 로열, 고귀'
      case '그레이 스케일':
        return '중립, 차분, 신뢰, 균형, 세련, 모던, 고요, 고급'
    }
  }

  const getFontWeight = (weight: string) => {
    switch (weight) {
      case 'Thin':
        return fontWeights.thin
      case 'Medium':
        return fontWeights.medium
      case 'Black':
        return fontWeights.black
      case 'ExtraLight':
        return fontWeights.extraLight
      case 'Bold':
        return fontWeights.bold
      case 'ExtraBold':
        return fontWeights.extraBold
      case 'Light':
        return fontWeights.light
      case 'Regular':
        return fontWeights.regular
      case 'Heavy':
        return fontWeights.heavy
    }
  }

  const handleRemoveCompleteStep = () => {
    setCompleteStep((pre) => pre.filter((item) => item < STEP.STEP_ONE))
    setExpandStep((pre) => pre.filter((item) => item < STEP.STEP_ONE))
    setDataStep2([])
    setDataStep3([])
    setDataStep4({})

    setActiveStep(STEP.STEP_ONE)
  }

  return (
    <Box
      pt={convertToRem(60)}
      mt={convertToRem(60)}
      pb={convertToRem(40)}
      sx={{ borderTop: `1px solid ${home.gray200}` }}
    >
      <Box sx={{ marginBottom: '60px' }}>
        <SectionTitle maintitle='사업 아이디어' subTitle='' />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <InputItem
              name='title'
              label='타이틀'
              control={control}
              textFieldProps={{
                required: true,
                placeholder: '브랜드명 입력',
                InputProps: {
                  readOnly: true
                }
              }}
              sxLabel={{ color: home.gray50 }}
            />
          </Grid>
          <Grid item xs={8}>
            <InputItem
              name='idea'
              label='아이디어'
              control={control}
              textFieldProps={{
                required: true,
                placeholder: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼',
                InputProps: {
                  readOnly: true
                }
              }}
              sxLabel={{ color: home.gray50 }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginBottom: '60px' }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <CardItem
              sxCard={{ backgroundColor: home.gray300 }}
              icon='radio'
              isActive={false}
              cardItem={{
                title: data.logoConceptSection.name,
                subTitle: data.logoConceptSection.description,
                content: (
                  <Image
                    style={{
                      width: '100%',
                      height: '70px',
                      borderRadius: 10
                    }}
                    src={data.logoConceptSection.image}
                    alt=''
                  />
                )
              }}
            />
          </Grid>

          <Grid item xs={3}>
            <CardItem
              sxCard={{ backgroundColor: home.gray300 }}
              icon='radio'
              isActive={false}
              cardItem={{
                title: data.logoTypeSection.name,
                subTitle: data.logoTypeSection.description,
                content: (
                  <Image
                    style={{
                      width: '100%',
                      height: '70px',
                      borderRadius: 10
                    }}
                    src={data.logoTypeSection.image}
                    alt=''
                  />
                )
              }}
            />
          </Grid>

          <Grid item xs={3}>
            <CardItem
              sxCard={{ backgroundColor: home.gray300 }}
              icon='radio'
              isActive={false}
              cardItem={{
                title: data.logoColorSection.color,
                subTitle: getSubTitleByNameColor(data.logoColorSection.color),
                content: (
                  <Box
                    style={{
                      backgroundColor: getColorByNameColor(data.logoColorSection.color),
                      width: '100%',
                      height: '70px',
                      borderRadius: '10px',
                      paddingRight: '8px',
                      paddingBottom: '8px',
                      display: 'flex',
                      justifyContent: 'end',
                      alignItems: 'end'
                    }}
                  >
                    <Box
                      style={{
                        backgroundColor: home.alpha_gray_50,
                        width: '112px',
                        height: '40px',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Box component={'div'} className={styles.colors}>
                        <Box
                          style={{
                            backgroundColor: data.logoColorDetailSection.id
                              ? '#' + data.logoColorDetailSection.color1
                              : data.logoColorDetailSection.color1
                          }}
                          className={styles.color}
                          component={'div'}
                        ></Box>
                        <Box
                          style={{
                            backgroundColor: data.logoColorDetailSection.id
                              ? '#' + data.logoColorDetailSection.color2
                              : data.logoColorDetailSection.color2
                          }}
                          className={styles.color}
                          component={'div'}
                        ></Box>
                        {!!data.logoColorDetailSection.color3 && (
                          <Box
                            style={{
                              backgroundColor: data.logoColorDetailSection.id
                                ? '#' + data.logoColorDetailSection.color3
                                : data.logoColorDetailSection.color3
                            }}
                            className={styles.color}
                            component={'div'}
                          ></Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                )
              }}
            />
          </Grid>

          <Grid item xs={3}>
            <CardOption
              backgroundColorDefault={home.gray300}
              backgroundColorActive='rgba(60, 130, 249, 0.10)'
              active={false}
            >
              <Box component={'div'} className={styles.fontCard}>
                <Box component={'div'} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box
                    style={{
                      color: home.gray50,
                      fontSize: '18px',
                      fontFamily: data.logoFontSection.id,
                      fontWeight: getFontWeight(data.logoFontSection.weightActive)
                    }}
                    component={'div'}
                  >
                    {data.logoFontSection.name}
                  </Box>
                  <DropdownCustom
                    readOnly={true}
                    items={data.logoFontSection.weight}
                    itemActive={data.logoFontSection.weightActive}
                  />
                </Box>
                <Box
                  className={styles.schumpeter}
                  style={{
                    color: home.blue500,
                    fontFamily: data.logoFontSection.id,
                    fontWeight: getFontWeight(data.logoFontSection.weightActive)
                  }}
                  component={'div'}
                >
                  {data.ideaSection.title}
                </Box>
              </Box>
            </CardOption>
          </Grid>
        </Grid>
      </Box>
      <Stack flexDirection={'row'} justifyContent={'center'} className={styles.btn_edit}>
        <EditButton onClick={toggleShowDialog} />
      </Stack>
      <DeleteDeck open={showDialog} onCancel={toggleShowDialog} onSubmit={handleRemoveCompleteStep} />
    </Box>
  )
}

export default Step01Result
