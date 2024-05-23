import CharactorInventory from '@/assets/icons/charactor-inventory'
import IconCategory from '@/assets/icons/ic-category'
import IconMore from '@/assets/icons/ic-more'
import IconUpload from '@/assets/icons/ic-upload'
import IndustryInventory from '@/assets/icons/industry-inventory'
import LogoInventory from '@/assets/icons/logo-inventory'
import UserInventory from '@/assets/icons/user-inventory'
import { loadingAtom } from '@/atoms/loading'
import Button from '@/elements/button'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { uploadFile } from '@/services/file.service'
import { getImageUser, getListInventory } from '@/services/inventory.service'
import { IInventoryData } from '@/types/inventory.type'
import { IFile } from '@/types/user.type'
import { CATEGORY_CHARACTER, CATEGORY_INDUSTRY, CATEGORY_LOGO, CATEGORY_PERSON, INVENTORY_TAB } from '@/utils/constants'
import { Box, IconButton, Modal, Typography, useMediaQuery, useTheme } from '@mui/material'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import axios from 'axios'
import Image from 'next/image'
import { enqueueSnackbar } from 'notistack'
import * as React from 'react'
import { ChangeEvent, useMemo, useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import ObserverBox from '../observer-box'
import styles from './Inventory.module.scss'
import SelectDropdown from './components/select-dropdown'

interface TabPanelProps {
  children?: React.ReactNode
  index: string
  value: string
}

interface Modal {
  open: boolean
  multiple?: boolean
  onClose: () => void
  setImages: (list: any) => void
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  }
}

