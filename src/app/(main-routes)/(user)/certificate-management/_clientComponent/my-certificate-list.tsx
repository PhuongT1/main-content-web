'use client'
import { PaginationList, SortTabStack } from '@/components'
import { useDialog } from '@/hooks/use-dialog'
import { getMyCertificateList } from '@/services/certificate.service'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment/moment'
import { useEffect, useState } from 'react'
import CardCertificate from '../_components/card-certificate'
import { useSearch } from '../_hooks/use-search'
import CertificateModal from './certificate-modal'

const DATA_SORT = [
  { label: '최신순', value: 'NEWEST' },
  { label: '오래된순', value: 'OLDEST' }
]

const MyCertificateList = () => {
  const { searchParams, handleChange, queryData, setSearchParams } = useSearch({
    page: 1,
    listType: DATA_SORT[0].value
  })

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['my-test-list', searchParams],
    queryFn: () =>
      getMyCertificateList({
        listType: searchParams.listType,
        page: searchParams.page
      }),
    staleTime: 0
  })

  const { metaData, result } = data?.data || {}
  const { open: openModal, onClose: onCloseModal, onOpen: onOpenModal } = useDialog()
  const [item, setItem] = useState<any>(null)

  const handleOpenModal = (value: any) => {
    onOpenModal()
    setItem(value)
  }

  useEffect(() => {
    setSearchParams((p: any) => ({
      ...p,
      listType: queryData.get('listType') || DATA_SORT[0].value,
      page: parseInt(queryData.get('page') || '1')
    }))
  }, [queryData])

  return (
    <Box>
      <Box my={3}>
        <SortTabStack
          data={DATA_SORT}
          value={searchParams.listType}
          handleChange={(_e, value: string) => handleChange(value, 'listType')}
        />
      </Box>
      <PaginationList
        itemWidth={336}
        gap={24}
        responsiveListProps={{ minBreakpoints: { md: [304, 24] } }}
        curPage={searchParams.page}
        totalPage={metaData?.totalPages}
        onPageChange={(page) => handleChange(page, 'page')}
        isEmpty={result?.length === 0}
        emptyTxt='발급받은 자격증이 없습니다.'
      >
        {result?.map((item: any, index: number) => {
          const { course, userImage, dateOfBirth, nickname } = item || {}
          return (
            <CardCertificate
              key={index}
              thumbnail={userImage?.url}
              certificateNumber={`제 ${course?.registrationNumber} 호`}
              certificateLevel={`${course?.grade}등급`}
              birthDay={moment(item?.dateOfBirth).format('YYYY년 MM월 DD일')}
              name={nickname}
              certificateName={course?.name}
              onClick={() => handleOpenModal(item)}
            />
          )
        })}
      </PaginationList>
      <CertificateModal
        open={openModal}
        onClose={onCloseModal}
        certificateNumber={item?.course?.registrationNumber}
        courseName={item?.course?.name}
        thumbnail={item?.userImage?.url}
        username={item?.nickname}
        dateOfBirth={moment(item?.dateOfBirth).format('YYYY년 MM월 DD일')}
        dateOfCertificate={moment(item?.course?.startTimeRegistration).format('YYYY년 MM월 DD일')}
        grade={item?.course?.grade}
        certificateBackground={item?.course?.certificate?.url as string}
      />
    </Box>
  )
}

export default MyCertificateList
