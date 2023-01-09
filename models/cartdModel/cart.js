const Schema = require("../Schema");
const axios = require("axios");


const cartList = async (Data, callback) => {

  const carts = await Schema.cartsModel.find();
  let res = {
    Status: true,
    StatusCode: 200,
    message: "Data available",
    data: carts
  };
  callback(null, res);
};

const addCart = async (Data, callback) => {
  await axios.get('http://15.206.157.204:8080/product/'+Data.productId)
    .then(async function (response) {
      // handle success
      console.log(response);

      const cartAdd = await new Schema.cartsModel({
        productId: Data.productId,
        price: response.data.response.price,
        weight_in_grams: response.data.response.weight_in_grams,
        discount_percentage: response.data.response.discount_percentage
      });
      await cartAdd.save();
      let res = {
        Status: true,
        StatusCode: 200,
        message: "Cart Added Sucessfullly",
        data: []
      };
      callback(null, res);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(async function () {
      // always executed
    });
};

const deletecart = async (Data, callback) => {
  await Schema.cartsModel.remove();
  let res = {
    Status: true,
    StatusCode: 200,
    message: "Data available",
    data: "Cart Sucessfully deleted"
  };
  callback(null, res);
};

const checkoutValue = async (Data, callback) => {

  await axios.get('http://15.206.157.204:8080/warehouse/distance?postal_code='+Data.shipping_postal_code)
  .then(async function (response) {
    // handle success
    console.log(response);
  
    const carts = await Schema.cartsModel.find();
    console.log(carts)
    // console.log(carts.reduce((n, price, discount_percentage) =>  n + (price - (price * (3/100))), 0))
    console.log(carts.map(item => (item.price - (item.price * (item.discount_percentage/100)))).reduce((prev, next) => prev + next));
    const sum = carts.map(item => (item.price - (item.price * (item.discount_percentage/100)))).reduce((prev, next) => prev + next)
    const weight= carts.map(item => item.weight_in_grams).reduce((prev, next) => prev + next)
    console.log(sum)
    const charge = await getShippingAmount(weight/1000,response. data.distance_in_kilometers)
    let data = {
      "postal_code" : Data.shipping_postal_code,
      "total_amount" : Math.round(sum),
      "distance_in_kilometers": response.data.distance_in_kilometers,
      "weight" : weight/1000,
      "shipping_charge" : charge ? charge.amount : 0,
      "currency" : "doller"
    }
    
    let res = {
      Status: true,
      StatusCode: 200,
      message: "Data available",
      data: data
    };
    callback(null, res);
    // callback(null, res);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
};


const getShippingAmount = async(weight, distance) => {

  console.log(weight, distance)
const Json = [
  {
    "weightFrom" : 0.1,
    "weightTo": 2,
    "distanceFrom": 1,
    "distanceTo": 5,
    "amount": 12
  },
  {
    "weightFrom" : 0.1,
    "weightTo": 2,
    "distanceFrom": 5,
    "distanceTo": 20,
    "amount": 15
  },
  {
    "weightFrom" : 0.1,
    "weightTo": 2,
    "distanceFrom": 20,
    "distanceTo": 50,
    "amount": 20
  },
  {
    "weightFrom" : 0.1,
    "weightTo": 2,
    "distanceFrom": 50,
    "distanceTo": 500,
    "amount": 50
  },
  {
    "weightFrom" : 0.1,
    "weightTo": 2,
    "distanceFrom": 500,
    "distanceTo": 800,
    "amount": 100
  },
  {
    "weightFrom" : 2.01,
    "weightTo": 5,
    "distanceFrom": 800,
    "distanceTo": 800000000,
    "amount": 220
  },
  {
    "weightFrom" : 2.01,
    "weightTo": 5,
    "distanceFrom": 1,
    "distanceTo": 5,
    "amount": 14
  },
  {
    "weightFrom" : 2.01,
    "weightTo": 5,
    "distanceFrom": 5,
    "distanceTo": 20,
    "amount": 18
  },
  {
    "weightFrom" : 2.01,
    "weightTo": 5,
    "distanceFrom": 20,
    "distanceTo": 50,
    "amount": 24
  },
  {
    "weightFrom" : 2.01,
    "weightTo": 5,
    "distanceFrom": 50,
    "distanceTo": 500,
    "amount": 55
  },
  {
    "weightFrom" : 2.01,
    "weightTo": 5,
    "distanceFrom": 500,
    "distanceTo": 800,
    "amount": 110
  },
  {
    "weightFrom" : 2.01,
    "weightTo": 5,
    "distanceFrom": 800,
    "distanceTo": 800000000,
    "amount": 250
  },
  {
    "weightFrom" : 5.01,
    "weightTo": 20,
    "distanceFrom": 1,
    "distanceTo": 5,
    "amount": 16
  },
  {
    "weightFrom" : 5.01,
    "weightTo": 20,
    "distanceFrom": 5,
    "distanceTo": 20,
    "amount": 25
  },
  {
    "weightFrom" : 5.01,
    "weightTo": 20,
    "distanceFrom": 20,
    "distanceTo": 50,
    "amount": 30
  },
  {
    "weightFrom" : 5.01,
    "weightTo": 20,
    "distanceFrom": 50,
    "distanceTo": 500,
    "amount": 80
  },
  {
    "weightFrom" : 5.01,
    "weightTo": 20,
    "distanceFrom": 500,
    "distanceTo": 800,
    "amount": 130
  },
  {
    "weightFrom" : 5.01,
    "weightTo": 20,
    "distanceFrom": 800,
    "distanceTo": 800000000,
    "amount": 270
  },
  {
    "weightFrom" : 20.01,
    "weightTo": 20000000,
    "distanceFrom": 1,
    "distanceTo": 5,
    "amount": 21
  },
  {
    "weightFrom" : 20.01,
    "weightTo": 20000000,
    "distanceFrom": 5,
    "distanceTo": 20,
    "amount": 35
  },
  {
    "weightFrom" : 20.01,
    "weightTo": 20000000,
    "distanceFrom": 20,
    "distanceTo": 50,
    "amount": 50
  },
  {
    "weightFrom" : 20.01,
    "weightTo": 20000000,
    "distanceFrom": 50,
    "distanceTo": 500,
    "amount": 90
  },
  {
    "weightFrom" : 20.01,
    "weightTo": 20000000,
    "distanceFrom": 500,
    "distanceTo": 800,
    "amount": 150
  },
  {
    "weightFrom" : 20.01,
    "weightTo": 20000000,
    "distanceFrom": 800,
    "distanceTo": 800000000,
    "amount": 300
  }
]
  const amount = Json.find(item=> item.weightFrom < weight && item.weightTo > weight && item.distanceFrom < distance && item.distanceTo > distance)
  console.log(amount)
  return amount;
}


module.exports = {
  cartList,
  addCart,
  deletecart,
  checkoutValue
};