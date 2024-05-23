'use client'
import { DATE_FORMAT } from '@/constants/common.constant'
import { DateRange } from '@/libs/mui-daterange-picker/src'
import { CreateRecruitmentPayload, createRecruitment } from '@/services/team-building.service'
import yup from '@/services/yup.service'
import { TEAM_BUILDING_RECRUITMENT_STATUS } from '@/types/team-building.type'
import { PageParams } from '@/types/types.type'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import RecruitmentForm from '../../_components/recruitment-form'

export interface RecruitmentFormData {
  category: number
  description: string
  skills: string[]
  numberOfRecruits: number
  timeline: DateRange
}

const schema = yup.object({
  category: yup.number().required(),
  description: yup
    .string()
    .noOnlySpaces()
    .transform((str: string) => (str.replace('<p><br></p>', '').length > 0 ? str : undefined))
    .required(),
  skills: yup
    .array()
    .transform((skills: string[]) => {
      return skills && skills.length > 0 ? skills : undefined
    })
    .required(),
  numberOfRecruits: yup.number().required(),
  timeline: yup
    .mixed<DateRange>()
    .transform((date: DateRange) => {
      return date.endDate && date.startDate ? date : undefined
    })
    .required()
})

const RecruitmentPage = ({ params: { id, teambuildingId } }: PageParams<{ id: string; teambuildingId: string }>) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const defaultValues = {
    category: undefined,
    description: '',
    skills: [],
    numberOfRecruits: 1,
    timeline: {
      endDate: undefined,
      startDate: undefined
    }
  }

  const form = useForm<any>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const refetchRecruitments = () => {
    queryClient.invalidateQueries({ queryKey: ['recruitments'] })
  }

  const createRecruitmentAct = useMutation({
    mutationFn: createRecruitment,
    onSuccess: (data) => {
      if (data?.data?.id) {
        refetchRecruitments()
        router.push('/team-building')
      }
    }
  })

  const onCreate = (value: RecruitmentFormData, isPublish?: boolean) => {
    const payload: CreateRecruitmentPayload = {
      categoryId: value.category,
      description: value.description,
      skills: value.skills,
      numberOfRecruits: value.numberOfRecruits,
      fromDate: moment(value.timeline.startDate).format(DATE_FORMAT.DASH_REV),
      toDate: moment(value.timeline.endDate).format(DATE_FORMAT.DASH_REV),
      status: isPublish ? TEAM_BUILDING_RECRUITMENT_STATUS.ACTIVE : TEAM_BUILDING_RECRUITMENT_STATUS.HIDED
    }
    createRecruitmentAct.mutateAsync({ id: +teambuildingId, payload })
  }

  const onSubmit = (value: RecruitmentFormData, isPublish?: boolean) => {
    onCreate(value, isPublish)
  }

  return <RecruitmentForm {...{ form, onSubmit }} />
}

export default RecruitmentPage
