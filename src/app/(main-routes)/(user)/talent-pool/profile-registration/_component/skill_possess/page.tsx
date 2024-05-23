'use client'

import { InputTags } from '@/components'
import { Form, FormControl, FormField, FormItem, FormMessage, Typography } from '@/elements'
import { yupResolver } from '@hookform/resolvers/yup'
import { Divider, Stack, useMediaQuery } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import * as yup from 'yup'
import { submitProfileAtom } from '../../../profile-atom'

const SkillPossess = () => {
  const mdDown = useMediaQuery('(max-width: 768px)')
  const [talentProfile, setTalentProfile] = useRecoilState(submitProfileAtom)
  const schema = yup.object({
    skills: yup.array().required('사용할 수 없는 아이디입니다.')
  })

  const defaultValues = {
    skills: []
  }

  const form = useForm<any>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const skills = form.watch('skills')

  useEffect(() => {
    setTalentProfile({ ...talentProfile, skills })
  }, [skills])

  useEffect(() => {
    if ((talentProfile.skills as string[]).length > 0) {
      form.setValue('skills', talentProfile.skills as string[])
    }
  }, [])

  return (
    <Stack width={'100%'} direction={'column'} alignItems={'center'} gap={6}>
      <Stack direction={'column'} alignItems={'center'} gap={2}>
        <Typography cate='sub_title_20' plainColor='main_primary.blue500'>
          Step 2
        </Typography>
        <Typography
          cate={mdDown ? 'title_70' : 'title_80'}
          sx={{ width: { md: '100%', sm: '68dvw' } }}
          textAlign={'center'}
        >
          내가 보유한 기술을 입력해 주세요.
        </Typography>
        <Typography cate={mdDown ? 'body_30' : 'body_40'} plainColor='main_grey.gray400'>
          상단의 3개 항목이 목록에 노출됩니다.
        </Typography>
      </Stack>

      <Stack width={'100%'}>
        <Typography cate='body_30'>보유기술 / 자격증</Typography>
        <Form {...form}>
          <FormField
            control={form.control}
            name='skills'
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel required>보유기술 / 자격증</FormLabel> */}
                <FormControl>
                  <InputTags
                    fullWidth
                    btnLabel={'추가하기'}
                    placeholder='보유 기술 또는 자격증을 입력해주세요 (ex. Figma, 컴퓨터활용능력 1급)'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </Stack>

      <Divider
        sx={{
          width: 'inherit'
        }}
      />
    </Stack>
  )
}

export default SkillPossess
