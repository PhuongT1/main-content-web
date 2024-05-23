import { useState } from 'react'

const SCRIPT_URL = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'

const useMapDialog = () => {
  const [addressData, setAddressData] = useState<{ postcode: string; address: string } | null>(null)

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // const popup = useDaumPostcodePopup(SCRIPT_URL)

  const handleComplete = (data: any) => {
    let fullAddress = data.address
    let extraAddress = ''

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
    }

    setAddressData({ postcode: data.postcode || data.zonecode, address: fullAddress })
  }

  const openDialog = () => {
    // popup({ onComplete: handleComplete })
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  return { addressData, openDialog, isDialogOpen, closeDialog, handleComplete }
}

export default useMapDialog
