'use client'
import ChevronDownSmIcon from '@/assets/icons/chevrons/chevron-down-sm'
import ChevronUp from '@/assets/icons/chevrons/chevron-up'
import TrashIcon from '@/assets/icons/trash'
import { BlankUser, TestImage } from '@/assets/images'
import {
  CardHorizontalSlide,
  CardSlide,
  CardWriting,
  Carousel,
  FavoriteBottom,
  InputTags,
  MiniRoleCard,
  MyApplicationCard,
  PageTitle,
  Pagination,
  Quill,
  RecruitmentCard,
  Slider,
  SortTabStack,
  TalentPoolCard,
  TeamBuildingCard
} from '@/components'
import { TrashAlert } from '@/components/dialog'
import { FillTabItem, FilledTabStack } from '@/components/tabs'
import { RoundedSolidIconButton, SecondaryActiveChip, Typography } from '@/elements'
import { Button, RoundedButton } from '@/elements/v2/button'
import { useDialog } from '@/hooks/use-dialog'
import { CONTENT_BOOKMARKS_MOCK } from '@/mock/data.mock'
import { TEAM_BUILDING_RECRUITMENT_STATUS } from '@/types/team-building.type'
import { Box, BoxProps, Collapse, Paper, PaperProps, Stack, styled, useTheme } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import PaperCard from '../(main-routes)/(user)/talent-pool/_components/paper-card'

const CardBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.main.gray80,
  width: '100%',
  padding: '24px',
  [theme.breakpoints.down('md')]: {
    backgroundColor: theme.palette.main.gray80,
    padding: '0'
  },
  borderRadius: '.5rem',
  fieldset: {
    border: 0
  }
}))

const ComponentsPage = () => {
  return (
    <>
      <MockSortTabStack />
      <MockBanner />
      <MockGroupText />
      <MockPagination />
      <MockMixedComponents />
      <MockCards />
      <Carousel images={[TestImage.src, TestImage.src, TestImage.src]} />
      <MockQuill />
      <EducationCard />
      <CareerCard />
      <ProjectCard />
      <MockPaper />
      <IntroductionCard />
      <MockDialog />
    </>
  )
}

const MockDialog = () => {
  const { open, onOpen, onClose } = useDialog()
  return (
    <Box mt={4}>
      <Typography>Dialog, Alert</Typography>
      <Box>
        <Button onClick={onOpen}>Open trash alert</Button>
        <TrashAlert
          title='삭제 하시겠습니까?'
          description='삭제 시 다시 복구되지 않습니다.'
          onCancel={onClose}
          onSubmit={onClose}
          open={open}
          submitTxt='삭제'
          cancelTxt='취소'
        />
      </Box>
    </Box>
  )
}

const MockSortTabStack = () => {
  enum SORT_TYPE {
    POPULAR = 'popular',
    RECENT = 'recent',
    OLDEST = 'oldest'
  }

  enum CATEGORY_TYPE {
    ALL = 'all',
    BUSINESS_PLAN = 'businessPlan',
    IRPPT = 'IRPPT',
    CONTRACT = 'contract',
    CORRECT_FORMAT = 'correctFormat',
    DOCUMENTS = 'documents',
    ETC = 'etc'
  }

  const [sortValue, setSortValue] = useState(SORT_TYPE.POPULAR)
  const [categoryValue, setCategory] = useState(CATEGORY_TYPE.ALL)

  const SortData = [
    {
      label: '인기순',
      value: SORT_TYPE.POPULAR
    },
    {
      label: '최신순',
      value: SORT_TYPE.RECENT
    },
    {
      label: '오래된순',
      value: SORT_TYPE.OLDEST
    }
  ]

  return (
    <>
      <Typography>Tabs</Typography>
      <SortTabStack data={SortData} value={sortValue} handleChange={(_e, value: SORT_TYPE) => setSortValue(value)} />
      <FilledTabStack
        value={1}
        onChange={() => console.log('hello')}
        variant='scrollable'
        aria-label='scrollable force tabs example'
      >
        {[1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]?.map((item) => (
          <FillTabItem key={item} value={item} label={item} />
        ))}
      </FilledTabStack>
    </>
  )
}

const MockBanner = () => {
  return (
    <>
      <Typography>Banner</Typography>
      {/* <Banner /> */}
    </>
  )
}

