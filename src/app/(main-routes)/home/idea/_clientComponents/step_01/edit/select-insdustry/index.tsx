'use client'
import { Box } from '@mui/material'
import SectionTitle from '@/components/home/section-title'
import LogisticDistribution from './logistic-distribution'
import styles from './select-insdustry.module.scss'
import TabList from '../../../step_02/edit/tabs'
import { useLanguage } from '@/hooks/use-language'

function SelectInsDustry() {
  const { dict } = useLanguage()

  return (
    <Box component={'div'} className={styles.insdustry}>
      <SectionTitle my={0} title={dict.idea_industry_title} subtitle={dict.idea_industry_sub_title} />
      <Box component={'div'} className={styles.insdustry_main}>
        <TabList name='industrial' namePath='path' />
        <LogisticDistribution name='path' />
      </Box>
    </Box>
  )
}

export default SelectInsDustry
