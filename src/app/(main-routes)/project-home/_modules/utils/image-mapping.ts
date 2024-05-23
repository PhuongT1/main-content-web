import { IMAGE_TYPE_ENUM } from '../domain'

type FILED_UPLOAD = 'thumbnail' | 'logo'

export const mapImageTypeEnumToString = (enumValue: IMAGE_TYPE_ENUM): FILED_UPLOAD | undefined => {
  switch (enumValue) {
    case IMAGE_TYPE_ENUM.THUMBNAIL:
      return 'thumbnail'
    case IMAGE_TYPE_ENUM.LOGO:
      return 'logo'
    default:
      return undefined
  }
}
