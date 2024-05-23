import { useState } from 'react'

export const useStepper = (defaultValue: number = 0) => {
  const [activeStep, setStep] = useState<number>(defaultValue)

  const handleNextStep = () => {
    setStep((prev) => prev + 1)
  }
  const handlePrevStep = () => {
    if (activeStep === 0) {
      return
    }
    setStep((prev) => prev - 1)
  }
  const handleReset = (cb?: VoidFunction) => {
    setStep(defaultValue)
    cb?.()
  }
  return {
    activeStep,
    handleNextStep,
    handlePrevStep,
    setStep,
    handleReset
  }
}
