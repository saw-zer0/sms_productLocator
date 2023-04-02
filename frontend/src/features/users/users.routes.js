import Dashboard from "./pages/Dashboard"
import AddUser from "./pages/addUser"

const usersRoutes = [
    {
        feature: 'DASHBOARD',
        path: '/dashboard',
        element: <Dashboard/>,
        exact: true
    },
    {
        feature: 'ADD_USER',
        path: '/new_user',
        element: <AddUser/>,
        exact: true
    }
]

export default usersRoutes;