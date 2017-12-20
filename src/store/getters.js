/**
 * Created by zhaojuntong on 2017/12/19.
 */
export default {
  visitedTags: state => state.routeTag.visitedTags,
  // permissionRoute: state => state.permission.constantRouterMap,
  token: state => state.user.token,
  name: state => state.user.name,
  roles: state => state.user.roles,
  introduction: state => state.user.introduction,
  avatar: state => state.user.avatar
}
