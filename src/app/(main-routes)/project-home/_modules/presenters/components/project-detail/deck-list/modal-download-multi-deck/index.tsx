'use client'
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableRow, useTheme } from '@mui/material'
import React, { FC, useMemo } from 'react'
import { Checkbox, Typography } from '@/elements'
import { ModalNotification } from '@/components/dialog/modal-deck'
import { AlertProps } from '@/components/dialog'
import { ButtonItem } from '@/components/home/button'
import CheckIcon from '@/assets/icons/check'
import { remConvert } from '@/utils/convert-to-rem'
import { ProjectDeckItem } from '@/app/(main-routes)/project-home/_modules/domain'
import { useFieldArray, useForm } from 'react-hook-form'
import { useLanguage } from '@/hooks/use-language'

interface Props extends AlertProps {
  listDecksCompleted: ProjectDeckItem[]
}

const ModalDownLoadMultiDeck: FC<Props> = ({ listDecksCompleted, onSubmit, ...rest }) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()

  const { control } = useForm<{ listSelect: ProjectDeckItem[] }>()
  const { fields, remove, append, replace } = useFieldArray({ keyName: 'key', control, name: 'listSelect' })

  const isCheckAll = useMemo(
    () => fields.length === listDecksCompleted.length,
    [listDecksCompleted.length, fields.length]
  )
  const handleClick = (data: ProjectDeckItem) => {
    const selectedIndex = fields.findIndex((item) => item.no === data.no)
    console.log(selectedIndex)
    selectedIndex >= 0 ? remove(selectedIndex) : append(data)
  }

  const checkAll = () => {
    isCheckAll ? replace([]) : replace(listDecksCompleted)
  }

  return (
    <ModalNotification
      title={
        <Box
          sx={{
            marginTop: '-18px',
            marginInline: '-32px',
            padding: '0 32px 32px',
            borderBottom: `1px solid ${home.gray200}`
          }}
        >
          <Typography cate='title_2_bold' color={home.gray50}>
            {dict.project_home_modal_download_multi_deck_title}
          </Typography>
          <Typography cate='body_20' color={home.gray100}>
            {dict.project_home_modal_download_multi_deck_description}
          </Typography>
        </Box>
      }
      description={
        <Stack sx={{ paddingTop: '10px' }} gap={remConvert('20px')}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography cate='body_30' color={home.gray100}>
              {dict.project_home_downloadable_materials}
            </Typography>
            <ButtonItem
              onClick={() => checkAll()}
              variant='text'
              className={[isCheckAll && 'isChecked'].join()}
              sx={{
                padding: '0 !important',
                minWidth: 'unset !important',
                color: home.gray100,
                '&.isChecked': {
                  color: home.blue500,
                  'svg path': {
                    stroke: home.blue500
                  }
                }
              }}
              startIcon={
                <CheckIcon
                  svgProps={{ width: remConvert('20px'), height: remConvert('20px') }}
                  pathProps={{ stroke: home.gray100 }}
                />
              }
            >
              {dict.common_select_all}
            </ButtonItem>
          </Stack>
          <TableContainer
            sx={{
              borderRadius: remConvert('10px'),
              paddingBlock: remConvert('16px'),
              background: home.gray300,
              maxHeight: remConvert('384px')
            }}
          >
            <Table aria-labelledby='tableTitle' size={'medium'}>
              <TableBody>
                {listDecksCompleted.map((row, index) => {
                  const isItemSelected = !!fields.find((item) => item.no === row.no)
                  const labelId = `enhanced-table-checkbox-${index}`
                  return (
                    <TableRow
                      hover
                      onClick={() => handleClick(row)}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.no}
                      selected={isItemSelected}
                      sx={{
                        cursor: 'pointer',
                        'td, th': {
                          borderBottom: `1px solid ${home.gray300}`
                        }
                      }}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          color='primary'
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId
                          }}
                        />
                      </TableCell>
                      <TableCell component='th' id={labelId} scope='row' padding='none'>
                        {row.name}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      }
      onSubmit={() => onSubmit && onSubmit(fields)}
      {...rest}
    />
  )
}
export default ModalDownLoadMultiDeck
