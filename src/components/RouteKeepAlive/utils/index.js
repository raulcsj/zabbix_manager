export function isDef(v) {
  return v !== undefined && v !== null
}

export function isRegExp(v) {
  return Object.prototype.toString.call(v) === '[object RegExp]'
}

export function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

export function extend(to, _from) {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}
