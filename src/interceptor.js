import axios from "axios";
import router from "umi/router";

/* 全局添加拦截器作用是可以在每个api前面就加上headers的token验证 */
axios.interceptors.request.use(config => {
    /* 判断token是否存在和是否需要token验证的路由 */
    if (localStorage.getItem("userinfo")) {
        config.headers.xToken = JSON.parse(localStorage.getItem("userinfo")).token;
    };
    return config;
});

/* 处理退出响应拦截器 */
// 响应 拦截器 的第二个参数, err 可以捕获状态, 来进行响应的处理
axios.interceptors.response.use(response => {
    if (response.status === 200) {
        const res = response.data;
        /* 如果 code 是-1 说明用户注销 或者 或者token已经过期了 */
        /* 需要消除localStoreage 和 清除vuex的token */
        if (res.code === -1) {
            clearHandler();
        }
    }
    return response;
}, 
err=> {
    /*判断一下未授权 */
    if(err.response.status === 401) {
        clearHandler();
    }
});

// 用来清空localStoreage
function clearHandler() {
    localStorage.removeItem("userinfo");

    /* 跳转到登录页面 */
    router.push({
        path: "/login",
        query: {
            redirect: router.currentRoute.path
        }
    });
}



// 这个是 可以通过定义 一些不变的状态码, 然后 通过拦截器 去显示相应的东西
// const codeMessage = {
//     202: "一个请求已经进入后台排队（异步任务）。",
//     401: "用户没有权限（令牌、用户名、密码错误）。",
//     404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
//     500: "服务器发生错误，请检查服务器。"
//   };
  
//   // 仅拦截异常状态响应
//   axios.interceptors.response.use(null, ({ response }) => {
//     if (codeMessage[response.status]) {
//       notification.error({
//         message: `请求错误 ${response.status}: ${response.config.url}`,
//         description: codeMessage[response.status]
//       });
//     }
       // 注意 这个一定要返回Promise.reject 不然请求在停留在这里, 不会在effects 中通过try{} catch() {} 捕获
//     return Promise.reject(err);
//   });
