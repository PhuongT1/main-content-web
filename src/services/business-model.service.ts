import { BUSINESS_MODEL_CHARACTERISTIC_ENUM } from '@/app/(main-routes)/home/business-model/constants/business-model-canvas.constant'
import { TBusinessModelCharacteristics } from '@/app/(main-routes)/home/business-model/types/business-model-composition.type'
import { TResponseData } from '@/types/types.type'
import axios from './axios'

const ENDPOINT = '/project-part/step-resources'

export const getBusinessModelCharacteristics = async (type: BUSINESS_MODEL_CHARACTERISTIC_ENUM) => {
  const {
    data: { data }
  } = await axios.get<TResponseData<TBusinessModelCharacteristics[]>>(
    `${ENDPOINT}/business-model-characteristics?type=${type}`
  )
  return data
}
