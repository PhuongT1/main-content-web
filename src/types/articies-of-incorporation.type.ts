export interface IOrganization {
  id: number
  uuid: string
  createdAt: Date
  updatedAt: Date
  deletedAt: null
  name: string
  organizationalCultureCategoryId: number
  no: number
}

export interface IDatum {
  investmentAmount: string
  numberContributedShares: string
  address: string
  status: string
  position: string
  contact: string
  birthdate: string
  name: string
  id: string
}

export interface IAriticiesOfIncorporationStep1 {
  organization: IOrganization[]
  companyWebsite: string
  media: string
  publicationArea: string
  numberIssuedShares: string
  pricePerShare: string
  capital: string
  totalNumberShares: string
  companyEstablishmentDate: string
  companyContactInformation: string
  detailedAddress: string
  headquartersLocation: string
  translationBusinessName: string
  translationBusinessNameType: string
  financialStatement: string
  businessName: string
  businessNameType: string
  data: IDatum[]
}

export interface IAriticiesOfIncorporationAtomStep1 {
  data: IAriticiesOfIncorporationStep1
}

export interface IAriticiesOfIncorporationAtomStep2 {
  data: IDataStep02
}

export interface ITypeOneForm {
  idea: string
  socialValueSector: string
  detail: string
}

export interface ITypeTwoForm {
  isActive?: boolean
}

export interface ITypeThreeForm {
  socialValueCompany: string
}

export interface ITypeFourForm {
  socialValueCompany: string
}

export interface ITypeFiveForm {
  isActive?: boolean
}

export interface ITypeSixForm {
  regulation: string
}

export interface ITypeSevenForm {
  regulation: string
}

export interface ITypeEightForm {
  representativeCompensation: string
  directorCompensation: string
  representativePaySeverant: string
  directorPaySeverant: string
  duty: string
}

export interface ITypeNineForm {
  isActive?: boolean
}
export interface ITypeTenForm {
  isActive?: boolean
}

export interface IDataStep02 {
  typeOne: ITypeOneForm
  typeTwo: ITypeTwoForm
  typeThree: ITypeThreeForm
  typeFour: ITypeFourForm
  typeFive: ITypeFiveForm
  typeSix: ITypeSixForm
  typeSeven: ITypeSevenForm
  typeEight: ITypeEightForm
  typeNine: ITypeNineForm
  typeTen: ITypeTenForm
}
