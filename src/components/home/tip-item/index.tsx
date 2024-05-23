import { Box, Button, Grid, SxProps, useTheme } from '@mui/material'
import React, { FC, useCallback, useEffect, useId, useRef, useState } from 'react'
import styles from './tip.module.scss'
import { remConvert } from '@/utils/convert-to-rem'
import { Typography } from '@/elements'
import { v4 as uuidv4 } from 'uuid'
import { useLanguage } from '@/hooks/use-language'

const LINE_HEIGHT = 20
const MAX_SPACING = 10

interface Props {
  content: React.ReactNode
  line?: number
  notExpand?: boolean
  containerSx?: SxProps
}

const TipItem: FC<Props> = ({ content, line = 1, notExpand = false, containerSx }) => {
  const {
    palette: { home }
  } = useTheme()
  const [isShowTip, setShowTip] = useState<boolean>(false)
  const { dict } = useLanguage()

  return (
    <Grid
      container
      component={'div'}
      display={'flex'}
      className={styles.layer_item}
      sx={{ backgroundColor: home.alpha_mint_10, ...containerSx }}
      alignItems={isShowTip ? 'flex-start' : 'center'}
    >
      <Grid
        item
        component={'p'}
        className={styles.title}
        sx={{
          color: home.mint500
        }}
      >
        TIP
      </Grid>
      <Grid
        item
        className={[styles.content, !isShowTip && styles.truncate].join(' ')}
        sx={{ color: home.gray50, WebkitLineClamp: line, whiteSpace: 'pre-line' }}
      >
        {content}
      </Grid>
      {!notExpand && (
        <Grid item xs={isShowTip && 12} alignItems={'end'} justifyItems={'end'} className={styles.layer_button}>
          <Button sx={{ color: home.mint500 }} onClick={() => setShowTip(!isShowTip)}>
            {isShowTip ? dict.common_deck_brief_view : dict.common_deck_more_view}
          </Button>
        </Grid>
      )}
    </Grid>
  )
}

export default TipItem

export const ExpandItem: FC<Props> = ({ content, line = 1, notExpand = false, containerSx }) => {
  const {
    palette: { home }
  } = useTheme()
  const { dict } = useLanguage()
  const id = uuidv4()
  const [isShowTip, setShowTip] = useState<boolean>(false)
  const [showExpand, setShowExpand] = useState<boolean>(true)

  const handleResize = useCallback(() => {
    const boxs = document.querySelectorAll(`.box_text_${id}`)
    if (boxs.length === 0) return
    boxs.forEach((box) => {
      if (box.children.length === 0) return

      const childrenWidth = box.children[0].clientWidth

      const isExpand = box.clientHeight > LINE_HEIGHT * line && box.clientWidth >= childrenWidth + MAX_SPACING

      setShowExpand(isExpand)
    })
  }, [id])

  useEffect(() => {
    handleResize()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Grid
      container
      component={'div'}
      display={'flex'}
      className={styles.layer_item}
      sx={{ padding: 0, alignItems: 'end', gap: remConvert('4px'), ...containerSx }}
      alignItems={isShowTip ? 'flex-start' : 'center'}
    >
      <Grid
        item
        className={[styles.content, !isShowTip && styles.truncate].join(' ')}
        sx={{ color: home.gray50, WebkitLineClamp: line, whiteSpace: 'pre-line' }}
      >
        <Box className={`box_text_${id}`} component={'div'} width={1}>
          <Typography component={'span'} cate='sub_title_30' color={home.gray50} width={'fit-content'}>
            {content}
          </Typography>
        </Box>
      </Grid>
      {!notExpand && !!showExpand && (
        <Grid item xs={isShowTip && 12} alignItems={'center'} justifyItems={'center'} className={styles.layer_button}>
          <Button
            sx={{ color: home.mint500 }}
            onClick={(e) => {
              e.stopPropagation()
              setShowTip(!isShowTip)
            }}
          >
            {isShowTip ? dict.common_deck_brief_view : dict.common_deck_more_view}
          </Button>
        </Grid>
      )}
    </Grid>
  )
}
