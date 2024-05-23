import TrashRedIcon from '@/assets/icons/dialog-icons/trash-red'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { ModalReset } from '@/components/dialog/modal-deck'
import { EditButton } from '@/components/home/button'
import { STEP } from '@/constants/common.constant'
import InputItem from '@/form/input'
import { useDialog } from '@/hooks/use-dialog'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Divider, Grid, Stack } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import styles from '../../[projectId]/style.module.scss'
import { TBusinessModelCavansForm } from '../../types/business-model-canvas.type'
import BusinessModelCanvas from '../business-model-canvas'

interface IStep_01_View {
  data?: any
}
function Step_01_View({ data }: IStep_01_View) {
  const { open, onClose, onOpen } = useDialog()
  const setCompleteStep = useSetRecoilState(completeStepSelector)
  const setExpandStep = useSetRecoilState(expandStepSelector)
  const setActiveStep = useSetRecoilState(activeStepSelector)
  const form = useFormContext<TBusinessModelCavansForm>()

  const onRemoveCompleteStep = () => {
    setCompleteStep((pre) => pre.filter((item) => item < STEP.STEP_ONE))
    setExpandStep((pre) => pre.filter((item) => item < STEP.STEP_ONE))
    setActiveStep(STEP.STEP_ONE)
  }

  return (
    <Box component={'form'} className={styles.step_content}>
      <Divider sx={{ mt: convertToRem(52), mb: convertToRem(60), width: '100%', bgcolor: 'main_grey.gray800' }} />

      <Box>
        <Box marginBottom={convertToRem(20)} component={'h2'}>
          사업 아이디어
        </Box>
        <Grid container spacing={2} sx={{ opacity: '.75', pointerEvents: 'none' }}>
          <Grid item xs={12} lg={3}>
            <InputItem name='industry' label='브랜드명' />
          </Grid>
          <Grid item xs={12} lg={9}>
            <InputItem name='idea' label='아이디어' />
          </Grid>
        </Grid>
      </Box>

      <BusinessModelCanvas form={form} data={data} isViewing />

      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <EditButton onClick={onOpen} />
      </Stack>

      {/* Modal */}
      <ModalReset
        title='이전 스텝을 수정하시겠습니까?'
        description='이전 스텝을 수정하면 데이터 연관이 있는 다음 스텝의 데이터가 모두 삭제됩니다. 진행하시겠습니까?'
        icon={<TrashRedIcon />}
        open={open}
        onCancel={onClose}
        onSubmit={onRemoveCompleteStep}
      />
    </Box>
  )
}

export default Step_01_View
