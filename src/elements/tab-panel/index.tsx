import { pretendard } from "@/utils/font"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export default function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={`${pretendard.className}`}
      {...other}
    >
      {value === index && ( // eslint-disable-next-line react/jsx-no-undef
        <>{children}</>
      )}
    </div>
  )
}
