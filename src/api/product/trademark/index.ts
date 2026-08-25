import request from '@/utils/request'
import type { ResponseData, TradeMarkResponseData, TradeMark } from './type'

const API = {
  TRADEMARK_URL: '/admin/product/baseTrademark/',
  ADDTRADEMARK_URL: '/admin/product/baseTrademark/save',
  UPDATETRADEMARK_URL: '/admin/product/baseTrademark/update',
  DELETE_URL: '/admin/product/baseTrademark/remove/',
} as const

export const reqHasTrademark = (page: number, limit: number) =>
  request.get<unknown, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )

export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  if (data.id) {
    return request.put<unknown, ResponseData>(API.UPDATETRADEMARK_URL, data)
  } else {
    return request.post<unknown, ResponseData>(API.ADDTRADEMARK_URL, data)
  }
}

export const reqDeleteTrademark = (id: number) =>
  request.delete<unknown, ResponseData>(API.DELETE_URL + id)
