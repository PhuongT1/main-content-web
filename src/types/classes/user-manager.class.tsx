import { LANG } from '@/constants/common.constant'
import { JwtToken } from '../user.type'

class UserManager {
  private static instance: UserManager
  private jwtToken: JwtToken | undefined = undefined
  private lang: LANG | undefined = undefined

  private constructor() {}

  public static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager()
    }
    return UserManager.instance
  }

  public setToken(jwtToken: JwtToken | undefined): void {
    this.jwtToken = jwtToken
  }

  public getToken(): JwtToken | undefined {
    return this.jwtToken
  }

  public clearUser(): void {
    this.jwtToken = undefined
    this.lang = undefined
  }

  public setLanguage(lang: LANG): void {
    this.lang = lang
  }

  public getLanguage(): LANG | undefined {
    return this.lang
  }
}

export default UserManager
