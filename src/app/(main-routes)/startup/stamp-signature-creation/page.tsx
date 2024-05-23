import { getDictionary } from '@/actions/dictionaries.action'
import { Banner, PageTitle } from '@/components'
import { ResponsiveBox } from '@/elements'
import { BANNER_TYPE } from '@/types/banner.type'
import { Box } from '@mui/material'
import CardStamps from './_components/card-stamps'

const StampSignatureCreation = async () => {
  const dict = await getDictionary()

  return (
    <Box>
      <PageTitle>{dict.startup.stamp_signature_creation.title}</PageTitle>
      <ResponsiveBox my={6} breakpoints={{ md: { my: 3 } }}>
        <Banner type={BANNER_TYPE.STAMP_SIGNATURE} />
      </ResponsiveBox>
      <ResponsiveBox>
        <CardStamps />
      </ResponsiveBox>
    </Box>
  )
}

export default StampSignatureCreation
