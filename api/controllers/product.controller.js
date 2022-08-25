    const productModel = require("../db/models/products.model")
    const { ErrorResponse } = require("../helpers/errorHandler")

exports.listProducts = async(req, res, next) => {
    try{
        productList = await productModel.find({})
        res.status(200).json(productList)
    }catch(err){
        console.log(err)
        next(new ErrorResponse(422, err.message, err))
    }
}

exports.createProduct = async(req, res, next) => {
    const {body} = req
    try{
        await productModel.create(body)
        res.status(200).json({
            message: "Product location saved",
        })
    }catch(err) {
        console.log(err)
        next(new ErrorResponse(422, err.message, err))
    }
}

exports.deleteProduct = async(req, res, next) => {
    try{
        const {params} = req
        const result = await productModel.findByIdAndDelete(params.id)
        console.log(result)
        if(result) {
            res.status(200).json({
                message: "Product Successfully deleted",
                ...result
            })
        }else{
            next(new ErrorResponse(404, "Product not found"))
        }
    }catch(err){
        console.log(err)
        next(new ErrorResponse(400, err.message, err))
    }
}

exports.searchProduct = async(req, res, next) => {
    try{
        const {query} = req
        const result = await productModel.find(
            {$or: [
                { name: {$regex: (query.keywords), $options: "i"}},
                { description: {$regex: (query.keywords), $options: "i"}},
                {category: {$regex: (query.keywords), $options: "i"}},
            ]},
        )
        res.status(200).json(result)
    }catch(err){
        console.log(err)
        next(new ErrorResponse(500, err.message, err))
    }
}