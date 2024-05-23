import axios from 'axios'

const getSVG = async () => {
  const {
    data: { data }
  } = await axios.get(
    `https://dev-ssum.s3.ap-northeast-2.amazonaws.com/project-part/common/SVG/%E1%84%80%E1%85%B5%E1%84%90%E1%85%A1/%E1%84%80%E1%85%B5%E1%84%90%E1%85%A1-1.svg`
  )
  return data
}

export { getSVG }
