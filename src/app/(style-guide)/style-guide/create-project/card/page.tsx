'use client'
import { Typography } from '@/elements'
import { Stack, StackProps, styled } from '@mui/material'
import { RecommendProjectTemplate } from '@/app/(main-routes)/project-home/_modules/presenters/components/molecules'
import { IProjectTemplate } from '@/app/(main-routes)/project-home/_modules/domain'
import { DATA_PROJECT_TEMPLATE } from './mocks'

const ListCards = styled(Stack)<StackProps>(({ theme }) => ({
  '.MuiPaper-root': {
    height: 'auto'
  }
}))

const CardCreateProjectStyleGuide = () => {
  return (
    <Stack flexDirection='column' gap='30px'>
      <Typography cate='large_title' plainColor='main.white'>
        Cards
      </Typography>

      <ListCards flexDirection='row' flexWrap='wrap' gap='20px' alignItems='center' justifyContent='flex-start'>
        {DATA_PROJECT_TEMPLATE.map((project: IProjectTemplate, index: number) => {
          return (
            <RecommendProjectTemplate
              project={project}
              onSelect={(item) => console.log(item)}
              key={project.id || index}
              isFreeUser={index % 2 === 0}
            />
          )
        })}
      </ListCards>
    </Stack>
  )
}

export default CardCreateProjectStyleGuide
