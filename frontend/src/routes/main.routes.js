import homeRoutes from '../features/home/home.routes';
import productsRoutes from '../features/products/product.routes'
import authRoutes from '../features/auth/auth.routes';
import usersRoutes from '../features/users/users.routes'

export const privateRoutes = [
    ...productsRoutes.privateRoutes,
    ...usersRoutes
];


export const publicRoutes = [
    ...productsRoutes.publicRoutes,
    ...authRoutes.publicRoutes
];
