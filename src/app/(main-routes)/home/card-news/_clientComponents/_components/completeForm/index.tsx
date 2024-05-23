import React, { useContext, useMemo } from 'react'
import { Box, Typography } from '@mui/material'
import { CARD_NEWS_TYPES } from '@/constants/cardnews.constant'
import { FormStatus, cardNewsFormTypes } from '../../../utils/common'
import styles from './complete.module.scss'
import { ICardNewsGroup, ICardNewsInput } from '@/types/cardnews/index.type'
import { DeleteButton, EditButton } from '@/components/home/button'
import CompleteFormAccordion from '@/components/complete-form-accordion'
import FormDivider from '@/components/form-divider'
import { remConvert } from '@/utils/convert-to-rem'
import { CardNewsContext } from '../..'
import useToggle from '@/hooks/use-toggle'
import { useRecoilState } from 'recoil'
import { allCardData } from '@/atoms/home/card-news'
import { DeleteDeck } from '@/components/dialog/delete-deck'

interface ICompletedFormProps {
  formData: {
    formType: CARD_NEWS_TYPES | unknown
    data: { [key: string]: string }
  }
  disableCollapse?: boolean
  id: string
  onEdit?: () => void
  onDelete?: () => void
}

const CompletedForm: React.FC<ICompletedFormProps> = ({
  formData: { formType, data },
  id,
  disableCollapse,
  onEdit,
  onDelete
}) => {
  const { expandKey, setExpandKey } = useContext(CardNewsContext)
  const [allData] = useRecoilState(allCardData)
  const formGroup = useMemo(() => cardNewsFormTypes.find(({ type }) => type === formType), [formType])
  const expaned = id ? id === expandKey : true
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const hasEditCardForm = allData?.find((item) => item.status === FormStatus.inprogress)

  return (
    <>
      {formGroup && (
        <CompleteFormAccordion
          title={`${data?.prodDate} ${formGroup.title}`}
          subTitle={formGroup.subTitle}
          status={FormStatus.completed}
          expanded={expaned}
          onChange={() => {
            if (hasEditCardForm || disableCollapse) return
            id && setExpandKey(expaned ? '' : id)
          }}
        >
          <Box component={'div'} className={styles.step_content}>
            {formGroup.groups.map((group: ICardNewsGroup, index) => (
              <Box component={'div'} key={group.title}>
                <Typography className={[styles.group_title, styles['MuiTypography-root']].join(' ')}>
                  {group.title}
                </Typography>
                {group.fields.map((field: ICardNewsInput) => (
                  <Box key={field.name} component={'div'} className={styles.field_group}>
                    <Typography
                      component={'div'}
                      className={[styles.field_title, styles['MuiTypography-root']].join(' ')}
                    >
                      {field.label}
                    </Typography>
                    <Typography component={'div'} className={styles.field_content}>
                      {data[field.name]}
                    </Typography>
                  </Box>
                ))}
                {index < formGroup.groups.length - 1 && <FormDivider sx={{ margin: remConvert('24px 0') }} />}
              </Box>
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
      )}
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
