const async = require('async')
const cartdModel = require("../../models/cartdModel/cart")


// This function will be change for watterfall and error handling 
const cartList = (req, res) => { 
    try {
        async.series([
            (callback) => {
                cartdModel.cartList(req.body,callback);
            }
        ], (err, result) => {
            if (err) {
                console.log(err)
                res.status(err.StatusCode).send(err)
            } else {
                res.send(result[0])
            }
        })
    } catch (error) {
        res.send(500, { Status: false, message: "Something went to wrong", 'error': error })
    }
}

const addCart = (req, res) => { 
    try {
        async.series([
            (callback) => {
                cartdModel.addCart(req.body, callback);
            }
        ], (err, result) => {
            if (err) {
                console.log(err)
                res.status(err.StatusCode).send(err)
            } else {
                res.send(result[0])
            }
        })
    } catch (error) {
        res.send(500, { Status: false, message: "Something went to wrong", 'error': error })
    }
}

const deletecart = (req, res) => { 
    try {
        async.series([
            (callback) => {
                cartdModel.deletecart(req.params,callback);
            }
        ], (err, result) => {
            if (err) {
                console.log(err)
                res.status(err.StatusCode).send(err)
            } else {
                res.send(result[0])
            }
        })
    } catch (error) {
        res.send(500, { Status: false, message: "Something went to wrong", 'error': error })
    }
}

const checkoutValue = (req, res) => { 
    try {
        async.series([
            (callback) => {
                cartdModel.checkoutValue(req.params,callback);
            }
        ], (err, result) => {
            if (err) {
                console.log(err)
                res.status(err.StatusCode).send(err)
            } else {
                res.send(result[0])
            }
        })
    } catch (error) {
        res.send(500, { Status: false, message: "Something went to wrong", 'error': error })
    }
}

module.exports = {
    cartList: cartList,
    addCart: addCart,
    deletecart: deletecart,
    checkoutValue: checkoutValue
}