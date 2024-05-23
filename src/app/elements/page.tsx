'use client'

import { AddIcon, Edit05Icon, Trash03Icon, UShareIcon } from '@/assets/icons'
import TrashIcon from '@/assets/icons/trash'
import { InputTags } from '@/components'

import {
  BaseChip,
  BlackLabel,
  CommentActionMenu,
  CustomInput,
  Divider,
  ErrorMessage,
  Gray700Chip,
  GrayButton,
  GraySolidIconButton,
  Orange400Chip,
  OutlineBlue300Chip,
  PrimaryButton,
  PrimaryCheckbox,
  PrimarySwitch,
  PrimaryTextarea,
  RoundedSolidIconButton,
  SecondaryActiveChip,
  SecondaryButton,
  SecondaryIconButton,
  SelectStack,
  SolidInput,
  Tag,
  Typography,
  Upload,
  WhiteInput
} from '@/elements'
import { CardBadge } from '@/elements/v2/badge'
import {
  DesignedLinkButton,
  DesignedPrimaryButton,
  DesignedSecondaryButton,
  DesignedTransparentButton,
  GhostBorderButton,
  GhostButton,
  RoundedButton,
  SecondaryGrayButton
} from '@/elements/v2/button'
import SearchInput from '@/elements/v2/input/search-input'
import RangeDatepicker from '@/elements/v2/range-date-picker'
import { ROLES } from '@/types/team-building.type'
import { Box, Stack, useTheme } from '@mui/material'

const data = [
  {
    title: '공유하기',
    icon: <UShareIcon />,
    onClick: () => {
      console.log('ok')
    }
  },
  {
    title: '수정하기',
    icon: <Edit05Icon />,
    onClick: () => {
      console.log('ok')
    }
  },
  {
    title: '삭제하기',
    icon: <Trash03Icon />,
    onClick: () => {
      console.log('ok')
    }
  }
]

const ComponentsPage = () => {
  return (
    <>
      <MockButton />
      <MockCheckbox />
      <MockText />
      <MockChip />
      <MockIconButton />
      <MockInput />
      <Typography>Tag</Typography>
      <Tag>Hello</Tag>
      <Typography>Badge</Typography>
      <Stack direction={'row'} gap={1}>
        <CardBadge state='HOT' label='프리미엄' />
        <CardBadge state='NEW' label='프리미엄' />
        <CardBadge state='PREMIUM' label='프리미엄' />
        <CardBadge state='FREE' label='프리미엄' />
      </Stack>
      <MockSwitch />
      <MockSelect />
      <MockUpload />
      <MockTextArea />
      <CommentActionMenu
        handleDelete={() => {}}
        handleEdit={() => {}}
        // handleShare={() => {}}
        url={''}
        isOwn={true}
        commentId={1}
      />
      <MockRangeDataPicker />
      <MockMixedElements />
    </>
  )
}

const MockMixedElements = () => {
  return (
    <Box>
      <Typography mt={4}>Divider</Typography>
      <Divider />
    </Box>
  )
}

const MockTextArea = () => {
  const theme = useTheme()
  return (
    <>
      <Typography>TextArea</Typography>{' '}
      <PrimaryTextarea
        sx={{ height: '122px !important', width: '100%' }}
        placeholder='어떤 팀을 꾸리고 계신가요? 팀 소개를 200자 이내로 작성해 주세요.'
      />
    </>
  )
}

const MockUpload = () => {
  const theme = useTheme()
  return (
    <>
      <Typography>Upload</Typography>{' '}
      <SecondaryButton
        btnSize='md'
        fullWidth
        active
        sx={{
          py: 2.25,
          px: 3,
          alignItems: 'center'
        }}
      >
        <Typography cate='button_30' plainColor='main_grey.gray200'>
          파일첨부
        </Typography>
        <AddIcon
          pathProps={{ stroke: theme.palette.main_primary.blue300 }}
          circleProps={{ stroke: theme.palette.main_primary.blue300 }}
        />
        <Upload merge multiple />
      </SecondaryButton>
    </>
  )
}

const MockSelect = () => {
  const CATEGORY_VALUE = [
    {
      label: '개발자',
      value: ROLES.DEVELOPER
    },
    {
      label: '기획자',
      value: ROLES.PLANNER
    },
    {
      label: '디자이너',
      value: ROLES.DESIGNER
    },
    {
      label: '마케터',
      value: ROLES.MAKERTER
    },
    {
      label: '영업담당자',
      value: ROLES.SALE_MANAGER
    },
    {
      label: '인사담당자',
      value: ROLES.HUMAN_RESOURCES_DIRECTOR
    },
    {
      label: '기타',
      value: ROLES.OTHER
    }
  ]
  return (
    <>
      <Typography>Select</Typography>
      <SelectStack placeholder='모집 공고 분야를 입력해주세요.' list={CATEGORY_VALUE} />
    </>
  )
}

const MockRangeDataPicker = () => {
  return (
    <>
      <Typography>Range Date Picker</Typography>
      <RangeDatepicker value={{ startDate: undefined, endDate: undefined }} onChange={() => {}} />
    </>
  )
}

