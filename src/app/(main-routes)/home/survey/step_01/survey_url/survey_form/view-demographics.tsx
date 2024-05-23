'use client'
import { Box, MenuItem, useTheme } from '@mui/material'
import React, { FC, useEffect, useMemo } from 'react'
import { remConvert } from '@/utils/convert-to-rem'
import {
  DEMOGRAPHIC_TYPE_ENUM,
  DEMOGRAPHIC_TYPE_ENUM_ORDER,
  ReviewSurveyDemographic,
  SURVEY_AGE_ENUM,
  SURVEY_AREA_ENUM,
  SURVEY_EDUCATION_ENUM,
  SURVEY_EDUCATION_STATUS_ENUM,
  SURVEY_GENDER_ENUM,
  SurveyViewAnswersType
} from '@/types/survey.type'
import { useFormContext } from 'react-hook-form'
import InputItem from '@/form/input'
import styles from '@/app/(main-routes)/home/survey/step_01/step_01.module.scss'
import DatePicker from '@/libs/datepicker/DatePicker'
import CardItemSurvey from '@/app/(main-routes)/home/survey/_component/card-item'
import moment from 'moment'
import { DATE_FORMAT } from '@/constants/common.constant'
import SelectItem from '@/form/select'

interface Props {
  dataSurvey: ReviewSurveyDemographic
  indexAnswers: number
}

