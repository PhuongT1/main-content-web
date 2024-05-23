'use client'
import CardBox from '@/components/cards/card-box'
import { DATE_FORMAT } from '@/constants/common.constant'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Divider, Stack } from '@mui/material'
import moment from 'moment'
import { RefObject, forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { IOpenAiPressRelease, IPressResult } from '../../press-release.atom'
import EditableImage from '../editable-image'
import EditableText from '../editable-text'

interface PressResultProps {
  pressContent: IOpenAiPressRelease
  isEdit: boolean
}

export interface PressResultRefProps {
  haveImage: boolean
  boxRef: RefObject<HTMLElement>
  editContent: IPressResult
  removeImageNode: () => void
  addImageNode: () => void
}

const PressReleaseResult = forwardRef<PressResultRefProps, PressResultProps>(({ pressContent, isEdit }, ref) => {
  const [content, setContent] = useState(pressContent.result)
  const boxRef = useRef<HTMLElement>(null)
  const referenceRef = useRef<HTMLElement>(null)
  const imageRef = useRef(null)

  useImperativeHandle(ref, () => ({
    haveImage: pressContent.result.Press_Thumbnail !== undefined,
    editContent: content,
    boxRef: boxRef,
    removeImageNode: () => {
      if (imageRef.current && boxRef.current) {
        boxRef.current.removeChild(boxRef.current.childNodes[4])
      }
    },
    addImageNode: () => {
      if (imageRef.current && referenceRef.current && boxRef.current) {
        referenceRef.current.parentNode?.insertBefore((imageRef.current as any).editImageRef, referenceRef.current)
      }
    }
  }))

  const handleSave = (key: any, newVal: string) => {
    console.log(`${JSON.stringify(newVal)}`)
    setContent({ ...content, [key]: newVal })
  }

  const onChangeImage = (key: any, newUrl: string) => {
    setContent({ ...content, [key]: newUrl })
  }

  useEffect(() => {
    setContent(pressContent.result)
  }, [pressContent])

  return (
    <CardBox
      sx={{
        backgroundColor: 'main.white',
        borderRadius: convertToRem(10),
        minHeight: convertToRem(300),
        padding: `${convertToRem(50)} ${convertToRem(40)}`,
        width: '100%'
      }}
      ref={boxRef}
    >
      <EditableText
        onSave={(newVal) => handleSave('Title', newVal)}
        textSx={{
          color: 'black',
          fontSize: '24px',
          fontStyle: 'normal',
          fontWeight: 600,
          lineHeight: 'normal'
        }}
      >
        {content.Title}
      </EditableText>
      <br />
      <EditableText
        onSave={(newVal) => handleSave('Distribution_Date', newVal)}
        textSx={{
          textAlign: 'right',
          color: 'black'
        }}
      >
        {content.Distribution_Date
          ? moment(content.Distribution_Date).format(DATE_FORMAT.DOT_REV)
          : moment().format(DATE_FORMAT.DOT_REV)}
      </EditableText>
      <br />
      <EditableImage
        ref={imageRef}
        imgUrl={content.Press_Thumbnail ?? ''}
        onChangeImage={(newUrl) => onChangeImage('Press_Thumbnail', newUrl)}
      />
      <Box ref={referenceRef} />
      <br />
      <Stack
        sx={{
          color: 'black',
          gap: convertToRem(5)
        }}
      >
        <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={2}>
          <Divider
            orientation='vertical'
            sx={{
              borderColor: 'black',
              borderWidth: convertToRem(1.4),
              margin: `${convertToRem(4)} 0`,
              height: convertToRem(16)
            }}
          />
          <EditableText
            onSave={(newVal) => handleSave('Core_Headline_1', newVal)}
            textSx={{
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: '150%'
            }}
          >
            {content.Core_Headline_1}
          </EditableText>
        </Stack>
        <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={2}>
          <Divider
            orientation='vertical'
            sx={{
              borderColor: 'black',
              borderWidth: convertToRem(1.4),
              margin: `${convertToRem(4)} 0`,
              height: convertToRem(16)
            }}
          />
          <EditableText
            onSave={(newVal) => handleSave('Core_Headline_2', newVal)}
            textSx={{
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: '150%'
            }}
          >
            {content.Core_Headline_2}
          </EditableText>
        </Stack>
        <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={2}>
          <Divider
            orientation='vertical'
            sx={{
              borderColor: 'black',
              borderWidth: convertToRem(1.4),
              margin: `${convertToRem(4)} 0`,
              height: convertToRem(16)
            }}
          />
          <EditableText
            onSave={(newVal) => handleSave('Core_Headline_3', newVal)}
            textSx={{
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: '150%'
            }}
          >
            {content.Core_Headline_3}
          </EditableText>
        </Stack>
      </Stack>
      <br />
      <Stack
        sx={{
          color: 'black'
        }}
      >
        <EditableText onSave={(newVal) => handleSave('Content_Introduction', newVal)}>
          {content.Content_Introduction}
        </EditableText>
        <br />
        <br />
        <EditableText onSave={(newVal) => handleSave('Content_Main_1', newVal)}>{content.Content_Main_1}</EditableText>
        <br />
        <EditableText onSave={(newVal) => handleSave('Content_Main_2', newVal)}>{content.Content_Main_2}</EditableText>
        <br />
        <EditableText onSave={(newVal) => handleSave('Content_Main_3', newVal)}>{content.Content_Main_3}</EditableText>
        <br />
        <br />
        <EditableText onSave={(newVal) => handleSave('Content_Conclusion', newVal)}>
          {content.Content_Conclusion}
        </EditableText>
      </Stack>
    </CardBox>
  )
})

export default memo(PressReleaseResult, (prev, next) => {
  return prev === next
})
