'use client'
import { Typography } from '@/elements'
import Button from '@/elements/button'
import { convertToRem } from '@/utils/convert-to-rem'
import { Container, Stack, useTheme } from '@mui/material'
import Link from 'next/link'

const StyleGuide = () => {
  const theme = useTheme()

  return (
    <Container>
      <Stack gap={convertToRem(20)}>
        <Typography cate='title_1_bold' color={theme.palette.main.white}>
          Core
        </Typography>
        <Link href='/style-guide/core/icon'>
          <Button
            customTitle={
              <Stack>
                <Typography cate='caption_1' color={theme.palette.main.white} sx={{ cursor: 'pointer' }}>
                  Icons
                </Typography>
              </Stack>
            }
            cate={'outlined'}
            customSize={'sm'}
            customType={'active'}
            sx={{ padding: '0.81rem 1.5rem', width: 'auto', height: 'auto' }}
            rounded
          />
        </Link>
      </Stack>

      <Stack gap={convertToRem(20)} paddingTop={convertToRem(50)}>
        <Typography cate='title_1_bold' color={theme.palette.main.white}>
          Project Home
        </Typography>
        <Link href='/style-guide/project-home/card'>
          <Button
            customTitle={
              <Stack>
                <Typography cate='caption_1' color={theme.palette.main.white} sx={{ cursor: 'pointer' }}>
                  Cards
                </Typography>
              </Stack>
            }
            cate={'outlined'}
            customSize={'sm'}
            customType={'active'}
            sx={{ padding: '0.81rem 1.5rem', width: 'auto', height: 'auto' }}
            rounded
          />
        </Link>
      </Stack>

      <Stack gap={convertToRem(20)} paddingTop={convertToRem(50)}>
        <Typography cate='title_1_bold' color={theme.palette.main.white}>
          Create Project
        </Typography>
        <Link href='/style-guide/create-project/card'>
          <Button
            customTitle={
              <Stack>
                <Typography cate='caption_1' color={theme.palette.main.white} sx={{ cursor: 'pointer' }}>
                  Cards
                </Typography>
              </Stack>
            }
            cate={'outlined'}
            customSize={'sm'}
            customType={'active'}
            sx={{ padding: '0.81rem 1.5rem', width: 'auto', height: 'auto' }}
            rounded
          />
        </Link>
      </Stack>
    </Container>
  )
}

export default StyleGuide
