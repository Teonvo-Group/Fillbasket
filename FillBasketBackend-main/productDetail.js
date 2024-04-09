const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Product_Detail = new mongoose.Schema(
    {
        productname: String,
        shopAdminId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ShopAdmin",

        },
        productdescr: String,
        productprice: Number,
        productquantity: Number,
        productcategory: String,
        productPhoto: String

    }, {
    collection: "ProductDetail",
}

);

mongoose.model("ProductDetail", Product_Detail);