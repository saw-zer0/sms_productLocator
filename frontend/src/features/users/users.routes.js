import Dashboard from "./pages/Dashboard"

const usersRoutes = [
    {
        feature: 'DASHBOARD',
        path: '/dashboard',
        element: <Dashboard/>,
        exact: true
    }
]

export default usersRoutes;