const MockGroupText = () => {
  return (
    <>
      <Typography>Group Text</Typography>

      <PageTitle subTitle='sub title'>Title</PageTitle>
    </>
  )
}

const MockPagination = () => {
  return (
    <>
      <Typography>Pagination</Typography>

      <Pagination count={10} />
    </>
  )
}

const MockMixedComponents = () => {
  const [value, setValue] = useState<string[]>([])
  const [thick, setThick] = useState(0)
  return (
    <>
      <Typography mt={4}>Bottom</Typography>
      <FavoriteBottom />
      <Typography mt={4}>Input Tags</Typography>
      <InputTags
        name=''
        value={value}
        onChange={(val: string[]) => {
          setValue(val)
        }}
      />
      <Typography mt={4}>Slider</Typography>
      <Slider
        min={0}
        max={100}
        value={thick || 0}
        onChange={(_, value) => {
          setThick(value as number)
        }}
      />
    </>
  )
}

const MockQuill = () => {
  return (
    <>
      <Typography>Quill</Typography>
      <Quill sx={{ height: 400 }} />
    </>
  )
}

const MockCards = () => {
  return (
    <>
      <Typography>Cards</Typography>
      <MiniRoleCard color='red' name='Min' relatedInfos='Min' category={'hello'} />
      {/* <ExpertMentoringCard /> */}
      {/* <EducationalEventCard refetch={() => {}} item={EDUCATIONAL_EVENT[0]} /> */}
      {/* <TalentPoolContactsCard /> */}
      <RecruitmentCard
        recruitField='Designer'
        skills={['JS']}
        description='hello'
        date='2024/01/02'
        numberOfRecruits={1}
        status={TEAM_BUILDING_RECRUITMENT_STATUS.ACTIVE}
        ondelete={() => { }}
        onswitch={() => { }}
        onupdate={() => { }}
      />
      <TalentPoolCard
        applicationField='hello'
        introduction='hello'
        profileImage={BlankUser.src}
        name='Minh'
        totalExperiences={10}
        skillsAndCertificate={['JS']}
      />
      <TeamBuildingCard />
      <MyApplicationCard
        teamThumbnail={BlankUser.src}
        teamSlogan='hello'
        teamIntroduction='hello'
        recruitRole='hello'
        recruitSkills={['JS']}
        recruitDescription='hello'
        fromDate='2024/01/02'
        toDate='2024/01/02'
        recruitNumber={1}
        showIsHiring={true}
        ondelete={() => { }}
      />
      <CardSlide {...CONTENT_BOOKMARKS_MOCK?.[0].contentBlog} />
      <CardHorizontalSlide>
        {[1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4].map((i) => (
          <Box height={148} key={i} width={148} flexShrink={0}>
            <Image
              height={0}
              width={0}
              style={{ height: '100%', width: '100%', borderRadius: 10 }}
              src={TestImage}
              alt='logo_team'
            />
          </Box>
        ))}
      </CardHorizontalSlide>
      <CardWriting
        url={''}
        handleDelete={() => { }}
        handleEdit={() => { }}
        title='BM 검증'
        subTitle='서비스 런칭을 하였는데 BM의 확신이 없어서 난감합니다'
        likeCount={4100}
        dateText={'2023-01-01'}
        onClickCard={() => { }}
        content='올해로 9회를 맞은 ‘스타트업콘’은 국내외 스타트업 및 투자자들이 모여 콘텐츠 스타트업의 해외진출 전략을 모색하고 성공사례와 인사이트를 공유하는 글로벌 비즈니스 행사다.'
      />
      {/* <DocumentCard/> */}
    </>
  )
}

const MockPaper = () => {
  const PaperCard = styled(Paper)<PaperProps>(({ theme }) => ({
    backgroundColor: theme.palette.main_grey.gray800,
    width: '100%',
    padding: '24px',
    [theme.breakpoints.down('md')]: {
      backgroundColor: theme.palette.main_grey.gray800,
      padding: '0'
    },
    borderRadius: '1rem',
    fieldset: {
      border: 0
    }
  }))

  return (
    <PaperCard>
      <EducationCard />
    </PaperCard>
  )
}

const EducationCard = () => {
  return (
    <CardBox gap={2}>
      <Stack justifyContent='space-between' direction={'row'}>
        <Typography cate='button_40'>서울대학교 컴퓨터 · 공학과</Typography>
        <Stack direction={'row'} gap={1}>
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
        </Stack>
      </Stack>
      <Typography cate='body_30'>2021.05. - 2023.05. (2년)</Typography>
    </CardBox>
  )
}

