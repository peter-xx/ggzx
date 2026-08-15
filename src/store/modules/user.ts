import { defineStore } from 'pinia'
import type { UserState } from './types/type'
import type {
  LoginFormData,
  LoginResponseData,
  UserInfoResponseData,
} from '@/api/user/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user'
import { constantRoute } from '@/router/routes'

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
      buttons: [],
    }
  },

  getters: {},

  actions: {
    async userLogin(data: LoginFormData) {
      const result: LoginResponseData = await reqLogin(data)

      if (result.code == 200) {
        this.token = result.data
        SET_TOKEN(result.data)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    async userInfo() {
      const result: UserInfoResponseData = await reqUserInfo()

      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        this.buttons = result.data.buttons

        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    async userLogout() {
      const result: any = await reqLogout()

      if (result.code == 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
})

export default useUserStore
