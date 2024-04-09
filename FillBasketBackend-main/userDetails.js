const mongoose = require("mongoose");
const UserDetailsSchema = new mongoose.Schema(
    {
        fname: String,
        lname: String,
        email: { type: String, unique: true },
        password: String,
        shop_admin: {
            type: Boolean,
            default: false
        },
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart'
        }
    },

    {
        collection: "UserInfo",
    }
);

mongoose.model("UserInfo", UserDetailsSchema);