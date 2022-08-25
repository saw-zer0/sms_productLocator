import Login from "./pages/login";

const authRoutes = {
    publicRoutes: [
        {
            feature: 'LOGIN',
            path: '/login',
            element: <Login/>,
            exact: true
        }
    ]
}

export default authRoutes; 