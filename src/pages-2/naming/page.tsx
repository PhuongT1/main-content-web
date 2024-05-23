import { QueryClient, dehydrate } from '@tanstack/react-query'

// export async function getServerSideProps() {
//   const queryClient = new QueryClient()
//   console.log('phuong here')
//   // await queryClient.prefetchQuery({
//   //   queryKey: ['posts'],
//   //   queryFn: getPosts,
//   // })

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//       phuong: 'tran kakaka'
//     }
//   }
// }

const phuong = (prop: any) => {
  console.log({ prop })

  return <>Phuong Tran ne hehe</>
}

export default phuong