const MockButton = () => {
  return (
    <>
      <Typography>Button</Typography>
      <PrimaryButton sx={{ mt: 2 }}>Hello</PrimaryButton>
      <SecondaryButton sx={{ mt: 2 }}>Hello</SecondaryButton>
      <SecondaryButton active sx={{ mt: 2 }}>
        Hello
      </SecondaryButton>
      <GrayButton sx={{ mt: 2 }}>Hello</GrayButton>
      <SecondaryGrayButton sx={{ mt: 2 }}>Hello</SecondaryGrayButton>
      <GhostButton sx={{ mt: 2 }}>Hello</GhostButton>
      <GhostBorderButton sx={{ mt: 2 }}>Hello</GhostBorderButton>
      <RoundedButton sx={{ mt: 2 }}>hello</RoundedButton>
      <DesignedPrimaryButton btnSize='designed-xs' disabled>
        hello
      </DesignedPrimaryButton>
      <DesignedPrimaryButton btnSize='designed-sm'>hello</DesignedPrimaryButton>
      <DesignedPrimaryButton btnSize='designed-md'>hello</DesignedPrimaryButton>
      <DesignedPrimaryButton btnSize='designed-lg'>hello</DesignedPrimaryButton>
      <DesignedSecondaryButton btnSize='designed-xs' disabled>
        hello
      </DesignedSecondaryButton>
      <DesignedSecondaryButton btnSize='designed-sm'>hello</DesignedSecondaryButton>
      <DesignedSecondaryButton btnSize='designed-md'>hello</DesignedSecondaryButton>
      <DesignedSecondaryButton btnSize='designed-lg'>hello</DesignedSecondaryButton>
      <DesignedTransparentButton btnSize='designed-xs' disabled>
        hello
      </DesignedTransparentButton>
      <DesignedTransparentButton btnSize='designed-sm'>hello</DesignedTransparentButton>
      <DesignedTransparentButton btnSize='designed-md'>hello</DesignedTransparentButton>
      <DesignedTransparentButton btnSize='designed-lg'>hello</DesignedTransparentButton>
      <DesignedLinkButton btnSize='designed-xs' disabled>
        hello
      </DesignedLinkButton>
      <DesignedLinkButton btnSize='designed-sm'>hello</DesignedLinkButton>
      <DesignedLinkButton btnSize='designed-md'>hello</DesignedLinkButton>
      <DesignedLinkButton btnSize='designed-lg'>hello</DesignedLinkButton>
      <DesignedPrimaryButton btnSize='designed-lg' btnBorder='rounded-6'>
        hello
      </DesignedPrimaryButton>
      <DesignedPrimaryButton btnSize='designed-lg' btnBorder='rounded-8'>
        hello
      </DesignedPrimaryButton>
      <DesignedPrimaryButton btnSize='designed-sm' btnBorder='pill'>
        hello hello hello hello
      </DesignedPrimaryButton>
    </>
  )
}

const MockCheckbox = () => {
  return (
    <>
      <Typography>Checkbox</Typography>
      <PrimaryCheckbox ariaLabel='checkbox' />
    </>
  )
}

const MockSwitch = () => {
  return (
    <>
      <Typography>Switch</Typography>
      <PrimarySwitch />
    </>
  )
}

const MockText = () => {
  return (
    <>
      <Typography>Text</Typography>
      <ErrorMessage>Error</ErrorMessage>
      <BlackLabel>Black label</BlackLabel>
    </>
  )
}

const MockIconButton = () => {
  return (
    <>
      <Typography>Icon Button</Typography>
      <SecondaryIconButton btnSize='md'>
        <TrashIcon />
      </SecondaryIconButton>
      <GraySolidIconButton btnSize='md'>
        <TrashIcon />
      </GraySolidIconButton>
      <RoundedSolidIconButton btnSize='md'>
        <TrashIcon />
      </RoundedSolidIconButton>
    </>
  )
}

const MockInput = () => {
  return (
    <>
      <Typography>Input</Typography>
      <SolidInput inputSize='md' />
      <WhiteInput inputSize='md' />
      <SearchInput />
      <CustomInput name='' />
      <InputTags name='' value={['123']} fullWidth placeholder='팀에서 추구하고 있는 제품/서비스군을 입력해주세요.' />
    </>
  )
}

const MockChip = () => {
  return (
    <Stack direction={'row'} gap={2}>
      <DegreeChip />
      <GraduateChip />
      <WorkingChip />
      <OutlineBlue300Chip label='hello' />
      <Orange400Chip label='hello' />
      <Gray700Chip label='사업계획서' />
      <BaseChip label={'사업계획서'} />
    </Stack>
  )
}

const DegreeChip = () => {
  return (
    <SecondaryActiveChip
      label={
        <Typography cate='caption_20' plainColor='sub.teal600'>
          재직중
        </Typography>
      }
      padding={false}
      sx={{
        width: '61px',
        bgcolor: '#1B2137',
        borderColor: '#00C7BE',
        borderRadius: '1000px'
      }}
    />
  )
}

const GraduateChip = () => {
  return (
    <SecondaryActiveChip
      label={
        <Typography cate='caption_20' plainColor='sub.orange600'>
          졸업
        </Typography>
      }
      padding={false}
      sx={{
        width: '61px',
        bgcolor: '#241915',
        borderColor: '#EC4A0A',
        borderRadius: '1000px'
      }}
    />
  )
}

const WorkingChip = () => {
  return (
    <SecondaryActiveChip
      label={
        <Typography cate='caption_20' plainColor='sub.orange600'>
          재직중
        </Typography>
      }
      padding={false}
      sx={{
        width: '61px',
        bgcolor: '#241915',
        borderColor: '#EC4A0A',
        borderRadius: '1000px'
      }}
    />
  )
}

export default ComponentsPage
