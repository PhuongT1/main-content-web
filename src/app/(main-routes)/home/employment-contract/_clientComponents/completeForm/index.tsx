import React from 'react'
import { Box, Typography } from '@mui/material'
import { CARD_NEWS_TYPES } from '@/constants/cardnews.constant'
import styles from './complete.module.scss'
import { DeleteButton, EditButton } from '@/components/home/button'
import CompleteFormAccordion from '@/components/complete-form-accordion'
import useToggle from '@/hooks/use-toggle'
import { useRecoilState } from 'recoil'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { FormStatus } from '../../../card-news/utils/common'
import { ICardNewsInputOverride } from '../../contractDetailsForm2'
import { activeFormGroup } from '@/atoms/home/employment-contract'
import { ICardNewsInput } from '@/types/cardnews/index.type'

interface ICompletedFormProps {
  formData: {
    formType: CARD_NEWS_TYPES | unknown
    data: { [key: string]: string }
  }
  disableCollapse?: boolean
  id: string
  fields: ICardNewsInputOverride[]
  title: any
  subTitle: string
  onEdit?: () => void
  onDelete?: () => void
  onCollapse?: () => void
}

const CompletedForm: React.FC<ICompletedFormProps> = ({
  formData: { formType, data },
  title,
  subTitle,
  fields,
  onEdit,
  onDelete,
  onCollapse
}) => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [activeType] = useRecoilState(activeFormGroup)

  const CompleteChildren = ({ field }: { field: ICardNewsInputOverride }) => {
    const renderChildren = (childField: ICardNewsInputOverride) => {
      if (!childField.condition) {
        if (!data[childField.name] || childField.skipInCompleted) return null

        return (
          <Box component={'div'} className={styles.field_group}>
            {childField.skipLabel ? null : (
              <Typography component={'div'} className={[styles.field_title, styles['MuiTypography-root']].join(' ')}>
                {childField.label}
              </Typography>
            )}
            <Typography component={'div'} className={styles.field_content}>
              {childField.render ? childField.render(data) : data[childField.name]}
            </Typography>
          </Box>
        )
      }
      const valueCondition = data[childField.condition.key]

      return (
        <React.Fragment>
          {valueCondition === childField.condition.value &&
            childField.children?.map((cField: ICardNewsInput) => (
              <React.Fragment key={cField.name || childField.slot}>{renderChildren(cField)}</React.Fragment>
            ))}
        </React.Fragment>
      )
    }

    return renderChildren(field)
  }

  return (
    <>
      <CompleteFormAccordion
        title={title}
        status={FormStatus.completed}
        subTitle={subTitle}
        expanded={activeType === formType}
        onChange={() => {
          onCollapse && onCollapse()
        }}
      >
        <Box component={'div'} className={styles.step_content}>
          {fields.map((field: ICardNewsInputOverride) => (
            <React.Fragment key={field.name}>
              {field.groupTitle && (
                <Typography className={[styles.group_title, styles['MuiTypography-root']].join(' ')}>
                  {field.groupTitle}
                </Typography>
              )}
              <CompleteChildren field={field} />
            </React.Fragment>
          ))}
          <Box component={'div'} className={styles.group_buttons}>
            <EditButton
              title={'수정하기'}
              sx={{ minWidth: '0', width: '50%', backgroundColor: 'home.gray200' }}
              onClick={onEdit}
            />
            <DeleteButton
              title='삭제하기'
              sx={{ minWidth: '0', width: '50%' }}
              onClick={() => setToggleShowDialog(true)}
            />
          </Box>
        </Box>
      </CompleteFormAccordion>
      <DeleteDeck
        onSubmit={() => {
          onDelete && onDelete()
          setToggleShowDialog(false)
        }}
        description={'삭제된 데이터는 복구되지 않습니다. 진행하시겠습니까?'}
        title={'작성한 데이터가 삭제됩니다.'}
        open={showDialog}
        onCancel={toggleShowDialog}
        cancelTxt='닫기'
        submitTxt='삭제하기'
      />
    </>
  )
}

export default CompletedForm
