import CardSelectedBox from '@/app/(main-routes)/home/teambuilding/_components/card-selected'
import { BoxLayout } from '@/components/home/box/box-custom'
import { MultiCheckbox } from '@/form/checkbox'
import { Box, Stack, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { useFormContext } from 'react-hook-form'
import { useHandleFieldArray } from '@/app/(main-routes)/home/teambuilding/utils/handler'
import { listenEvent } from '@/utils/events'
import styles from './idea-keyword.module.scss'
import InputItem from '@/form/input'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import ErrorMessage from '@/form/ErrorMessage'
import { EventNameTBuidlding } from '@/constants/teambuilding/teambuilding.constant'
import { MoreButton } from '@/components/home/button'
import ScrollBar from 'react-perfect-scrollbar'
import LoadingAI from '@/elements/loadingAI'
import { TIdiaFormValues } from '@/types/idea.type'
import { useLanguage } from '@/hooks/use-language'
import { LANG } from '@/constants/common.constant'

export const MAX_IDEAS = 12
export const MIN_IDEAS = 5

const MAX_ITEM_AI = 50

type IdeaKeyWordListProps = {
  onLoadMore: VoidFunction
  isLoading: boolean
  isLoadMore: boolean
}

function IdeaKeyWordList({ onLoadMore, isLoading, isLoadMore }: IdeaKeyWordListProps) {
  const { dict, lang, getValueLanguage } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const form = useFormContext<TIdiaFormValues>()

  const {
    getValues,
    watch,
    formState: { errors }
  } = form

  const [message, setMessageError] = useState<string>('')
  const dataAI = watch('writeIdeas.ideasDataAI')

  const { fields, onRemoveItem, append } = useHandleFieldArray('writeIdeas.ideas')

  const handleAddManualIdea = () => {
    const manualInput = getValues('writeIdeas.manualInput')

    if (fields.length >= MAX_IDEAS) {
      return true
    }
    if (manualInput) {
      const isCheckExistIdea = fields.find((item: any) => item.id === manualInput)

      if (!isCheckExistIdea) {
        append({ id: manualInput, content: manualInput, contentEn: manualInput })
      }
      form.resetField('writeIdeas.manualInput')

      return true
    }
    return false
  }
  const onChangeChecked = (item: any | undefined, checked: boolean) => {
    if (!item) {
      setMessageError(dict.idea_select_keyword_msg)
      return
    } else {
      setMessageError('')
    }
    if (checked) {
      onRemoveItem(item)
    } else {
      if (fields.length < MAX_IDEAS) {
        append(item)
      }
    }
  }

  useEffect(() => {
    listenEvent('SHOW_ERROR_KEYWORD_AI', () => {
      setMessageError(dict.idea_select_keyword_msg)
    })
  }, [])

  useEffect(() => {
    listenEvent(EventNameTBuidlding.CLEAR_ERROR_MSG, () => {
      setMessageError('')
    })
  }, [])

  return (
    <Box component={'div'} gap={'20px'} display={'flex'} flexDirection={'column'}>
      <LoadingAI isLoading={isLoading}>
        <BoxLayout
          display={'flex'}
          flexDirection={'column'}
          gap={'26px'}
          sx={{
            backgroundColor: (theme) => theme.palette.home.gray400,
            minHeight: remConvert('240px'),
            maxHeight: convertToRem(444)
          }}
        >
          <Box width={1} component={'div'}>
            <ScrollBar style={{ maxHeight: remConvert('328px') }}>
              <MultiCheckbox
                row
                maxLength={MAX_IDEAS}
                countItemRow={6}
                onChangeChecked={onChangeChecked}
                render={(item: any) => (
                  <Box
                    display='flex'
                    justifyContent='start'
                    alignItems='center'
                    gap={1}
                    className={styles.box_selected_content}
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {getValueLanguage(item, 'content')}
                  </Box>
                )}
                name='writeIdeas.ideas'
                list={{
                  options: dataAI,
                  value: 'id',
                  label: lang === LANG.EN ? 'contentEn' : 'content'
                }}
                control={form.control}
              />
            </ScrollBar>
          </Box>
          <Box display='flex' justifyContent='center' alignItems='center' gap={2} width='100%'>
            <MoreButton
              disabled={(dataAI && dataAI.length >= MAX_ITEM_AI) || isLoading || isLoadMore}
              svgComponentProps={{
                pathProps: {
                  stroke: (dataAI && dataAI.length >= MAX_ITEM_AI) || isLoading ? home.gray200 : home.gray50
                }
              }}
              onClick={onLoadMore}
            />
          </Box>
        </BoxLayout>
      </LoadingAI>

      <CardSelectedBox
        title={dict.selected_keyword}
        countItemRow={6}
        onRemove={onRemoveItem}
        manualInput={{
          placeholder: dict.direct_input,
          renderInput: (
            <InputItem
              sxInput={{
                '& .MuiInputBase-root': {
                  padding: '6px',
                  maxHeight: 42,
                  backgroundColor: home.gray300,
                  borderRadius: `8px`,
                  '& > fieldset': {
                    borderRadius: `8px`,
                    borderColor: home.gray200
                  },
                  '&.Mui-readOnly': {
                    backgroundColor: home.gray200
                  }
                }
              }}
              control={form.control}
              maxLength={15}
              name={`writeIdeas.manualInput`}
              textFieldProps={{ placeholder: dict.direct_input }}
            />
          ),
          onClickButtonApply: handleAddManualIdea,
          disableButton: fields?.length === MAX_IDEAS
        }}
        list={{
          selectedList: fields as any,
          key: 'id',
          label: lang === LANG.EN ? 'contentEn' : 'content',
          render: (item: any) => {
            return (
              <Box className={styles.box_selected_content} component={'div'} display={'flex'} alignItems={'center'}>
                <p>{getValueLanguage(item, 'content')}</p>
              </Box>
            )
          }
        }}
      />
      {message && (
        <Stack sx={{ width: 1 }}>
          <ErrorMessage message={message} />
        </Stack>
      )}
    </Box>
  )
}

export default IdeaKeyWordList
