import { QueryClient, dehydrate } from '@tanstack/react-query'

export async function getServerSideProps() {
  const queryClient = new QueryClient()
  console.log('phuong here')
  // await queryClient.prefetchQuery({
  //   queryKey: ['posts'],
  //   queryFn: getPosts,
  // })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      phuong: 'tran'
    }
  }
}

const phuong = () => {
  return <>Phuong Tran oi phuong</>
}

export default phuong