const InventoryImages = ({ open, multiple, onClose, setImages }: Modal) => {
  const [value, setValue] = useState(INVENTORY_TAB.PERSON)
  const [list, setList] = useState<any>([])
  const [category, setCategory] = useState() as any
  const [listInventory, setListInventory] = useState<IInventoryData[]>([])
  const [listImageUser, setListImageUser] = useState<IInventoryData[]>([])
  const [totalRecord, setTotalRecord] = useState<number>(0)
  const [listImg, setListImg] = useState<string[]>([])
  const [listSvg, setListSvg] = useState<any>()
  const [temp, setTemp] = useState<any>();

  const isMobile = useMediaQuery('(max-width: 1440px)')
  const tabCategories = [
    INVENTORY_TAB.LOGO,
    INVENTORY_TAB.PERSON,
    INVENTORY_TAB.CHARACTER,
    INVENTORY_TAB.INDUSTRY,
    INVENTORY_TAB.OTHER
  ]
  const setLoading = useSetRecoilState(loadingAtom)

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    if (newValue == undefined) {
      newValue = value;
    }
    setValue(newValue as any)
    setCategory("")
  }

  React.useEffect(() => {
    setCategory("")

  }, [value])

  const getItemCategory = (activeTab: string) => {
    switch (activeTab) {
      case INVENTORY_TAB.PERSON:
        return CATEGORY_PERSON
      case INVENTORY_TAB.INDUSTRY:
        return CATEGORY_INDUSTRY
      case INVENTORY_TAB.CHARACTER:
        return CATEGORY_CHARACTER
      case INVENTORY_TAB.LOGO:
        return CATEGORY_LOGO
      default:
        return []
    }
  }
  const placeHolderList = {
    [INVENTORY_TAB.PERSON]: '연령대',
    [INVENTORY_TAB.CHARACTER]: '종류',
    [INVENTORY_TAB.INDUSTRY]: '종류',
    [INVENTORY_TAB.LOGO]: '종류'
  } as any

  const reviews = useMemo(() => {
    return placeHolderList[value]
  }, [value])

  //GET LIST IMAGES
  const { isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteScroll({
    key: 'inventory-list',
    depend: [value, category, open],
    initialPageParam: {
      page: 1,
      category1: value,
      category2: !!category ? category : null
    },
    meta: {
      offLoading: true
    },
    enabled: open === true && tabCategories.includes(value),
    fn: (pageParam) =>
      getListInventory({
        page: pageParam.page,
        limit: 20,
        category1: pageParam.category1,
        category2: value !== 'LOGO' ? (!!pageParam.category2 ? pageParam.category2 : null) : 'DEFAULT'
      }),

    onSuccess: (data) => {
      const page = data.pages
      let inventoryImageData: IInventoryData[] = []
      page.forEach(
        (page: any) =>
          page?.data?.result?.forEach((x: IInventoryData) => {
            inventoryImageData.push(x)
          }),
        setTotalRecord(page[0]?.data?.metaData?.totalRecords)
      )
      setListInventory(inventoryImageData as IInventoryData[])
    }
  })

  //GET LIST IMAGES USER
  const scrollUser = useInfiniteScroll({
    key: 'images-uer',
    depend: [value, open],
    initialPageParam: {
      page: 1
    },
    meta: {
      offLoading: true
    },
    enabled: open === true && value === INVENTORY_TAB.MY_CATEGORY,
    fn: (pageParam) =>
      getImageUser({
        page: pageParam.page,
        limit: 20,
        folder: 'gallery'
      }),
    onSuccess: (data) => {
      const page = data?.pages
      let imageUserDate: IInventoryData[] = []
      page.forEach(
        (page: any) =>
          page?.data?.result?.forEach((x: IInventoryData) => {
            imageUserDate.push(x)
          }),
        setTotalRecord(page[0]?.data?.metaData?.totalRecords)
      )
      setListImageUser(imageUserDate as IInventoryData[])
    }
  })

  const addFile = (fileData: IFile) => {
    const fileItem: any = {
      listId: list.length,
      file: fileData,
      type: 'file'
    }
    let newList = [...list]
    newList.push(fileItem)
    setList(newList)
  }


  React.useEffect(() => {
    if (temp === 'image/svg+xml') {
      setValue(INVENTORY_TAB.MY_CATEGORY);
    }
  }, [temp])

  const uploadImageInventory = async (event: ChangeEvent<HTMLInputElement> | any) => {
    setTemp(event.target.files[0].type)
    setLoading(true);
    if (!event?.target?.files) {
      setLoading(false);
      return;
    }
    const file = event.target.files[0];
    if (file.type === 'image/svg+xml') {
      setLoading(false);
      enqueueSnackbar('파일 형식이 유효하지 않습니다.', {
        variant: 'error'
      });
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setLoading(false);
      setValue(INVENTORY_TAB.MY_CATEGORY);
      enqueueSnackbar('허용 파일 용량을 초과했습니다. (3MB 이하 업로드)', {
        variant: 'error'
      });
      return;
    }
    try {
      const { data, error } = await uploadFile({ file, folder: 'gallery' });
      if (!error) {
        addFile(data);
        enqueueSnackbar(`${file.name}가 업로드 완료되었습니다!`, {
          variant: 'success'
        });
      } else {
        enqueueSnackbar('이미지 업로드에 실패하였습니다!', {
          variant: 'error'
        });
      }
    } catch (error) {
      enqueueSnackbar('이미지 업로드에 실패하였습니다!', {
        variant: 'error'
      });
    }
    setValue(INVENTORY_TAB.MY_CATEGORY);
    setLoading(false);
  }


  const handleClickImage = (img: string) => {
    const index = list?.findIndex((item: string) => item === img)
    if (index !== -1) {
      const updatedList = [...listImg]
      updatedList.splice(index, 1)
      setListImg(updatedList)
    } else {
      if (multiple) {
        setListImg([...listImg, img])
      } else {
        setListImg([img])
      }
    }
  }

  const {
    palette: { home }
  } = useTheme()

  const [logoDesign, setLogoDesign] = useState<any>({
    layout: 'flexColumn',
    color: '',
    backgrounds: 1
  })

  const onSelectSymbol = async () => {
    try {
      const promises = listInventory?.map((symbol: any) => {
        return axios.get(symbol.fileUrl, {
          headers: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Expires: '0'
          }
        })
      })
      const results = await Promise.all(promises)
      setListSvg(results.map(({ data }) => data));
    } catch (error) {
    }
  }

  useEffect(() => {
    if (value === 'LOGO' && !!listInventory) {
      onSelectSymbol()
    }
  }, [listInventory])

  useEffect(() => {
    if (listSvg) {
      const modifiedSvg = listSvg?.map((svgItem: any) => {
        return svgItem.replaceAll(
          /fill="black"|fill="#050A0A"|fill="#373535"|fill="#0F0E0E"|stroke="#373535"|stroke="black"|fill="#0F0F0F"|fill="#161616"/g,
          `fill="${category?.toLowerCase()}" stroke="${category?.toLowerCase()}"`
        )
      }).map((svgItem: any) => {
        return svgItem.replaceAll('<svg', `<svg style="width: 100%;height: 100%;"`)
      })
      setLogoDesign((prevState: any) => ({
        ...prevState,
        htmlSvg: { htmlSvg: !!category ? modifiedSvg : listSvg }
      }))
    }
  }, [listInventory, value])

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{ height: isMobile ? '500px' : '720px', width: isMobile ? '950px' : '1080px' }}
        className={styles.inventory_content}
      >
        <Typography
          id='modal-modal-description'
          sx={{
            backgroundColor: home.gray400,
            color: home.gray50,
            borderBottom: `1px solid ${home.gray200}`
          }}
          className={styles.inventory_title}
        >
          이미지 인벤토리
        </Typography>
        <Box sx={{ backgroundColor: home.gray500 }} className={styles.inventory_nav}>
          <Tabs
            className={styles.inventory_tab}
            orientation='vertical'
            variant='scrollable'
            value={value}
            onChange={handleChange}
            aria-label='Vertical tabs example'
            sx={{
              borderRight: `1px solid ${home.gray200}`,
              backgroundColor: home.gray400,
              '& .Mui-selected': {
                color: `${home.blue500} !important`,
                backgroundColor: '#2D68FE1A',
                path: {
                  stroke: `${home.blue500} !important`
                },
                '& .MuiTab-iconWrapper': {
                  path: {
                    stroke: `${home.blue500} !important`,
                    fill: `${home.blue500} !important`
                  }
                }
              },
              '& .MuiTab-root': {
                justifyContent: 'start !important',
                minHeight: '0px !important',
                padding: '8px 16px !important',
                borderRadius: '8px',
                marginBottom: '12px',
                columnGap: '12px',
                minWidth: 'max-content',
                fontWeight: '600',
                position: 'relative'
              },
              '& .MuiTab-root:hover': {
                backgroundColor: '#2D68FE33 !important',
                color: `${home.blue500} !important`,
                path: {
                  stroke: `${home.blue500} !important`
                },
                '& .MuiTab-iconWrapper': {
                  path: {
                    stroke: `${home.blue500} !important`,
                    fill: `${home.blue500} !important`
                  }
                }
              },
              '& .MuiTabs-scroller': {
                padding: '32px 20px !important'
              },
              '& .MuiTabs-root': {
                width: '500px !important'
              },
              '& .MuiTabs-indicator': {
                display: 'none !important'
              }
            }}
          >
            <Tab
              value={INVENTORY_TAB.PERSON}
              iconPosition='start'
              icon={<UserInventory />}
              label={
                <p>
                  사람
                  {value === INVENTORY_TAB.PERSON && !!totalRecord && (
                    <span
                      style={{ position: 'absolute', right: '16px', top: '7px', color: home.gray600 }}
                      className={styles.count_user}
                    >
                      {totalRecord}
                    </span>
                  )}
                </p>
              }
              {...a11yProps(0)}
            />
            <Tab
              value={INVENTORY_TAB.INDUSTRY}
              iconPosition='start'
              icon={<IndustryInventory />}
              label={
                <p>
                  산업
                  {value === INVENTORY_TAB.INDUSTRY && !!totalRecord && (
                    <span
                      style={{ position: 'absolute', right: '16px', top: '7px', color: home.gray600 }}
                      className={styles.count_user}
                    >
                      {totalRecord}
                    </span>
                  )}
                </p>
              }
              {...a11yProps(1)}
            />
            <Tab
              value={INVENTORY_TAB.CHARACTER}
              iconPosition='start'
              icon={<CharactorInventory />}
              label={
                <p>
                  캐릭터
                  {value === INVENTORY_TAB.CHARACTER && !!totalRecord && (
                    <span
                      style={{ position: 'absolute', right: '16px', top: '7px', color: home.gray600 }}
                      className={styles.count_user}
                    >
                      {totalRecord}
                    </span>
                  )}
                </p>
              }
              {...a11yProps(2)}
            />
            <Tab
              value={INVENTORY_TAB.LOGO}
              iconPosition='start'
              icon={<LogoInventory />}
              label={
                <p>
                  로고
                  {value === INVENTORY_TAB.LOGO && !!totalRecord && (
                    <span
                      style={{ position: 'absolute', right: '16px', top: '7px', color: home.gray600 }}
                      className={styles.count_user}
                    >
                      {totalRecord}
                    </span>
                  )}
                </p>
              }
              {...a11yProps(2)}
            />
            <Tab
              value={INVENTORY_TAB.OTHER}
              iconPosition='start'
              icon={
                <p>
                  <IconMore />
                </p>
              }
              label={
                <p>
                  기타{' '}
                  {value === INVENTORY_TAB.OTHER && !!totalRecord && (
                    <span
                      style={{ position: 'absolute', right: '16px', top: '7px', color: home.gray600 }}
                      className={styles.count_user}
                    >
                      {totalRecord}
                    </span>
                  )}
                </p>
              }
              {...a11yProps(4)}
            />
            <Tab
              value={INVENTORY_TAB.MY_CATEGORY}
              iconPosition='start'
              icon={<IconCategory />}
              label={
                <p>
                  나의 갤러리
                  {value === INVENTORY_TAB.MY_CATEGORY && !!totalRecord && (
                    <span
                      style={{ position: 'absolute', right: '16px', top: '7px', color: home.gray600 }}
                      className={styles.count_user}
                    >
                      {totalRecord}
                    </span>
                  )}
                </p>
              }
              {...a11yProps(5)}
            />
            <IconButton className={styles.inventory_btnUpload} component='label'>
              <div>
                <IconUpload />
              </div>
              <p className={styles.button_text}> 직접 업로드</p>
              <input hidden type='file' onChange={uploadImageInventory} accept='image/*' name='logoImage' />
            </IconButton>
          </Tabs>
          <Box className={styles.inventory_wrapperContent}>
            <div style={{ padding: '24px 30px', height: '100%' }}>
              {value != INVENTORY_TAB.OTHER && value != INVENTORY_TAB.MY_CATEGORY && (
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                  <SelectDropdown
                    value={category}
                    setValue={setCategory}
                    items={getItemCategory(value)}
                    width={113}
                    forColor={value === INVENTORY_TAB.LOGO && true}
                    emptyValue
                    placeHolder={'선택'}
                  />
                </div>
              )}
              <div>
                {tabCategories?.map((item, index) => (
                  <TabPanel value={value} index={item} key={index}>
                    <Box
                      sx={{
                        height: isMobile ? 280 : 518,
                        overflow: 'scroll',
                        overflowX: 'hidden'
                      }}
                    >
                      {value === 'LOGO' ? (
                        !!category ? (
                          <Box className={styles.mansory_wrapper}>
                            {logoDesign?.htmlSvg?.htmlSvg?.map((item: any, idx: number) => (
                              <Box key={idx} className={styles.mansory_item}>
                                <div
                                  // className='testing_abcd'
                                  // style={{ height: '196px', width: '196px' }}
                                  dangerouslySetInnerHTML={{
                                    __html: item
                                  }}
                                />
                              </Box>
                            ))}
                          </Box>
                        ) : (
                          <Box className={styles.mansory_wrapper}>
                            {listSvg
                              ?.map((svgItem: any) => {
                                return svgItem.replaceAll('<svg', `<svg style="width: 100%;height: 100%;"`)
                              })
                              .map((item: any, idx: number) => (
                                <Box key={idx} className={styles.mansory_item}>
                                  <div
                                    // className='testing_abcd'
                                    // style={{ height: '196px', width: '196px' }}
                                    dangerouslySetInnerHTML={{
                                      __html: item
                                    }}
                                  />
                                </Box>
                              ))}
                          </Box>
                        )
                      ) : (
                        <Box className={styles.mansory_wrapper}>
                          {listInventory?.map((x, idx) => (
                            <Box className={styles.mansory_item} key={idx}>
                              <Image
                                onClick={() => {
                                  handleClickImage(x.fileUrl)
                                }}
                                src={x?.fileUrl}
                                style={{
                                  height: 'auto',
                                  width: '100%',
                                  display: 'block',
                                  border: listImg.includes(x.fileUrl)
                                    ? `3px solid ${home.blue500}`
                                    : '3px solid transparent'
                                }}
                                alt='image'
                                width={196}
                                height={196}
                              />
                            </Box>
                          ))}
                        </Box>
                      )}
                      {hasNextPage && (
                        <ObserverBox
                          haveNextPage={hasNextPage}
                          fetchNext={() => fetchNextPage()}
                          showLoading={isFetchingNextPage}
                        />
                      )}
                    </Box>
                  </TabPanel>

                ))}

                <TabPanel value={value} index={INVENTORY_TAB.MY_CATEGORY}>
                  <Box sx={{ height: isMobile ? 330 : 518, overflowY: 'scroll' }}>
                    <Box className={styles.mansory_wrapper}>
                      {listImageUser.map((image: any, idx: number) => (
                        <Box className={styles.mansory_item} key={idx}>
                          <Image
                            onClick={() => {
                              handleClickImage(image?.baseUrl)
                            }}
                            src={image?.baseUrl ?? ''}
                            style={{
                              height: 'auto',
                              width: '100%',
                              display: 'block',
                              border: listImg.includes(image?.baseUrl) ? `3px solid ${home.blue500}` : '3px solid transparent'
                            }}
                            alt='image'
                            width={196}
                            height={196}
                          />
                        </Box>
                      ))}
                    </Box>
                    {scrollUser?.hasNextPage && (
                      <ObserverBox
                        haveNextPage={scrollUser?.hasNextPage}
                        fetchNext={() => scrollUser?.fetchNextPage()}
                        showLoading={scrollUser?.isFetchingNextPage}
                      />
                    )}
                  </Box>
                </TabPanel>
              </div>
            </div>
            <div
              style={{ backgroundColor: home.gray400, borderTop: `1px solid ${home.gray200}` }}
              className={styles.inventory_button}
            >
              <Button
                className={styles.inventory_cancelBtn}
                onClick={() => {
                  onClose()
                  setValue(INVENTORY_TAB.PERSON)
                }}
                customTitle={<Typography>취소</Typography>}
                cate={'primary'}
                customSize={'sm'}
                sx={{
                  padding: '12.5px 46px',
                  width: 'auto',
                  height: 'auto',
                  backgroundColor: home.gray300,
                  cursor: 'pointer',

                  '&:hover': {
                    backgroundColor: `${home.gray300} !important`
                  },
                  '& .MuiTypography-root': {
                    color: `${home.gray50} !important`
                  }
                }}
              />
              <Button
                className={styles.inventory_submitBtn}
                onClick={() => {
                  setImages(listImg)
                  onClose()
                }}
                customTitle={<Typography>생성</Typography>}
                cate={'primary'}
                customSize={'sm'}
                sx={{
                  padding: '12.5px 46px',
                  width: 'auto',
                  height: 'auto',
                  '& .MuiTypography-root': {
                    color: `${home.gray500} !important`
                  }
                }}
              />
            </div>
          </Box>
        </Box>
      </Box >
    </Modal >
  )
}

export default InventoryImages