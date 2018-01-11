/**
 * Created by zhaojuntong on 2018/1/11.
 */
module.exports = file => () => import('@/components/' + file + '.vue')
