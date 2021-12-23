// 是否使用MD5对密码加密，防止在数据库被拖库时泄漏用户真实密码，也增加了密码暴力破解的难度
const openPasswordMD5 = true
// 是否开启多用户登录
const multiUserLogin = true
// 是否开启 密码修改时间检测 的提示
const checkPasswordChangTime = true
// 初始化密码的修改时间判定常量 配置
const initailPasswordTime = '2000-01-01 00:00:00'
// 是否退出登录后的路由历史记录重定向
const openRedirect = false
// token 和 登录用户的前端有效时间， 此时间最好与后端token有效期保持一致
const tokenExpiredTime = 1000 * 60 * 60 * 2
// 百度地图AK
const BMapAK = 'BRMvvGtnwaAxgclF3lxvchdIZkVVgRQp'
// 开发用的服务器
const devHost = 'http://172.16.16.150:61010'
// const devWs = 'ws://172.16.16.100:4201'
// const ws = 'wss://'+window.location.host+'/wss'  //上线环境websoket

module.exports = {
  openPasswordMD5,
  multiUserLogin,
  tokenExpiredTime,
  BMapAK,
  initailPasswordTime,
  checkPasswordChangTime,

  devHost,
  openRedirect
}
