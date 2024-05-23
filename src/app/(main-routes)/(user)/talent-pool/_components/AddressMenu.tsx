import AlertPopup from '@/elements/alert-popup'
import Select from '@/elements/select'
import Typography from '@/elements/typography'
import { ADDRESS_LIST } from '@/utils/constants'
import { Box, Dialog, DialogContent, Grid, SwipeableDrawer, useMediaQuery, useTheme } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import * as React from 'react'
import { useState } from 'react'
import { DropdownMenuItem, DropdownNestedAddressMenuItem } from './NestedAddressMenuItem'
import { convertToRem } from '@/utils/convert-to-rem'

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '.MuiDialog-container': {
    [theme.breakpoints.down('md')]: {
      alignItems: 'flex-end'
    },
    '.MuiPaper-root': {
      backgroundImage: 'none',
      [theme.breakpoints.down('md')]: {
        height: 'auto',
        margin: 0,
        maxWidth: '100%',
        width: '100%',
        borderTopLeftRadius: '1rem',
        borderTopRightRadius: '1rem',
        backgroundColor: theme.palette.main_grey.gray700
      }
    }
  }
}))

type CommentActionMenuProps = {
  error: any
  setAddressData: any
  setAddressError: any
  city?: string
  district?: string
  placeholder?: string
}
const ADDRESS_KEYS = Object.keys(ADDRESS_LIST)

export default function AddressMenu({
  city,
  district,
  setAddressError,
  error,
  setAddressData,
  placeholder
}: CommentActionMenuProps) {
  const [citySelectOpen, setCitySelectOpen] = useState<boolean>(false)
  const [bottomMenuOpen, setBottomMenuOpen] = React.useState<boolean>(false)
  const [showError, setShowError] = useState<boolean>(false)
  const theme = useTheme()
  const mdDown = useMediaQuery(`(max-width: 768px)`)
  const [cityTemp, setCityTemp] = useState<string>('')

  const handleCloseBottomMenu = () => {
    setBottomMenuOpen(false)
  }

  return (
    <div>
      {/* <IconBut
			 id="demo-customized-button"
			 aria-controls={open ? 'demo-customized-menu' : undefined}
			 aria-haspopup="true"
			 aria-expanded={open ? 'true' : undefined}
			 variant="contained"
			 disableElevation
			 onClick={handleClick}
			 endIcon={<KeyboardArrowDownIcon />}
			 >
			 <CommentMenuIcon />
			 </IconBut> */}
      <Select
        placeholder={placeholder || '주 활동 지역을 선택해주세요'}
        displayEmpty
        fullWidth
        sx={{
          borderRadius: 2,
          border: 'none'
        }}
        id='selectWrapper'
        MenuProps={{
          autoFocus: false,
          sx: {
            '.MuiMenu-paper': {
              [theme.breakpoints.up('xl')]: {
                width: '20%',
                minWidth: '20% !important',
                left: '20% !important'
              }
            }
          }
        }}
        // defaultOpen={false}
        open={citySelectOpen}
        // onClick={(event) => {
        //   event.preventDefault();
        // }}
        error={error}
        onOpen={() => {
          if (mdDown) {
            setBottomMenuOpen(true)
          } else {
            setCitySelectOpen(true)
          }
        }}
        onClose={(event: any) => {
          setCitySelectOpen(false)
          setAddressError(false)
        }}
        renderValue={(value) => {
          return !!city ? (
            <Typography cate='body_3' color={theme.palette.main_grey.gray300}>
              {city} {!!district ? ' - ' + district : ''}
            </Typography>
          ) : (
            <Typography cate='body_3' color={theme.palette.main_grey.gray300}>
              주 활동 지역을 선택해주세요
            </Typography>
          )
        }}
      >
        {ADDRESS_KEYS.map((item: any, index: number) => (
          <DropdownNestedAddressMenuItem
            key={index}
            rightAnchore={true}
            label={
              <Typography cate='caption_1' color='main.white'>
                {item}
              </Typography>
            }
            onClick={() => {
              setCitySelectOpen(true)
              if (ADDRESS_LIST[item as keyof typeof ADDRESS_LIST].length === 0) {
                setAddressData(item, '')
                setCitySelectOpen(false)
                setAddressError(false)
              }
            }}
            parentMenuOpen={citySelectOpen}
          >
            {' '}
            {ADDRESS_LIST[item as keyof typeof ADDRESS_LIST].length > 0 && (
              <>
                {ADDRESS_LIST[item as keyof typeof ADDRESS_LIST].map((district: string, districtIndex: number) => (
                  <DropdownMenuItem
                    key={districtIndex}
                    onClick={() => {
                      setAddressData(item, district)
                      setCitySelectOpen(false)
                      setAddressError(false)
                    }}
                  >
                    {district}
                  </DropdownMenuItem>
                ))}
              </>
            )}
          </DropdownNestedAddressMenuItem>
        ))}
      </Select>
      <StyledDialog
        open={bottomMenuOpen}
        onClose={handleCloseBottomMenu}
        // onEnter={console.log("Hey.")}
        // classes={{ container: classes.root, paper: classes.paper }}
      >
        <DialogContent sx={{ overflow: 'hidden', padding: 0 }}>
          <Box
            sx={{
              height: convertToRem(56),
              borderBottom: '1px solid',
              borderColor: 'main_grey.gray800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography textAlign={'center'}>{placeholder}</Typography>
          </Box>

          <Grid container display='flex' flexWrap={'nowrap'} overflow={'hidden'} maxHeight={'20rem'}>
            <Grid
              item
              xs={6}
              sx={{
                overflowY: 'auto',
                overflowX: 'hidden',
                borderRight: '1px solid',
                borderColor: 'main_grey.gray800'
              }}
            >
              {ADDRESS_KEYS.map((item: any, index: number) => (
                <MenuItem
                  key={index}
                  sx={{
                    borderBottom: '1px solid',
                    borderColor: 'main_grey.gray800',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                  onClick={() => {
                    setCityTemp(item)
                    if (ADDRESS_LIST[item as keyof typeof ADDRESS_LIST].length === 0) {
                      setAddressData(item, '')
                      setCitySelectOpen(false)
                      handleCloseBottomMenu()
                      setAddressError(false)
                      setCityTemp('')
                    }
                  }}
                >
                  {item}
                </MenuItem>
              ))}
            </Grid>
            <Grid item xs={6}>
              {!!cityTemp ? (
                ADDRESS_LIST[cityTemp as keyof typeof ADDRESS_LIST].map((item: any, index: number) => (
                  <MenuItem
                    key={index}
                    sx={{
                      borderBottom: '1px solid',
                      borderColor: 'main_grey.gray800',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                    onClick={() => {
                      setAddressData(city, item)
                      handleCloseBottomMenu()
                      setAddressError()
                      setCityTemp('')
                    }}
                  >
                    {item}
                  </MenuItem>
                ))
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </StyledDialog>
      <AlertPopup
        onSubmit={async () => {
          setShowError(false)
        }}
        submitTitle={'확인'}
        cancelTitle={'취소'}
        onCancel={() => {
          setShowError(false)
        }}
        description={'댓글을 삭제하시겠습니까?'}
        open={showError}
      />
    </div>
  )
}