const CareerCard = () => {
  const theme = useTheme()
  return (
    <CardBox gap={2}>
      <Stack justifyContent='space-between' direction={'row'}>
        <Typography cate='button_40'>삼성전자 / 메모리반도체</Typography>
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
            borderColor: theme.palette.sub.orange600,
            borderRadius: '1000px'
          }}
        />
      </Stack>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography cate='body_30'>2021.05. - 2023.05. (2년)</Typography>
        <RoundedSolidIconButton
          sx={{
            padding: 0.5
          }}
        >
          <TrashIcon pathProps={{ stroke: '#9F9EA4' }} />
        </RoundedSolidIconButton>
      </Stack>
    </CardBox>
  )
}

const ProjectCard = () => {
  return (
    <CardBox gap={2}>
      <Stack justifyContent='flex-start' direction={'row'} gap={2}>
        <Typography cate='title_40'>글로벌 게임플랫폼 개발 운영 - React, JavaScript 개발 프로젝트</Typography>
        <Typography cate='body_30' plainColor='sub.orange600'>
          2022.01. - 2023.01. / 소속OOOO기관
        </Typography>
      </Stack>
      <Typography cate='body_30'>
        영상 소스파일과 스톡영상을 적절히 활용한 영상 재편집 (영상 소스파일 제공 예정)- 소셜미디어의 특성과 해당 테크
        기술의 셀링 포인트를 잘 감안하여, 재밌고 멋진 새로운 느낌의 영상 제작- 영상에 영문 카피 삽입
      </Typography>
      <Typography cate='body_30'>
        관련 링크:{' '}
        <Typography
          component={'span'}
          onClick={() => {
            console.log('click')
          }}
          plainColor='main_primary.blue300'
        >
          www.asdfasdgfdadg.com
        </Typography>
      </Typography>
    </CardBox>
  )
}

