'use client'
import { DATE_FORMAT } from '@/constants/common.constant'
import { DateRange } from '@/libs/mui-daterange-picker/src'
import { CreateRecruitmentPayload, getRecruitmentDetail, updateRecruitment } from '@/services/team-building.service'
import yup from '@/services/yup.service'
import { TEAM_BUILDING_RECRUITMENT_STATUS } from '@/types/team-building.type'
import { PageParams } from '@/types/types.type'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import RecruitmentForm from '../../../_components/recruitment-form'

interface RecruitmentForm {
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

  const { data: recruitment } = useQuery({
    queryKey: ['recruitment'],
    queryFn: () => {
      if (id && !isNaN(+id)) {
        return getRecruitmentDetail({ recruitId: +id, teambuildingId: +teambuildingId })
      }
      return Promise.reject()
    }
  })

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

  const { reset } = form

  const refetchRecruitments = async () => {
    await queryClient.invalidateQueries({ queryKey: ['recruitments'] })
  }

  const updateRecruitmentAct = useMutation({
    mutationFn: updateRecruitment,
    onSuccess: async (data) => {
      if (data?.data?.id) {
        await refetchRecruitments()
        router.push('/team-building')
      }
    }
  })

  const onUpdate = (value: RecruitmentForm, isPublish?: boolean) => {
    const payload: CreateRecruitmentPayload = {
      categoryId: value.category,
      description: value.description,
      skills: value.skills,
      numberOfRecruits: value.numberOfRecruits,
      fromDate: moment(value.timeline.startDate).format(DATE_FORMAT.DASH_REV),
      toDate: moment(value.timeline.endDate).format(DATE_FORMAT.DASH_REV),
      status: isPublish ? TEAM_BUILDING_RECRUITMENT_STATUS.ACTIVE : TEAM_BUILDING_RECRUITMENT_STATUS.HIDED
    }
    updateRecruitmentAct.mutateAsync({ id: +teambuildingId, recruitId: +id, payload })
  }

  const onSubmit = (value: RecruitmentForm, isPublish?: boolean) => {
    onUpdate(value, isPublish)
  }

  useEffect(() => {
    if (!teambuildingId || isNaN(+teambuildingId)) {
      router.push('/team-building')
    }
  }, [id])

  useEffect(() => {
    if (recruitment?.data) {
      const { data } = recruitment
      const formData: RecruitmentForm = {
        category: data.categoryId,
        description: data.description,
        skills: data.skills,
        numberOfRecruits: data.numberOfRecruits,
        timeline: {
          startDate: moment(data.fromDate).toDate(),
          endDate: moment(data.toDate).toDate()
        }
      }
      reset(formData)
    }
  }, [recruitment?.data])

  return <RecruitmentForm {...{ form, onSubmit }} />
}

export default RecruitmentPage
