import { InfiniteData, keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

interface UseInfiniteScrollProps<
  FN extends (args: IP) => void,
  K,
  D,
  M,
  S extends (args: InfiniteData<any, unknown>) => void,
  IP
> {
  fn: FN
  key: K
  enabled?: boolean
  canFetchMore?: boolean
  depend?: D
  onSuccess: S
  meta?: Record<string, M>
  initialPageParam: IP
}

const useInfiniteScroll = <
  FN extends (args: IP) => void,
  K,
  D,
  M,
  S extends (val: InfiniteData<any, unknown>) => void,
  IP
>({
  fn,
  onSuccess,
  initialPageParam,
  key,
  canFetchMore,
  depend = [],
  enabled,
  meta
}: UseInfiniteScrollProps<FN, K, Array<D>, M, S, IP>) => {
  const { data, hasNextPage, fetchNextPage, isLoading, refetch, isFetchingNextPage, isFetching, isSuccess, status } =
    useInfiniteQuery({
      queryKey: [key, ...depend],
      queryFn: ({ pageParam }: any) => fn(pageParam),
      getNextPageParam: (lastPage: any, _, lastPageParams) => {
        // if (body.canFetchMore === false) return
        const maxPages = lastPage?.data?.metaData?.lastPage
        const nextPage = lastPage?.data?.metaData?.nextPage
        const currentPage = lastPage?.data?.metaData?.currentPage

        return nextPage <= maxPages && currentPage < nextPage
          ? {
              ...lastPageParams,
              page: nextPage
            }
          : undefined
      },
      meta: meta,
      enabled: enabled === undefined ? true : enabled,
      initialPageParam: initialPageParam,
      placeholderData: keepPreviousData,
      staleTime: 0,
      gcTime: 0
    })

  useEffect(() => {
    if (data && onSuccess) onSuccess(data)
  }, [data])

  // useEffect(() => {
  //   const onScroll = async (event: any) => {
  //     const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement
  //     if (!isFetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
  //       if (hasNextPage) await fetchNextPage()
  //     }
  //   }

  //   document.addEventListener('scroll', onScroll)
  //   return () => {
  //     document.removeEventListener('scroll', onScroll)
  //   }
  // })

  return {
    data,
    isLoading,
    refetch,
    isFetchingNextPage,
    isFetching,
    status,
    hasNextPage,
    fetchNextPage
  }
}

export default useInfiniteScroll
