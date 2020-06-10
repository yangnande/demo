import {
  host_boss
} from 'utils/host'
import fetch from 'utils/fetch'

export const getsaleAdver = (userinfo, reqBody) => fetch({
  url: host_boss + 'DH/homeSale/getsaleAdver',
  data: {
    ...userinfo,
    reqBody
  }
})
