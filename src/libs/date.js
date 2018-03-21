import dateUtil from './dateUtil'

export const toDate = function (date) {
  return isDate(date) ? new Date(date) : null
}

export const isDate = function (date) {
  if (date === null || date === undefined) return false
  if (isNaN(new Date(date).getTime())) return false
  return true
}

export const formatDate = function (date, format) {
  date = toDate(date)
  if (!date) return ''
  return dateUtil.format(date, format || 'yyyy-MM-dd')
}

export const parseDate = function (string, format) {
  return dateUtil.parse(string, format || 'yyyy-MM-dd')
}
