import { getListInventory } from '@/services/inventory.service'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { IMAGE_PAGE_LIMIT } from '../utils/common'

interface IQueryParams {
  page: number
  limit: number
  category1?: string
  category2?: string
}

const useRandomImage = ({ page, limit, category1 = 'OTHER', category2 = 'DEFAULT' }: IQueryParams) => {
  const [currentPage, setCurrentPage] = useState(1)

  const { data, refetch } = useQuery({
    queryKey: ['get-images', currentPage],
    queryFn: () => getListInventory({ page: currentPage, limit, category1, category2 }),
    meta: { offLoading: true }
  })

  const images = useMemo(() => data?.data?.result || [], [data])
  const totalPages = useMemo(() => data?.data?.metaData.totalPages || 0, [data])

  useEffect(() => {
    randomImagePage()
  }, [totalPages])

  const randomImagePage = () => {
    const queryPage = Math.floor(Math.random() * totalPages) || 1
    if (queryPage === currentPage && queryPage !== 1) {
      randomImagePage()
      return
    }
    setCurrentPage(queryPage)
  }

  const createRandomImage = useCallback(() => {
    const arr = Array.from({ length: IMAGE_PAGE_LIMIT })
    return arr.map((_, i) => {
      return images[i].fileUrl
    })
  }, [images])

  const getRandomImages = useCallback(() => {
    // Shuffle the array (Fisher-Yates algorithm)
    for (let i = images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[images[i], images[j]] = [images[j], images[i]]
    }

    // Select one image
    const selectedImage = images[0].fileUrl
    return selectedImage
  }, [images])

  return {
    page: currentPage,
    totalPages,
    createRandomImage,
    getImages: refetch,
    randomImagePage,
    getRandomImages
  }
}

export default useRandomImage
