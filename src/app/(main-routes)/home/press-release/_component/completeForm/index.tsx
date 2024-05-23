import { SanitizationHtml } from '@/components'
import CompleteFormAccordion from '@/components/complete-form-accordion'
import FormDivider from '@/components/form-divider'
import { DeleteButton, EditButton } from '@/components/home/button'
import { FormStatus, PRESS_RELEASE_TYPES } from '@/constants/press-release.constant'
import { IPressReleaseGroup, IPressReleaseInput } from '@/types/press-release/press-release.type'
import { Box, Stack, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { pressReleaseFormTypes } from '../utils/common'
import styles from './complete.module.scss'

interface ICompletedFormProps {
  formData: {
    formType: PRESS_RELEASE_TYPES
    data: { [key: string]: string }
  }
  onEdit?: () => void
  onDelete?: () => void
  onChange?: (event: React.SyntheticEvent<Element, Event>, expanded: boolean) => void
  expand?: boolean
}

const CompletedForm: React.FC<ICompletedFormProps> = ({
  formData: { formType, data },
  onEdit,
  onDelete,
  expand,
  onChange
}) => {
  const formGroup = useMemo(() => pressReleaseFormTypes.find(({ type }) => type === formType), [formType])

  return (
    <>
      {formGroup && (
        <CompleteFormAccordion
          title={`${data.distributionDate} ${data.title}`}
          subTitle={formGroup.description}
          status={FormStatus.completed}
          expanded={expand}
          onChange={onChange}
          sx={{
            border: expand ? '1px solid' : undefined,
            borderColor: 'home.blue500',
            width: '100%'
          }}
        >
          <Stack className={styles.step_content} gap={2.5}>
            {formGroup.groups.map((group: IPressReleaseGroup, index) => (
              <Stack key={group.title}>
                <Typography className={[styles.group_title, styles['MuiTypography-root']].join(' ')}>
                  {group.title}
                </Typography>
                {group.fields.map((field: IPressReleaseInput) => (
                  <Box key={field.name} component={'div'} className={styles.field_group}>
                    <Typography
                      component={'div'}
                      className={[styles.field_title, styles['MuiTypography-root']].join(' ')}
                    >
                      {field.label}
                    </Typography>
                    <Typography component={'div'} className={styles.field_content}>
                      <SanitizationHtml sx={{ width: '100%' }}>
                        {data[field.name].replace(/\n/g, '<br/>')}
                      </SanitizationHtml>
                      {/* {data[field.name]} */}
                    </Typography>
                  </Box>
                ))}
                {index < formGroup.groups.length - 1 && <FormDivider />}
              </Stack>
            ))}
            <Stack direction={'row'} className={styles.group_buttons}>
              <EditButton title={'수정하기'} sx={{ width: '100%', minWidth: 'unset' }} onClick={onEdit} />
              <DeleteButton
                title='삭제하기'
                sx={{ width: '100%', minWidth: 'unset', '&:hover': { opacity: 0.7, backgroundColor: 'home.red500' } }}
                onClick={onDelete}
              />
            </Stack>
          </Stack>
        </CompleteFormAccordion>
      )}
    </>
  )
}

export default CompletedForm
