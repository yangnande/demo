import {host_boss} from 'utils/host'
import fetch from 'utils/fetch'

export const getNavtationAllData = (userinfo, reqBody) => fetch({
  url: host_boss + 'DH/goods/catalogSearch',
  data: {
    ...userinfo,
    reqBody
  }
})
