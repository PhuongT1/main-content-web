import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, useTheme } from '@mui/material'
import { useMemo } from 'react'
import Image from 'next/image'
import { CardProjectCustom } from '../card-project-custom'
import { BackToFolder } from '@/assets/images'
import ArrowIcon from '@/assets/icons/arrow'
import { IFolderDetail, IParentFolder } from '../../../../domain'
import { useLanguage } from '@/hooks/use-language'
import * as S from './style'

interface IBackToFolderCard {
  title?: string
  folderDetail?: IFolderDetail
  onClick: (parent: IParentFolder) => void
}

interface IDataBackToFolder {
  level: number
  closestParent: IParentFolder
  rootParent: IParentFolder | null
  closestParentName: string
}

export const BackToFolderCard = ({ onClick, title, folderDetail }: IBackToFolderCard) => {
  const { dict } = useLanguage()
  const { palette } = useTheme()
  const { level, closestParent, closestParentName } = useMemo(() => {
    const level = folderDetail?.level || 1
    const parents = folderDetail?.parents || []
    const closestParent: any = parents[0] || {}
    const rootParent = parents.length > 1 ? parents[parents.length - 1] || {} : null
    const closestParentName = closestParent.name || ''

    return { level, closestParent, closestParentName, rootParent } as IDataBackToFolder
  }, [folderDetail])

  const backToFolderCard = useMemo(() => {
    return {
      content: (
        <S.BoxCard>
          <Box display='flex' flexDirection='column' gap={convertToRem(32)} justifyContent='center' flex={1}>
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              gap={convertToRem(10)}
            >
              <Image alt='Folder Icon' src={BackToFolder} width={60} height={60} />
              <Typography cate='body_2' plainColor='home.gray50'>
                {dict.project_home_go_to_previous}
              </Typography>
            </Box>

            <Box display='flex' flexDirection='row' alignItems='center'>
              {level > 1 && (
                <>
                  <Typography cate='caption_1' plainColor='home.gray50' flex='0 0 auto'>
                    {title || dict.project_home_title_my_project}
                  </Typography>
                  <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    flex='0 0 auto'
                    paddingX={convertToRem(8)}
                  >
                    <ArrowIcon
                      svgProps={{
                        width: '7',
                        height: '13',
                        stroke: palette.home.gray100
                      }}
                    />
                  </Box>
                </>
              )}
              <Typography
                cate='caption_1'
                plainColor='sub.orange500'
                flex='1 1 auto'
                textAlign={closestParentName ? 'left' : 'center'}
                lines={1}
              >
                {closestParentName || title || dict.project_home_title_my_project}
              </Typography>
            </Box>
          </Box>
        </S.BoxCard>
      )
    }
  }, [title, dict])

  return (
    <CardProjectCustom
      cardItem={backToFolderCard}
      isActive={false}
      sxCard={{
        outline: `2px solid ${palette.sub.orange500}`,
        '&:hover, &:focus': {
          backgroundColor: 'transparent',
          backgroundImage: 'none',
          '.MuiCardActionArea-root, .MuiCardActionArea-focusHighlight': {
            backgroundColor: 'transparent'
          }
        }
      }}
      onClick={() => onClick(closestParent)}
    />
  )
}

export default BackToFolderCard
