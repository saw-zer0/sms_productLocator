const router = require('express').Router()

const passport = require('passport')
const { createProduct, listProducts, deleteProduct, searchProduct } = require('../controllers/product.controller')
const { createUser, login, listAllUsers } = require('../controllers/user.controller')

router.get('/', (req, res) => {
    return res.status(200).json({
        status:'Success',
        statusCode: 200,
        message: 'Your Server is now Online...'
    })
})


router
    .route('/users')
    .get(
        passport.authenticate('jwt', {session: false}),
        listAllUsers
    )


router
    .route('/users/login')
    .post(
        passport.authenticate('local-login', { session: false }),
        login
    )


router
    .route('/users/signup')
    .post(
        passport.authenticate('local-signup', { session: false }),
        createUser 
    )
router
    .route('/users/seed')
    .get(
        (req, res, next)=>{
            const email = "admin@admin.com"
            const password = "password123"
            req.body = {email, password}
            next()
        },
        passport.authenticate('seed'),
        (req, res)=>res.json({message: "success"})
    )

router
    .route('/users/validate_token')
    .get(
        passport.authenticate('jwt', { session: false }),
        (req, res)=>{
            res.json({
                tokenStatus: "valid"
            })
        })

router
    .route('/users/logout')
    

router.route('/products')
    .get(
        listProducts
    )
    .post(
        passport.authenticate("jwt", { session: false }),
        createProduct
        )

router.route('/products/:id')
    .delete(
        passport.authenticate("jwt", { session: false }),
        deleteProduct
    )

router.route('/products/search')
    .get(searchProduct)

module.exports = router