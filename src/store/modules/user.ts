import { defineStore } from 'pinia'
import type { UserState } from '../types/type'
import type { LoginFormData, LoginResponseData } from '@/api/user/type'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
import { reqLogin } from '@/api/user'

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
    }
  },
  getters: {},
  actions: {
    async userLogin(data: LoginFormData) {
      const result: LoginResponseData = await reqLogin(data)

      console.log('走到这里了')
      if (result.code == 200) {
        this.token = result.data
        SET_TOKEN(result.data)
        return 'ok'
      } else {
        console.log(result)
        return Promise.reject(new Error(result.message))
      }
    },
  },
})

export default useUserStore
