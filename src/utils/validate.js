/**
 * Created by zhaojuntong on 2017/12/20.
 */
export function isValidUsername (username) {
  const validName = 'admin'
  return validName.indexOf(username.trim()) >= 0
}
