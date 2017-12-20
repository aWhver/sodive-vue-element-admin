/**
 * Created by zhaojuntong on 2017/12/19.
 */
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken () {
  return arguments.length === 0 ? Cookies.get(TokenKey) : Cookies.get(arguments[0])
}

export function setToken () {
  return arguments.length === 1 ? Cookies.set(TokenKey, arguments[0], {expires: 7}) : Cookies.set(arguments[1], arguments[0], {expires: 7})
}

export function removeToken () {
  return arguments.length === 0 ? Cookies.remove(TokenKey) : Cookies.remove(arguments[0])
}
