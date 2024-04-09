const mongoose = require("mongoose");
require("../userDetails")
const userDetails = mongoose.model("UserInfo");
const jwt = require("jsonwebtoken");

const adminMiddleware = async (req, res, next) => {
    try {
        const { token } = req.body;
        console.log(token);
        const JWT_SECRET = process.env.JWT_SECRET
        const users = jwt.verify(token, JWT_SECRET);

        const user = await userDetails.findById(users._id);
        if (user.shop_admin !== true) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access"
            });

        }
        else {
            console.log("success");
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middleware"
        })
    }
};

module.exports = adminMiddleware;
