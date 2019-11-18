// 这个是dva中 手动配置路由的部分 那么umi自带的route.js 就会失效
export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
      },
    ],
  ],
  routes: [
    {
      path: '/login',
      component: './login',
    },
    {
      path: '/',
      component: '../layouts',  //这个是配置全局路由的, 相当于给页面做了一个包裹的作用, 
      routes: [
        {
          path: '/',
          component: './goods/index',
        },
        {
          path: '/about',
          component: './about',
          Routes: ['./routes/PrivateRoute.js'],    //大写的Routes 是自带的私有路由的验证
        },
        {
          path: '/users',
          component: './users/_layout',
          routes: [
            {
              path: '/users/',
              component: './users/index',
            },
            {
              path: '/users/:id',
              component: './users/$id',           //这个$id 是动态的传参数的
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
  ],
};
