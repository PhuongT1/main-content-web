import { TColumn } from '@/components/table'
import { Typography } from '@/elements'
import { COURSE_TYPE } from '../certificate.constant'

function convertSecondsToHHMMSS(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const formattedHours = String(hours).padStart(2, '0')
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(remainingSeconds).padStart(2, '0')

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}

export const COLUMN_DETAIL: Array<TColumn> = [
  {
    label: '시험',
    value: 'name'
  },
  {
    label: '시험 시간',
    value: 'courseQuiz',
    render: (value: any) => {
      return <>{convertSecondsToHHMMSS(value?.testTimeDuration)}</>
    }
  },
  {
    label: '교육 영상',
    value: 'totalVideo',
    render: (value: any) => {
      return <>{`${value}개`}</>
    }
  },
  {
    label: '문항 구성',
    value: 'courseQuiz',
    render: (value: any) => {
      return <>{`${value?.totalQuestion}문항`}</>
    }
  },
  {
    label: '합격 기준',
    value: 'passingPoint',
    render: (value: any) => {
      return <>{`${value}점 이상`}</>
    }
  },
  {
    label: '응시료',
    value: 'price',
    render: (value: any) => {
      return <>{`${value?.toLocaleString()} 원`}</>
    }
  },
  {
    label: '재응시료',
    value: 'retestPrice',
    render: (value: any) => {
      return <>{`${value?.toLocaleString()} 원`}</>
    }
  }
]

export const COLUMN_DETAIL_MIDDLE: Array<TColumn> = [
  {
    label: '등록번호',
    value: 'registrationNumber'
  },
  {
    label: '자격증 명',
    value: 'name'
  },
  { label: '주무부처', value: 'competentDepartment' },
  {
    label: '자격 유효기간',
    value: 'qualificationValidityPeriod',
    render: (value) => {
      return <>{`자격 발급일로부터 ${value}년`}</>
    }
  },
  { label: '자격 정보', value: 'entitlementInformation' },
  {
    label: '직무 내용',
    value: 'jobDescription'
  }
]

export const COLUMN_DETAIL_BOTTOM: Array<TColumn> = [
  {
    label: '구분',
    value: 'grade'
  },
  {
    label: '검정횟수',
    value: 'numberOfExams'
  },
  { label: '접수자수', value: 'numberOfApplications' },
  {
    label: '응시자수',
    value: 'numberOfCompleted'
  },
  { label: '취득자수', value: 'numberOfGraduates' },
  {
    label: '합격률',
    value: 'rateGraduates'
  }
]

export const COLUMN_EDUCATION: Array<TColumn> = [
  {
    label: '자격시험',
    value: '',
    render: (value: any) => {
      return (
        <>
          <Typography component='span' cate='caption_1_semibold' plainColor='main.white' sx={{ textAlign: 'left' }}>
            {`해당 `}
          </Typography>
          <Typography component='span' cate='caption_1_semibold' sx={{ textAlign: 'left', color: '#28FFFF' }}>
            {`교육 + 자격시험 `}
          </Typography>
          <Typography component='span' cate='caption_1_semibold' plainColor='main.white' sx={{ textAlign: 'left' }}>
            과정은 창직진로지도사 강사활동이 가능한 양성과정입니다.
          </Typography>
          <Typography cate='caption_1_semibold' plainColor='main.white' sx={{ textAlign: 'left' }}>
            온라인 교육 이수 및 자격시험 합격 이후, 강의 시연 과제를 등록하면 강사활동이 가능하도록 차시별 강의안,
            교구재가 모두 제공됩니다.
          </Typography>
        </>
      )
    }
  }
]
