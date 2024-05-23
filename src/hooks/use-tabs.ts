import { useState } from 'react'

function useTabs<T extends any>(initValue: T) {
  const [value, setValue] = useState<T>(initValue)

  const handleChange = (event: React.SyntheticEvent, newValue: T) => {
    setValue(newValue)
  }

  const reset = () => setValue(initValue)

  return {
    currentTab: value,
    setValueTab: setValue,
    onChangeTab: handleChange,
    resetTab: reset
  }
}

export default useTabs
