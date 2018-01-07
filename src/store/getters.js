/**
 * Created by zhaojuntong on 2017/12/19.
 */
export default {
  visitedTags: state => state.routeTag.visitedTags,
  cacheTags: state => state.routeTag.cacheTags,
  permissionRoutes: state => state.permission.routes,
  addRouters: state => state.permission.addRouters,
  token: state => state.user.token,
  name: state => state.user.name,
  roles: state => state.user.roles,
  introduction: state => state.user.introduction,
  avatar: state => state.user.avatar
}
