'use client'
import { Typography } from '@/elements'
import { Thumbnail } from '@/types/startup/toolkit.type'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import { CircularProgress, Stack, SxProps } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { animated, useSpring } from '@react-spring/web'
import { Viewer as HWPViewer } from 'hwp.js'
import * as React from 'react'

interface FadeProps {
  children: React.ReactElement
  in?: boolean
  onClick?: any
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void
  onExited?: (node: HTMLElement, isAppearing: boolean) => void
  ownerState?: any
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { children, in: open, onClick, onEnter, onExited, ownerState, ...other } = props
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true)
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true)
      }
    }
  })

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  )
})

const style: SxProps = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: { md: '100dvh', sm: '80dvh' },
  width: { md: '70dvw', sm: '100dvw' },
  boxShadow: 24,
  p: 2
}

type FilePreviewModalProps = {
  open: boolean
  docObject: Thumbnail
  handleClose: () => void
}

export default function FilePreviewModal({ open, docObject, handleClose }: FilePreviewModalProps) {
  const fileExtension = docObject.name ? docObject.name.split('.')[1] : ''

  const docs = [{ uri: docObject.url ? docObject.url : '' }]
  return (
    <Modal
      aria-labelledby='spring-modal-title'
      aria-describedby='spring-modal-description'
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade
        }
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          {fileExtension === 'hwp' ? (
            <HWPViewerPage url={docObject.url ? docObject.url : ''} />
          ) : (
            <DocViewer documents={docs} prefetchMethod='GET' pluginRenderers={DocViewerRenderers} />
          )}
        </Box>
      </Fade>
    </Modal>
  )
}

function HWPViewerPage({ url }: { url: string }) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const [isLoadFile, setIsLoadFile] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState('')

  React.useEffect(() => {
    setIsLoadFile(true)
    loadFile()
  }, [])

  const showViewer = React.useCallback((file: File) => {
    const reader = new FileReader()

    reader.onloadend = (result) => {
      const bstr = result.target?.result

      if (bstr && ref.current) {
        try {
          new HWPViewer(ref.current, bstr as Uint8Array)
        } catch (e: any) {
          setErrorMessage(e.message)
        }
      }
    }

    reader.readAsBinaryString(file)
    setIsLoadFile(false)
  }, [])

  const loadFile = React.useCallback(() => {
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'arraybuffer' // Set the responseType to 'arraybuffer' to receive binary data
    xhr.onload = function () {
      if (xhr.status === 200) {
        try {
          // Create a Blob from the response arraybuffer
          const blob = new Blob([xhr.response])

          // Create a File from the Blob
          const file = new File([blob], 'random')

          // Call the showViewer function with the loaded file
          showViewer(file)
        } catch (error) {
          console.error('Error creating file:', error)
        }
      } else {
        console.error('Error loading file. Status:', xhr.status)
      }
    }

    xhr.open('GET', url)
    xhr.send()
  }, [])

  return isLoadFile ? (
    <Stack justifyContent={'center'} alignItems={'center'} height={'100%'}>
      <CircularProgress color='primary' />
    </Stack>
  ) : errorMessage !== '' ? (
    <Stack justifyContent={'center'} alignItems={'center'} height={'100%'}>
      <Typography cate='title_80' plainColor='main.white'>
        Can not open file with error {errorMessage}
      </Typography>
    </Stack>
  ) : (
    <Box
      sx={{
        height: { md: '100dvh', sm: '80dvh' }
      }}
      className='viewer'
      ref={ref}
    />
  )
}
