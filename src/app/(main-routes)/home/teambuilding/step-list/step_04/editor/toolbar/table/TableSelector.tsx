import React, { useEffect, useRef, useState } from 'react'

import styles from './table.module.scss'

type TTableSelectorProps = {
  open: boolean
  onClose: VoidFunction
}

const TableSelector = ({ open }: TTableSelectorProps) => {
  const [selection, setSelection] = useState()
  const [tableData, setTableData] = useState({
    row: 0,
    column: 0
  })
  const [tableInput, setTableInput] = useState(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 6 }, (v, i) => ({
        bg: 'lightGray',
        column: i
      }))
    )
  )

  useEffect(() => {
    const newTable = Array.from({ length: 6 }, (obj, row) =>
      Array.from({ length: 6 }, (v, col) => ({
        bg: row + 1 <= tableData.row && col + 1 <= tableData.column ? 'orange' : 'lightgray',
        column: col
      }))
    )
    setTableInput(newTable)
  }, [tableData])

  const handleButtonClick = () => {
    // setSelection(editor.selection)
  }
  const handleInsert = () => {
    setTableData({ row: -1, column: -1 })
  }
  return (
    <div>
      {open && (
        <div className={styles.popup_wrapper}>
          {
            <span style={{ fontSize: '0.85em' }}>
              <i>{`${tableData.row >= 1 ? `${tableData.row} x ${tableData.column}` : ''}`}</i>
            </span>
          }
          <div className={styles.table_input}>
            {tableInput.map((grp, row) =>
              grp.map(({ column, bg }, col) => (
                <div
                  key={row + col}
                  onClick={() => handleInsert()}
                  onMouseOver={() => setTableData({ row: row + 1, column: column + 1 })}
                  className={styles.table_unit}
                  style={{ border: `1px solid ${bg}` }}
                ></div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default TableSelector
