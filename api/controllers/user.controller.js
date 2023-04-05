const userModel = require("../db/models/users.model")
const { ErrorResponse } = require("../helpers/errorHandler")
let passport = require("passport");
const jwt  = require("jsonwebtoken");
let LocalStrategy = require("passport-local").Strategy;


exports.listAllUsers = async(req, res, next) => {
    try{
        userList = await userModel.find({})
        res.status(200).json(userList)
    }catch(err){
        console.log(err)
        next(new ErrorResponse(422, err.message, err))
    }
}

exports.getUser = (req, res, next) => {
    
}

exports.createUser = async(req, res, next) => {
    console.log(req.body)
    res.json(req.user)
}


exports.deleteUser = async(req, res, next) => {
    try{
        const {params} = req
        console.log(params)
        const result = await userModel.findByIdAndDelete(params.id)
        console.log(result)
        if(result) {
            res.status(200).json({
                message: "User Successfully deleted",
                ...result
            })
        }else{
            next(new ErrorResponse(404, "User not found"))
        }
    }catch(err){
        console.log(err)
        next(new ErrorResponse(400, err.message, err))
    }
}

exports.login = (req, res, next) => {
    // login
    console.log("hello")
    jwt.sign({user: req.user}, 'secretKey', {expiresIn: '1h'}, (err, token) => {
        if(err) {
            return res.json({
                message: "Failed to login",
                token: null,
            });
        }
        res.json({
            token
        });
    })
}