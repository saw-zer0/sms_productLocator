import AddProduct from "./pages/addProduct";
import ViewProducts from "./pages/viewProducts"


const publicRoutes = [
        {
            feature: "PRODUCT_VIEW",
            path: "/",
            element: <ViewProducts/>,
            exact: true,
        },   
    ]
const privateRoutes = [
    {
        feature: "PRODUCT_ADD",
        path: "/new_product",
        element: <AddProduct/>,
        exact: true,
    },
    {
        feature: "PRODUCT_EDIT",
        path: "/edit_product/:productId",
        element: <AddProduct/>,
        exact: true,
    },
]


export default {publicRoutes, privateRoutes};