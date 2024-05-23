export const emailValidator = (email?: string, isRequire: boolean = true): boolean => {
  return email ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) : false
}

export const emailOptionalValidator = (email?: string): boolean => {
  return email ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) : true
}

export const onlyLettersAndNumbers = (str?: string) => {
  return str ? /^[a-z0-9]*$/.test(str) : true
}

export const passwordNewValidator = (password?: string): boolean => {
  return password
    ? /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[`~!@#$%^&*()\-_=+[{\]}\|;:'",<.>/?])([a-zA-Z0-9`~!@#$%^&*()\-_=+[{\]}\|;:'",<.>/?]{8,})$/.test(
        password
      )
    : true
}

export const passwordValidator = (password?: string): boolean => {
  return password
    ? /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z@$!%*#?&]{8,}$/.test(password) ||
        /^(?=.*\d)(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(password) ||
        /^(?=.*\d)(?=.*[@$!%*#?&])[\d@$!%*#?&]{8,}$/.test(password) ||
        /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z@$!%*#?&]{8,}$/.test(password)
    : false
}

export const passwordOptionalValidator = (password?: string): boolean => {
  return password
    ? /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z@$!%*#?&]{8,}$/.test(password) ||
        /^(?=.*\d)(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(password) ||
        /^(?=.*\d)(?=.*[@$!%*#?&])[\d@$!%*#?&]{8,}$/.test(password) ||
        /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z@$!%*#?&]{8,}$/.test(password)
    : true
}

export const phoneValidator = (phoneNumber?: string): boolean => {
  const regexDashes = /^[0-9]{3}-([0-9]{3}|[0-9]{4})-[0-9]{4}$/gm
  const regexWithoutDashes = /^\(?(010)\)?([ .-]?)\2([0-9]{8})$/
  const parsedPhoneNumber = phoneNumber?.split('-').join('') || ''
  return phoneNumber ? regexDashes.test(phoneNumber) && regexWithoutDashes.test(parsedPhoneNumber) : false
}

export const phoneOptionalValidator = (phoneNumber?: string): boolean => {
  const regexDashes = /^[0-9]{3}-([0-9]{3}|[0-9]{4})-[0-9]{4}$/gm
  const regexWithoutDashes = /^\(?(010)\)?([ .-]?)\2([0-9]{8})$/
  const parsedPhoneNumber = phoneNumber?.split('-').join('') || ''
  return phoneNumber ? regexDashes.test(phoneNumber) && regexWithoutDashes.test(parsedPhoneNumber) : true
}

export const otpValidator = (otp?: string): boolean => {
  return otp ? /.[0-9]{4,5}./.test(otp) : false
}

export const nicknameValidator = (nickname?: string): boolean => {
  let nameArr = nickname ? nickname.split('') : []
  let isValid = true
  for (let i = 0; i < nameArr.length; i++) {
    if (nameArr[i] === ' ') continue
    if (!/([\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3])/g.test(nameArr[i])) {
      isValid = false
      break
    }
  }

  return isValid
}

export const urlValidator = (url: string): boolean => {
  return url
    ? /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi.test(url)
    : false
}

export const validateHangeul = (str: string) => {
  const regex = /[가-힣]+/
  return regex.test(str)
}

export const isKorean = (word: string) => {
  const koreanRegex = /^[\u1100-\u11FF\u3131-\u318E\uAC00-\uD7A3]*$/
  return koreanRegex.test(word)
}

export const phoneNumberReplaceRegex =
  /[(a-zA-Z)(?=.*!@#$%^&*()+_/;:"'/?>.,<[{}\])ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/g
