//用户信息数据
function createUserList() {
  return [
    {
      userId: 1,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'admin',
      password: '111111',
      desc: '平台管理员',
      roles: ['平台管理员'],
      buttons: ['cuser.detail'],
      routes: ['home'],
      token: 'Admin Token',
    },
    {
      userId: 2,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'system',
      password: '111111',
      desc: '系统管理员',
      roles: ['系统管理员'],
      buttons: ['cuser.detail', 'cuser.user'],
      routes: ['home'],
      token: 'System Token',
    },
  ]
}

export default [
  // 用户登录接口
  // 注意：url 需与「axios baseURL + 接口路径」拼接结果一致（vite-plugin-mock 按完整请求路径匹配）
  {
    url: '/dev-api/admin/acl/index/login', //请求地址
    method: 'post', //请求方式
    response: ({ body }) => {
      //获取请求体携带过来的用户名与密码
      const { username, password } = body
      //调用获取用户信息函数,用于判断是否有此用户
      const checkUser = createUserList().find(
        (item) => item.username === username && item.password === password,
      )
      //没有用户返回失败信息
      if (!checkUser) {
        return {
          code: 201,
          message: '账号或者密码不正确',
          ok: false,
          data: null,
        }
      }
      //如果有返回成功信息，data 为 token 字符串（与 loginResponseData 类型一致）
      return { code: 200, message: '登录成功', ok: true, data: checkUser.token }
    },
  },
  // 获取用户信息
  {
    url: '/dev-api/admin/acl/index/info',
    method: 'get',
    response: (request) => {
      //获取请求头携带token
      const token = request.headers.token
      //查看用户信息是否包含有次token用户
      const checkUser = createUserList().find((item) => item.token === token)
      //没有返回失败的信息
      if (!checkUser) {
        return { code: 201, message: '获取用户信息失败', ok: false, data: null }
      }
      //如果有返回成功信息（结构需与 userInfoResponseData 类型一致）
      const { routes, buttons, roles, username, avatar } = checkUser
      return {
        code: 200,
        message: '获取用户信息成功',
        ok: true,
        data: {
          routes,
          buttons,
          roles,
          name: username,
          avatar,
        },
      }
    },
  },
  // 退出登录
  {
    url: '/dev-api/admin/acl/index/logout',
    method: 'post',
    response: () => {
      return { code: 200, message: '退出成功', ok: true, data: null }
    },
  },
]
