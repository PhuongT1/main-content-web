import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { NextRouter } from 'next/router'

type IHandlePageFilter = {
  router: NextRouter | AppRouterInstance
  query: {
    [key: string]: any
  }
  pathName: string
}

export const handlePageFilter = ({ router, query, pathName }: IHandlePageFilter) => {
  let o = Object.keys(query)
    .filter((k) => query[k] != null && query[k] != '')
    .reduce((a, k) => ({ ...a, [k]: query[k] }), {})
  const param = new URLSearchParams(o)
  router.push(`${pathName}?${param}`)
}
