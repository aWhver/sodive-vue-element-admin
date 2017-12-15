/**
 * Created by lenovo on 2017/12/15.
 */
import Vue from 'vue'
import SvgIcon from 'views/svgIcon/svgIcon'

Vue.component('svg-icon', SvgIcon)
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
