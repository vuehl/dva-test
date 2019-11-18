import Redirect from "umi/redirect";

// 这个是 全局私有路由的部分
export default props => {
    const userInfo = localStorage.getItem("userinfo");

    if (!(JSON.parse(userInfo) && JSON.parse(userInfo).token)) {
        return (
            <Redirect
                to={{
                    pathname: "/login",
                    state: { from: props.location.pathname } // 传递重定向地址
                }}
            />
        );
    }
    return (
        <div>
            <div>PrivateRoute (routes/PrivateRoute.js)</div>
            {props.children}
        </div>
    );
};
