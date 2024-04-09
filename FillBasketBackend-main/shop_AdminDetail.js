const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const shop_AdminDetail = new mongoose.Schema(
    {
        Shopname: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userInfo",
            unique: true
        },
        ownername: String,
        Email: String,
        GST_no: String,
        cont_no: String,
        aadhar_photo: String,
        Shop_photo: String,
        owner_photo: String
    }, {
    collection: "ShopAdmin",
}

);

mongoose.model("ShopAdmin", shop_AdminDetail);