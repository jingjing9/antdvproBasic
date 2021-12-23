import { axios } from '@/utils/realhttp'
const api = {
  queryPointTree: '/business/road_gate/query_point_tree' // 获取道闸/卡口点位树
}

export function queryPointTree (parameter) {
  return axios({
    url: api.queryPointTree,
    method: 'post',
    data: parameter
  })
}
