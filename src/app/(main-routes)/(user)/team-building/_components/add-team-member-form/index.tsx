'use client'

import { getCategories } from '@/actions/apis/category.action'
import { AddIcon } from '@/assets/icons'
import CloseCircleSmIcon from '@/assets/icons/close-circle-sm'
import { AddTeamLayer } from '@/assets/images'
import { MiniRoleCard } from '@/components'
import { SUB_CATEGORY } from '@/constants/common.constant'
import {
  CustomInput,
  DesignedSecondaryButton,
  IconButtonSizes,
  MenuItem,
  SecondaryActiveChip,
  Select,
  Typography,
  Upload
} from '@/elements'
import { useArray } from '@/hooks/use-array'
import { useLanguage } from '@/hooks/use-language'
import { Member } from '@/types/team-building.type'
import { Category, RequireChildren } from '@/types/types.type'
import { isOnlySpace } from '@/utils/string'
import { Box, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { ComponentProps, Dispatch, forwardRef, useEffect, useMemo, useState } from 'react'

type AddTeamMemberFormProps = {
  value?: Member[]
} & Omit<ComponentProps<'input'>, 'value'>

const Label = ({ children, subTitle = '' }: RequireChildren & { subTitle?: string }) => {
  return (
    <Typography cate='body_30' plainColor='main_grey.gray100'>
      {children}
      <Typography cate={'body_30'} component={'span'} plainColor='sub.red500'>
        *
      </Typography>{' '}
      <Typography cate={'body_20'} component={'span'} plainColor='main_grey.gray400'>
        {subTitle}
      </Typography>
    </Typography>
  )
}

const TeamMemberCard = ({
  member,
  setItemIsUpdating,
  onClearItem,
  idx
}: {
  member: Member
  setItemIsUpdating: Dispatch<number>
  onClearItem: (idx: number) => void
  idx: number
}) => {
  const theme = useTheme()

  return (
    <MiniRoleCard
      name={member.name}
      onclick={() => setItemIsUpdating(idx)}
      onclear={() => onClearItem(idx)}
      category={member.categories?.[0]?.name}
      relatedInfos={member.introduction}
      avatar={
        member.image && member.image.length > 0
          ? URL.createObjectURL(member.image[0])
          : member.memberRes?.avatar?.url || undefined
      }
      color={theme.palette.main_grey.gray300}
    />
  )
}

const AddTeamMemberForm = forwardRef<HTMLInputElement, AddTeamMemberFormProps>(({ value: members, onChange }, ref) => {
  const { dict } = useLanguage()
  const { array: categories, update, remove, clear: clearCategories } = useArray<Category>([])
  const [itemIsUpadating, setItemIsUpdating] = useState<number | null>(null)
  const [memberImage, setMemberImage] = useState<FileList>()
  const [name, setName] = useState<string | null>(null)
  const [relatedInfos, setRelatedInfos] = useState<string | null>(null)
  const theme = useTheme()

  const { data: memberRoles } = useQuery({
    queryKey: ['roles'],
    queryFn: () => getCategories({ subType: SUB_CATEGORY.TB_MEMBER })
  })

  const onAddCategory = (id: Number) => {
    const category = memberRoles?.data.find((role) => id === role.id)!
    update(0, category)
  }

  const onNameChange = (value: string) => {
    setName(value)
  }

  const onRelatedInfosChange = (value: string) => {
    setRelatedInfos(value)
  }

  const onClearItem = (idx: number) => {
    const newMembers = members?.filter((_, Iidx) => Iidx !== idx)
    onChange?.(newMembers as any)
    if (idx === itemIsUpadating) {
      setItemIsUpdating(null)
    }
  }

  const onAddMember = () => {
    const data: Member = {
      name: name || '',
      introduction: relatedInfos || '',
      image: memberImage,
      categories: categories
    }
    let newMembers
    if (members && members.length > 0) {
      newMembers = [...members, data]
    } else {
      newMembers = [data]
    }
    onChange?.(newMembers as any)
    clear()
  }

  const onUpdateMember = () => {
    const data: Member = {
      name: name || '',
      introduction: relatedInfos || '',
      image: memberImage,
      categories: categories,
      memberRes: members?.[itemIsUpadating!].memberRes
    }
    let newMembers
    if (members && members.length > 0) {
      newMembers = [...members]
      newMembers[itemIsUpadating!] = data
    }
    onChange?.(newMembers as any)
    clear()
    setItemIsUpdating(null)
  }

  const clear = () => {
    setName('')
    setRelatedInfos('')
    setMemberImage(undefined)
    clearCategories()
  }

  const imageUrl = useMemo(() => {
    if (memberImage && memberImage.length) {
      return URL.createObjectURL(memberImage[0])
    } else if (itemIsUpadating !== null) {
      return members?.[itemIsUpadating].memberRes?.avatar?.url || null
    }
    return null
  }, [memberImage, itemIsUpadating])

  useEffect(() => {
    if (itemIsUpadating !== null && members && members.length > 0) {
      const { name, introduction, image, categories } = members[itemIsUpadating]
      setName(name)
      setRelatedInfos(introduction)
      setMemberImage(image && image?.length > 0 ? image : undefined)
      if (categories[0]) {
        update(0, categories[0])
      }
    }
  }, [itemIsUpadating])

  return (
    <Box>
      <Box
        display={'flex'}
        gap={3}
        flexDirection={{ xs: 'column', lg: 'row' }}
        alignItems={{ xs: 'center', lg: 'unset' }}
      >
        <Box>
          <Box
            sx={{ height: { xs: 120, md: 194 }, width: { xs: 120, md: 194 } }}
            flexShrink={0}
            position={'relative'}
            {...ref}
          >
            <Image
              height={194}
              width={194}
              priority
              style={{ height: '100%', width: '100%', borderRadius: 10, objectFit: 'cover' }}
              src={imageUrl ? imageUrl : AddTeamLayer}
              alt='logo_team'
            />
            {!imageUrl && (
              <>
                <Box bgcolor={'#000000CC'} position={'absolute'} top={0} bottom={0} left={0} right={0} />
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'center'}
                  gap={1}
                  position={'absolute'}
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  justifyContent={'center'}
                >
                  <AddIcon
                    pathProps={{ stroke: theme.palette.main_grey.gray300 }}
                    circleProps={{ stroke: theme.palette.main_grey.gray300 }}
                  />
                  <Typography cate='button_30' plainColor='main_grey.gray300'>
                    {dict.select_image}
                  </Typography>
                </Box>
              </>
            )}
            <Upload onChange={(e: any) => setMemberImage(e as FileList)} />
          </Box>
        </Box>
        <Box width={'100%'}>
          <Box display={'flex'} gap={1} width={'100%'} flexDirection={{ xs: 'column', lg: 'row' }}>
            <Box width={'100%'} display={'flex'} flexDirection={'column'} gap={1}>
              <Label>이름</Label>
              <CustomInput
                placeholder='팀원의 이름을 입력해주세요.'
                value={name || ''}
                maxLength={30}
                onChange={(e) => onNameChange(e.target.value)}
                name=''
              />
            </Box>
            <Box width={'100%'} sx={{ opacity: 0 }}>
              hello
            </Box>
          </Box>
          <Box mt={{ xs: 0, lg: 2.25 }} display={'flex'} gap={1} flexDirection={{ xs: 'column', lg: 'row' }}>
            <Box display={'flex'} flexDirection={'column'} width={'100%'}>
              <Label>소속명</Label>
              <CustomInput
                placeholder='팀원의 소속명을 입력해주세요.'
                sx={{ mt: 1 }}
                maxLength={30}
                value={relatedInfos || ''}
                onChange={(e) => onRelatedInfosChange(e.target.value)}
                name=''
              />
              <Box height={8}>{/* <FormMessage>Error</FormMessage> */}</Box>
            </Box>
            <Box display={'flex'} flexDirection={'column'} width={'100%'}>
              <Label>분야</Label>
              <Select
                sx={{ mt: 1 }}
                placeholder='대한민국'
                displayEmpty
                value={''}
                fullWidth
                renderValue={(value) => {
                  if (!value) {
                    return (
                      <Typography cate='body_3' plainColor='main_grey.gray300'>
                        팀원의 역할 분야를 입력해 주세요.
                      </Typography>
                    )
                  }
                }}
                onChange={(e) => onAddCategory(e.target.value as Number)}
              >
                {(memberRoles?.data || []).map((i, index) => {
                  return (
                    <MenuItem value={i.id} key={i.id}>
                      <Typography cate='body_3' ml={2}>
                        {i?.name}
                      </Typography>
                    </MenuItem>
                  )
                })}
              </Select>
              <Box display={'flex'} gap={1}>
                {(categories || []).map((i, idx) => (
                  <SecondaryActiveChip
                    key={idx}
                    sx={{ px: 1.5, py: '16px', mt: 2 }}
                    chipHeight={44}
                    label={
                      <Box display={'flex'} gap={1} alignItems={'center'}>
                        <Typography cate='body_30' plainColor='main_primary.blue300'>
                          {i?.name}
                        </Typography>
                        <IconButtonSizes
                          sx={{ borderRadius: '9999px' }}
                          onClick={() => {
                            remove(idx)
                          }}
                        >
                          <CloseCircleSmIcon
                            svgProps={{ width: 16, height: 16, viewBox: '0 0 20 21' }}
                            pathProps={{ stroke: '#fff' }}
                          />
                        </IconButtonSizes>
                      </Box>
                    }
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {!isOnlySpace(name || '') && !isOnlySpace(relatedInfos || '') && categories.length > 0 && (
        <Box height={56} mt={2} display={'flex'} justifyContent={'flex-end'}>
          <DesignedSecondaryButton
            onClick={() => (itemIsUpadating !== null ? onUpdateMember() : onAddMember())}
            sx={{ width: 160 }}
          >
            <Typography plainColor='main_primary.blue300' cate='button_30'>
              {dict.teambuilding_add_member}
            </Typography>
          </DesignedSecondaryButton>
        </Box>
      )}
      <Box mt={6} display={'flex'} gap={2} flexWrap={'wrap'}>
        {members &&
          members.map((i, idx) => (
            <TeamMemberCard idx={idx} key={idx} member={i} {...{ setItemIsUpdating, onClearItem }} />
          ))}
      </Box>
    </Box>
  )
})

export default AddTeamMemberForm