const ViewDemographics: FC<Props> = ({ dataSurvey, indexAnswers }) => {
  const {
    palette: { home }
  } = useTheme()
  const { control, setValue } = useFormContext<SurveyViewAnswersType>()

  const sortedOptions = useMemo(() => {
    return dataSurvey.options.sort((a, b) => {
      return DEMOGRAPHIC_TYPE_ENUM_ORDER.indexOf(a.type) - DEMOGRAPHIC_TYPE_ENUM_ORDER.indexOf(b.type)
    })
  }, [dataSurvey.options])

  useEffect(() => {
    const defaultData = sortedOptions.map((item) => ({ id: item.id, answer: '' }))
    setTimeout(() => {
      defaultData && setValue(`items.${indexAnswers}.answers`, [...defaultData])
    }, 200)
  }, [sortedOptions])

  return (
    <Box
      component={'ul'}
      display={'flex'}
      gap={remConvert('20px')}
      flexDirection={'column'}
      className={styles.viewUl}
      sx={{ li: { gap: remConvert('4px') } }}
    >
      {sortedOptions.map((data, index) => {
        switch (data.type) {
          case DEMOGRAPHIC_TYPE_ENUM.NAME:
            return (
              <InputItem
                name={`items.${indexAnswers}.answers.${index}.answer`}
                textFieldProps={{
                  placeholder: '이름'
                }}
                label={
                  <Box component={'li'} sx={{ '::before': { content: `'${index + 1}'` } }}>
                    이름
                  </Box>
                }
                control={control}
              />
            )
          case DEMOGRAPHIC_TYPE_ENUM.GENDER:
            return (
              <InputItem
                name={`items.${indexAnswers}.answers.${index}.answer`}
                label={
                  <Box component={'li'} sx={{ '::before': { content: `'${index + 1}'` } }}>
                    성별
                  </Box>
                }
                control={control}
                renderInput={({ field: { value, onChange } }) => (
                  <Box display='flex' alignItems='stretch' gap={remConvert('8px')}>
                    {Object.values(SURVEY_GENDER_ENUM).map((dataEnum) => {
                      return (
                        <CardItemSurvey
                          key={dataEnum}
                          isActive={dataEnum === value}
                          onClick={() => onChange(dataEnum)}
                          title={dataEnum}
                          sxCard={{ width: 0, flexGrow: 1, height: '100%' }}
                        />
                      )
                    })}
                  </Box>
                )}
              />
            )
          case DEMOGRAPHIC_TYPE_ENUM.AFFILIATION:
            return (
              <InputItem
                name={`items.${indexAnswers}.answers.${index}.answer`}
                textFieldProps={{
                  placeholder: '소속'
                }}
                label={
                  <Box component={'li'} sx={{ '::before': { content: `'${index + 1}'` } }}>
                    소속
                  </Box>
                }
                control={control}
              />
            )
          case DEMOGRAPHIC_TYPE_ENUM.DOB:
            return (
              <InputItem
                name={`items.${indexAnswers}.answers.${index}.answer`}
                label={
                  <Box component={'li'} sx={{ '::before': { content: `'${index + 1}'` } }}>
                    출생연도
                  </Box>
                }
                control={control}
                renderInput={({ field: { value, onChange } }) => (
                  <DatePicker
                    value={value || ''}
                    labelProps={{
                      label: ''
                    }}
                    containerSx={{ outline: `1px solid ${home.gray200}` }}
                    onDateChange={(date: Date) => {
                      onChange(moment(date).format(DATE_FORMAT.DASH_REV))
                    }}
                    menuSx={{
                      '.MuiMenu-list': {
                        '>:first-child': {
                          maxWidth: '100%',
                          '.MuiGrid-container': {
                            '.MuiGrid-root': {
                              flexWrap: 'nowrap'
                            },
                            '.MuiBox-root': {
                              gap: '2px',
                              margin: '0',
                              flexWrap: 'nowrap'
                            }
                          }
                        }
                      }
                    }}
                  />
                )}
              />
            )
          case DEMOGRAPHIC_TYPE_ENUM.AGE:
            return (
              <SelectItem
                textFieldProps={{ placeholder: '연령대' }}
                control={control}
                label={
                  <Box component={'li'} sx={{ '::before': { content: `'${index + 1}'` } }}>
                    연령대
                  </Box>
                }
                name={`items.${indexAnswers}.answers.${index}.answer`}
              >
                {Object.values(SURVEY_AGE_ENUM).map((dataEnum) => (
                  <MenuItem key={dataEnum} value={dataEnum}>
                    {dataEnum}
                  </MenuItem>
                ))}
              </SelectItem>
            )
          case DEMOGRAPHIC_TYPE_ENUM.AREA:
            return (
              <SelectItem
                textFieldProps={{ placeholder: '지역' }}
                control={control}
                label={
                  <Box component={'li'} sx={{ '::before': { content: `'${index + 1}'` } }}>
                    지역
                  </Box>
                }
                name={`items.${indexAnswers}.answers.${index}.answer`}
              >
                {Object.values(SURVEY_AREA_ENUM).map((dataEnum) => (
                  <MenuItem key={dataEnum} value={dataEnum}>
                    {dataEnum}
                  </MenuItem>
                ))}
              </SelectItem>
            )
          case DEMOGRAPHIC_TYPE_ENUM.ADDRESS:
            return (
              <InputItem
                name={`items.${indexAnswers}.answers.${index}.answer`}
                textFieldProps={{
                  placeholder: '주소'
                }}
                label={
                  <Box component={'li'} sx={{ '::before': { content: `'${index + 1}'` } }}>
                    주소
                  </Box>
                }
                control={control}
              />
            )
          case DEMOGRAPHIC_TYPE_ENUM.EMAIL:
            return (
              <InputItem
                name={`items.${indexAnswers}.answers.${index}.answer`}
                textFieldProps={{
                  placeholder: '이메일',
                  type: 'email'
                }}
                label={
                  <Box component={'li'} sx={{ '::before': { content: `'${index + 1}'` } }}>
                    이메일
                  </Box>
                }
                control={control}
              />
            )
          case DEMOGRAPHIC_TYPE_ENUM.EDUCATION:
            return (
              <InputItem
                name={`items.${indexAnswers}.answers.${index}.answer`}
                label={
                  <Box component={'li'} sx={{ '::before': { content: `'${index + 1}'` } }}>
                    학력
                  </Box>
                }
                control={control}
                renderInput={({ field: { value, onChange } }) => {
                  const [education, educationStatus] = (value || '').split('_')
                  return (
                    <Box display={'flex'} gap={remConvert('8px')}>
                      <SelectItem
                        textFieldProps={{ placeholder: '학력' }}
                        control={control}
                        sxBox={{ flexGrow: 3, width: 0 }}
                        value={education}
                        onChangeCustom={(e) => onChange([e.target.value, educationStatus].join('_'))}
                        name={`items.${indexAnswers}.answers.${index}.answer`}
                      >
                        {Object.values(SURVEY_EDUCATION_ENUM).map((dataEnum) => (
                          <MenuItem key={dataEnum} value={dataEnum}>
                            {dataEnum}
                          </MenuItem>
                        ))}
                      </SelectItem>
                      <SelectItem
                        textFieldProps={{ placeholder: '상태' }}
                        control={control}
                        sxBox={{ flexGrow: 2, width: 0 }}
                        value={educationStatus}
                        onChangeCustom={(e) => onChange([education, e.target.value].join('_'))}
                        name={`items.${indexAnswers}.answers.${index}.answer`}
                      >
                        {Object.values(SURVEY_EDUCATION_STATUS_ENUM).map((dataEnum) => (
                          <MenuItem key={dataEnum} value={dataEnum}>
                            {dataEnum}
                          </MenuItem>
                        ))}
                      </SelectItem>
                    </Box>
                  )
                }}
              />
            )
          case DEMOGRAPHIC_TYPE_ENUM.CONTACT:
            return (
              <InputItem
                name={`items.${indexAnswers}.answers.${index}.answer`}
                textFieldProps={{
                  placeholder: '연락처'
                }}
                label={
                  <Box component={'li'} sx={{ '::before': { content: `'${index + 1}'` } }}>
                    연락처
                  </Box>
                }
                control={control}
              />
            )
          default:
            break
        }
      })}
    </Box>
  )
}
export default ViewDemographics