const mockText = `저는 강력하고 확장 가능한 웹 애플리케이션을 설계, 구현 및 유지 관리하는 데 10년의 경험을 가진 숙련된 백엔드 개발자로서 저를 소개하기 위해 이 글을 씁니다. 코딩에 대한 열정과 소프트웨어 아키텍처에 대한 깊은 이해를 바탕으로 저는 경력 전반에 걸쳐 수많은 프로젝트에 성공적으로 기여했으며 제 기술과 지식을 적용할 수 있는 새로운 기회를 탐색하게 되어 기쁩니다.
\n
지난 10년 동안 저는 Django, Spring Boot, Ruby on Rails와 같은 프레임워크와 함께 Python, Java, Ruby와 같은 다양한 프로그래밍 언어를 사용하여 백엔드 개발에 대한 광범위한 전문 지식을 얻었습니다. 저는 데이터베이스 설계 및 최적화, 효율적인 알고리즘 작성, 원활하고 안정적인 애플리케이션 생성을 위한 API 통합 기술을 연마했습니다.
\n
직업적인 여정을 통해 저는 프론트엔드 개발자, 디자이너, 프로젝트 관리자를 포함한 다기능 팀과 협력할 수 있는 특권을 누렸습니다. 이 경험을 통해 효과적으로 의사 소통하고, 프로젝트 요구 사항을 이해하고, 기한 내에 고품질 솔루션을 제공하는 능력이 향상되었습니다. 저는 급변하는 환경에서 일하고 모든 개발 팀의 성공에 기여할 수 있는 제 능력에 자신이 있습니다.
\n
또한 지속적인 학습에 대한 저의 노력 덕분에 최신 업계 동향 및 기술에 대한 최신 정보를 얻을 수 있었습니다. 저는 온라인 코딩 커뮤니티에 적극적으로 참여하고 기술 컨퍼런스에 참석하며 지속적으로 기술을 향상시킬 기회를 찾습니다. 개인적 성장에 대한 이러한 헌신 덕분에 새로운 기술에 빠르게 적응하고 복잡한 문제에 대한 혁신적인 솔루션을 제공할 수 있었습니다.
\n
기술 전문 지식 외에도 강력한 문제 해결 기술, 세부 사항에 대한 관심, 깨끗하고 유지 관리 가능한 코드 작성에 대한 열정을 제공합니다. 저는 분석적 사고와 세부 사항에 대한 세심한 주의가 필요한 도전적인 환경에서 번창합니다.
\n
저는 강력하고 확장 가능한 웹 애플리케이션을 설계, 구현 및 유지 관리하는 데 10년의 경험을 가진 숙련된 백엔드 개발자로서 저를 소개하기 위해 이 글을 씁니다. 코딩에 대한 열정과 소프트웨어 아키텍처에 대한 깊은 이해를 바탕으로 저는 경력 전반에 걸쳐 수많은 프로젝트에 성공적으로 기여했으며 제 기술과 지식을 적용할 수 있는 새로운 기회를 탐색하게 되어 기쁩니다.
\n
지난 10년 동안 저는 Django, Spring Boot, Ruby on Rails와 같은 프레임워크와 함께 Python, Java, Ruby와 같은 다양한 프로그래밍 언어를 사용하여 백엔드 개발에 대한 광범위한 전문 지식을 얻었습니다. 저는 데이터베이스 설계 및 최적화, 효율적인 알고리즘 작성, 원활하고 안정적인 애플리케이션 생성을 위한 API 통합 기술을 연마했습니다.
\n
직업적인 여정을 통해 저는 프론트엔드 개발자, 디자이너, 프로젝트 관리자를 포함한 다기능 팀과 협력할 수 있는 특권을 누렸습니다. 이 경험을 통해 효과적으로 의사 소통하고, 프로젝트 요구 사항을 이해하고, 기한 내에 고품질 솔루션을 제공하는 능력이 향상되었습니다. 저는 급변하는 환경에서 일하고 모든 개발 팀의 성공에 기여할 수 있는 제 능력에 자신이 있습니다.
\n
또한 지속적인 학습에 대한 저의 노력 덕분에 최신 업계 동향 및 기술에 대한 최신 정보를 얻을 수 있었습니다. 저는 온라인 코딩 커뮤니티에 적극적으로 참여하고 기술 컨퍼런스에 참석하며 지속적으로 기술을 향상시킬 기회를 찾습니다. 개인적 성장에 대한 이러한 헌신 덕분에 새로운 기술에 빠르게 적응하고 복잡한 문제에 대한 혁신적인 솔루션을 제공할 수 있었습니다.
\n
기술 전문 지식 외에도 강력한 문제 해결 기술, 세부 사항에 대한 관심, 깨끗하고 유지 관리 가능한 코드 작성에 대한 열정을 제공합니다. 저는 분석적 사고와 세부 사항에 대한 세심한 주의가 필요한 도전적인 환경에서 번창합니다.
저는 강력하고 확장 가능한 웹 애플리케이션을 설계, 구현 및 유지 관리하는 데 10년의 경험을 가진 숙련된 백엔드 개발자로서 저를 소개하기 위해 이 글을 씁니다. 코딩에 대한 열정과 소프트웨어 아키텍처에 대한 깊은 이해를 바탕으로 저는 경력 전반에 걸쳐 수많은 프로젝트에 성공적으로 기여했으며 제 기술과 지식을 적용할 수 있는 새로운 기회를 탐색하게 되어 기쁩니다.
\n
지난 10년 동안 저는 Django, Spring Boot, Ruby on Rails와 같은 프레임워크와 함께 Python, Java, Ruby와 같은 다양한 프로그래밍 언어를 사용하여 백엔드 개발에 대한 광범위한 전문 지식을 얻었습니다. 저는 데이터베이스 설계 및 최적화, 효율적인 알고리즘 작성, 원활하고 안정적인 애플리케이션 생성을 위한 API 통합 기술을 연마했습니다.
\n
직업적인 여정을 통해 저는 프론트엔드 개발자, 디자이너, 프로젝트 관리자를 포함한 다기능 팀과 협력할 수 있는 특권을 누렸습니다. 이 경험을 통해 효과적으로 의사 소통하고, 프로젝트 요구 사항을 이해하고, 기한 내에 고품질 솔루션을 제공하는 능력이 향상되었습니다. 저는 급변하는 환경에서 일하고 모든 개발 팀의 성공에 기여할 수 있는 제 능력에 자신이 있습니다.
\n
또한 지속적인 학습에 대한 저의 노력 덕분에 최신 업계 동향 및 기술에 대한 최신 정보를 얻을 수 있었습니다. 저는 온라인 코딩 커뮤니티에 적극적으로 참여하고 기술 컨퍼런스에 참석하며 지속적으로 기술을 향상시킬 기회를 찾습니다. 개인적 성장에 대한 이러한 헌신 덕분에 새로운 기술에 빠르게 적응하고 복잡한 문제에 대한 혁신적인 솔루션을 제공할 수 있었습니다.
\n
기술 전문 지식 외에도 강력한 문제 해결 기술, 세부 사항에 대한 관심, 깨끗하고 유지 관리 가능한 코드 작성에 대한 열정을 제공합니다. 저는 분석적 사고와 세부 사항에 대한 세심한 주의가 필요한 도전적인 환경에서 번창합니다.
\n
저는 강력하고 확장 가능한 웹 애플리케이션을 설계, 구현 및 유지 관리하는 데 10년의 경험을 가진 숙련된 백엔드 개발자로서 저를 소개하기 위해 이 글을 씁니다. 코딩에 대한 열정과 소프트웨어 아키텍처에 대한 깊은 이해를 바탕으로 저는 경력 전반에 걸쳐 수많은 프로젝트에 성공적으로 기여했으며 제 기술과 지식을 적용할 수 있는 새로운 기회를 탐색하게 되어 기쁩니다.
\n
지난 10년 동안 저는 Django, Spring Boot, Ruby on Rails와 같은 프레임워크와 함께 Python, Java, Ruby와 같은 다양한 프로그래밍 언어를 사용하여 백엔드 개발에 대한 광범위한 전문 지식을 얻었습니다. 저는 데이터베이스 설계 및 최적화, 효율적인 알고리즘 작성, 원활하고 안정적인 애플리케이션 생성을 위한 API 통합 기술을 연마했습니다.
\n
직업적인 여정을 통해 저는 프론트엔드 개발자, 디자이너, 프로젝트 관리자를 포함한 다기능 팀과 협력할 수 있는 특권을 누렸습니다. 이 경험을 통해 효과적으로 의사 소통하고, 프로젝트 요구 사항을 이해하고, 기한 내에 고품질 솔루션을 제공하는 능력이 향상되었습니다. 저는 급변하는 환경에서 일하고 모든 개발 팀의 성공에 기여할 수 있는 제 능력에 자신이 있습니다.
\n
또한 지속적인 학습에 대한 저의 노력 덕분에 최신 업계 동향 및 기술에 대한 최신 정보를 얻을 수 있었습니다. 저는 온라인 코딩 커뮤니티에 적극적으로 참여하고 기술 컨퍼런스에 참석하며 지속적으로 기술을 향상시킬 기회를 찾습니다. 개인적 성장에 대한 이러한 헌신 덕분에 새로운 기술에 빠르게 적응하고 복잡한 문제에 대한 혁신적인 솔루션을 제공할 수 있었습니다.
\n
기술 전문 지식 외에도 강력한 문제 해결 기술, 세부 사항에 대한 관심, 깨끗하고 유지 관리 가능한 코드 작성에 대한 열정을 제공합니다. 저는 분석적 사고와 세부 사항에 대한 세심한 주의가 필요한 도전적인 환경에서 번창합니다.`

const IntroductionCard = () => {
  const [show, setShow] = useState<boolean>(false)
  const visibleCharacters = 1600

  return (
    <PaperCard
      sx={{
        maxWidth: '1416px',
        padding: '40px'
      }}
    >
      <Stack direction={'column'} gap={3} alignItems={'center'}>
        <Collapse in={show} collapsedSize={336}>
          <Typography cate='body_30'>
            {show
              ? mockText
              : mockText.length > visibleCharacters
                ? `${mockText.slice(0, visibleCharacters)}...`
                : mockText}
          </Typography>
        </Collapse>

        <RoundedButton
          btnSize='xxs-np'
          sx={{
            width: '104px'
          }}
          onClick={() => {
            setShow((prev) => !prev)
          }}
        >
          {show ? (
            <>
              <Typography cate='button_20'>접기</Typography>
              <ChevronUp stroke={'white'} />
            </>
          ) : (
            <>
              <Typography cate='button_20'>펼치기</Typography>
              <ChevronDownSmIcon stroke={'white'} />
            </>
          )}
        </RoundedButton>
      </Stack>
    </PaperCard>
  )
}

export default ComponentsPage
