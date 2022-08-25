const router = require('express').Router()

const { createProduct, listProducts, deleteProduct, searchProduct } = require('../controllers/product.controller')

router.get('/', (req, res) => {
    return res.status(200).json({
        status:'Success',
        statusCode: 200,
        message: 'Your Server is now Online...'
    })
})

router
    .route('/users')
    .get()
    .post()
    .put()
    .delete()

router
    .route('/login')
    .post()

router
    .route('/logout')

router.route('/products')
    .get(listProducts)
    .post(createProduct)

router.route('/products/:id')
    .delete(deleteProduct)

router.route('/products/search')
    .get(searchProduct)

module.exports = router