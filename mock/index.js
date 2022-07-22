import Mock from "mockjs";
let baseUrl = process.env.VUE_APP_BASE_API;

//模拟登录接口
const login = Mock.mock(`${baseUrl}/login`, "post", (req, res) => {
  const data = JSON.parse(req.body);
  const username = data.username;
  const password = data.password;
  if (username === "admin" && password === "123456") {
    return {
      code: "200",
      msg: "登陆成功",
      data: {
        orgCode: "35002",
        token:
          "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOiJhZG1pbiIsInVzZXJOYW1lIjoiYWRtaW4iLCJvcmdDb2RlIjoiMzUwMDAiLCJkZXB0Q29kZSI6IjM1MDAwIiwiYXVkIjoiYWRtaW4iLCJpc3MiOiJhZG1pbiIsImV4cCI6MTU5MzUzNTU5OH0.0pJAojRtT5lx6PS2gH_Q9BmBxeNlgBL37ABX22HyDlebbr66cCjVYZ0v0zbLO_9241FX9-FZpCkEqE98MQOyWw",
      },
    };
  } else {
    return {
      code: "999",
      msg: "登陆失败",
    };
  }
});

//模拟权限接口
const getRoleList = Mock.mock(`${baseUrl}/getRoleList`, "get", (req, res) => {
  return {
    code: 200,
    message: "查询成功",
    data: [
      {
        roleName: "群主",
        roleId: 1,
        authority: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      {
        roleName: "大帮主",
        roleId: 2,
        authority: [1, 2, 3, 4, 5, 6, 7, 8],
      },
      {
        roleName: "小帮主",
        roleId: 3,
        authority: [1, 2, 3, 4, 5, 6],
      },
      {
        roleName: "龙王",
        roleId: 4,
        authority: [1, 2, 3, 4],
      },
      {
        roleName: "吃瓜群众",
        roleId: 5,
        authority: [1, 2],
      },
    ],
  };
});

//模拟用户接口
const getUserList = Mock.mock(`${baseUrl}/getUserList`, "get", (req, res) => {
  return {
    code: 200,
    message: "查询成功",
    data: [
      {
        id: 1,
        nickname: "Jdog",
        username: "Jdog",
        role: [
          { roleId: 1, roleName: "群主" },
          { roleId: 4, roleName: "龙王" },
          { roleId: 5, roleName: "吃瓜群众" },
        ],
      },
      {
        id: 2,
        nickname: "strongMan",
        username: "bear",
        role: [
          { roleId: 2, roleName: "大帮主" },
          { roleId: 5, roleName: "吃瓜群众" },
        ],
      },
      {
        id: 3,
        nickname: "nigulas",
        username: "nigulas",
        role: [{ roleId: 3, roleName: "小帮主" }],
      },
      {
        id: 4,
        nickname: "Ldog",
        username: "Ldog",
        role: [{ roleId: 4, roleName: "龙王" }],
      },
      {
        id: 5,
        nickname: "Fdog",
        username: "Fdog",
        role: [{ roleId: 5, roleName: "吃瓜群众" }],
      },
    ],
  };
});

//路由列表接口
const routerList = Mock.mock(`${baseUrl}/getRouterList`, "get", (req, res) => {
  return {
    code: 200,
    message: "查询成功",
    data: [
      {
        path: "OrderView",
        name: "order",
        meta: {
          isShow: true,
          title: "订单列表",
        },
      },
      {
        path: "UserView",
        name: "userList",
        meta: {
          isShow: true,
          title: "用户列表",
        },
      },
      {
        path: "RoleView",
        name: "roleList",
        meta: {
          isShow: true,
          title: "角色列表",
        },
      },
      {
        path: "AuthorityViView",
        name: "authority",
        meta: {
          isShow: false,
          title: "权限列表",
        },
      },
    ],
  };
});

//随机数据
const user = Mock.mock(`${baseUrl}/getlist`, "get", (req, res) => {
  return {
    code: 200,
    message: "查询成功",
    data: Mock.mock({
      "data|100": [
        //生成100条数据 数组
        {
          "id|+1": 1,
          name: "@ctitle(3,6)",
          body: "@cword(20,60)",
        },
      ],
    }),
  };
});
