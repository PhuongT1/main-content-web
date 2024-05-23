import PlusIcon from '@/assets/icons/plus'
import TableIcon from '@/assets/icons/team-building/table'
import { IconButton } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'

import styles from './table.module.scss'
import { EditorNodeList } from '@/types/teambuilding/index.type'
import { Node } from 'reactflow'
import { useRecoilValue } from 'recoil'
import { toolbarEditorSelector } from '@/atoms/home/teambuilding'
import { ROLE_TYPE } from '@/mock/teambuilding/data'
import { EventNameTBuidlding } from '@/constants/teambuilding/teambuilding.constant'

const MAX_ITEM_TABLE = 10

function Table({
  setNodes,
  onDispatchMessage
}: {
  setNodes: Dispatch<SetStateAction<Node<EditorNodeList>[]>>
  onDispatchMessage: VoidFunction
}) {
  const editorToolbar = useRecoilValue(toolbarEditorSelector)
  const onCreateTablle = () => {
    setNodes((prev: Node<EditorNodeList>[]) => {
      if (prev.length >= MAX_ITEM_TABLE) {
        onDispatchMessage()
        return prev
      }
      return [
        ...prev,
        {
          id: `${prev.length + 1}`,
          type: 'custom',
          // parentNode: 'A',
          // extent: 'parent',
          data: {
            position: '',
            name: '',
            desc: '',
            role: ROLE_TYPE.MASTER,
            styles: [
              {
                backgroundColor: '#252629',
                fontSize: editorToolbar.fontSize
              },
              {
                fontSize: editorToolbar.fontSize
              },
              {
                fontSize: editorToolbar.fontSize
              }
            ]
          },
          position: { x: 200 + Math.floor(Math.random() * 100), y: 100 + Math.floor(Math.random() * 100) }
        }
      ]
    })
  }
  return (
    <IconButton component={'div'} className={styles.toolbar_item} onClick={onCreateTablle}>
      <TableIcon />
      <PlusIcon pathProps={{ stroke: '#000' }} />
    </IconButton>
  )
}

export default Table
