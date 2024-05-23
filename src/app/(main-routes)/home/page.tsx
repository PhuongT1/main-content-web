'use client'
import InventoryImages from '@/components/inventory-image'
import React, { useState } from 'react'

const HomePage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [listImg, setListImg] = useState<any>([])

  const handleOpen = () => setIsOpenModal(true)
  const handleClose = () => setIsOpenModal(false)

  return (
    <div>
      HomePage
      <h1 onClick={handleOpen}>Modal Inventory</h1>
      <InventoryImages
        open={isOpenModal}
        onClose={handleClose}
        setImages={(image) => setListImg(image)}
        multiple={false}
      />
    </div>
  )
}

export default HomePage
