//格式化工具函数

/**
 * 日期格式化
 * @param date 日期对象、时间戳或日期字符串
 * @param fmt 格式化模板，支持 YYYY、MM、DD、HH、mm、ss，默认 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
 */
export const formatDate = (
  date: Date | number | string,
  fmt = 'YYYY-MM-DD HH:mm:ss',
): string => {
  const d = date instanceof Date ? date : new Date(date)
  // 无效日期返回空字符串，避免输出 'Invalid Date'
  if (Number.isNaN(d.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  const map: Record<string, string> = {
    YYYY: String(d.getFullYear()),
    MM: pad(d.getMonth() + 1),
    DD: pad(d.getDate()),
    HH: pad(d.getHours()),
    mm: pad(d.getMinutes()),
    ss: pad(d.getSeconds()),
  }
  return fmt.replace(/YYYY|MM|DD|HH|mm|ss/g, (key) => map[key])
}

/**
 * 数字千分位格式化
 * @param num 数字
 * @returns 千分位格式的字符串，如 1234567 -> '1,234,567'
 */
export const formatNumber = (num: number): string => num.toLocaleString('en-US')
