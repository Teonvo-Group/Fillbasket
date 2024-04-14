const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors({
    origin : 'fillbasket-vdly.vercel.app',
    methods : ["GET" ,  "POST"],
    credentials : true
}));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require('multer');
require("dotenv").config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const Payment_Detail = require('../paymentDetail');
const JWT_SECRET = process.env.JWT_SECRET

const mongoUrl = process.env.DB_URI


mongoose.connect(mongoUrl, {
    useNewUrlParser: true
})
    .then(() => {
        console.log("connected to database");
    })
    .catch((e) => console.log(e));

require("../userDetails")
require("../shop_AdminDetail");
require("../productDetail")
require("../cartDetail");
const User = mongoose.model("UserInfo");
const Shop = mongoose.model("ShopAdmin");
const Product_Detail = mongoose.model("ProductDetail")
const Cart_Detail = mongoose.model("Cart")


app.get("/", (req, res) => res.send("Fill Basket Backend is running"));
app.post("/register", async (req, res) => {
    const { fname, lname, email, password } = req.body;

    const encryptedpassword = await bcrypt.hash(password, 10);
    try {
        const OldUser = await User.findOne({ email });
        if (OldUser) {
            return res.send({ error: "User Exists" });
        }
        await User.create({
            fname,
            lname,
            email,
            password: encryptedpassword,
        });
        res.send({ status: "ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
})

app.post("/login-user", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: "User not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET);

        if (res.status(201)) {
            return res.json({ status: "ok", data: token });
        } else {
            return res.json({ error: "error" });
        }
    }
    res.json({ status: "error", error: "Invalid password" })
});

app.post("/userData", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        console.log(user);
        const useremail = user.email;
        User.findOne({ email: useremail }).then((data) => {
            res.send({ status: "ok", data: data });
        })
            .catch((error) => {
                res.send({ status: "error", data: error });
            });
    } catch (error) { }
});

app.post('/shop-register', upload.fields([
    { name: 'aadhar_photo', maxCount: 1 },
    { name: 'Shop_photo', maxCount: 1 },
    { name: 'owner_photo', maxCount: 1 }
]), async (req, res) => {
    const { _id, Shopname, ownername, Email, GST_no, cont_no } = req.body;
    const aadharPhoto = req.files['aadhar_photo'][0].buffer.toString('base64');
    const ShopPhoto = req.files['Shop_photo'][0].buffer.toString('base64');
    const ownerPhoto = req.files['owner_photo'][0].buffer.toString('base64');


    try {
        // Create a new shop document
        const newShop = new Shop({
            userId: _id,
            Shopname,
            ownername,
            Email,
            GST_no,
            cont_no,
            aadhar_photo: aadharPhoto,
            Shop_photo: ShopPhoto,
            owner_photo: ownerPhoto
        });

        // Save the shop document to the database
        const savedShop = await newShop.save();

        await User.findByIdAndUpdate(_id, { $set: { shop_admin: true } });
        res.status(200).json({ message: 'Shop registration successful', shop: savedShop });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error saving shop registration details' });
    }
});


app.get('/getshops/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const shop = await Shop.findOne({ userId });
        if (!shop) {
            return res.status(404).json({ error: 'Shop not found for this userId' });
        }
        res.json(shop);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching shop data' });
    }
});

app.post('/create-product', upload.single('productPhoto'), async (req, res) => {
    const { _id, productname, productdescr, productprice, productcategory, productquantity } = req.body;
    const productPhoto = req.file.buffer.toString('base64');

    try {
        // Create a new shop document
        const newProduct = new Product_Detail({
            shopAdminId: _id,
            productname,
            productcategory,
            productprice,
            productdescr,
            productPhoto,
            productquantity
        });

        // Save the shop document to the database
        const savedProduct = await newProduct.save();


        res.status(200).json({ message: 'Product added successfully', Product_Detail: savedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error saving product details' });
    }
});

app.get('/gets-Product', async (req, res) => {
    try {
        const products = await Product_Detail.find();

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching Product data' });
    }
});
app.get('/gets-Product/admin/:shopAdminId', async (req, res) => {
    try {
        const shopAdminId = req.params.shopAdminId;

        const products = await Product_Detail.find({ shopAdminId: shopAdminId });

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching Product data' });
    }
});

// Backend code

app.delete('/delete-product/:productId/:shopAdminId', async (req, res) => {
    const productId = req.params.productId;
    const shopAdminId = req.params.shopAdminId; // Assuming userId is sent in the request body after authentication

    try {
        // Find the product by productId
        const product = await Product_Detail.findById(productId);

        // Check if product exists
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Check if the authenticated user is the shop admin who owns the product
        if (product.shopAdminId.toString() !== shopAdminId) {
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        // Delete the product
        const deletedProduct = await Product_Detail.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Return success message
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting product' });
    }
});
app.post('/add-to-cart', async (req, res) => {
    const { productId, token } = req.body;

    try {
        // Authenticate user
        const user = jwt.verify(token, JWT_SECRET);
        const userData = await User.findOne({ email: user.email });

        // Check if user exists
        if (!userData) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if user already has a cart, if not, create a new cart
        let userCart = await Cart_Detail.findOne({ userId: userData._id });
        if (!userCart) {
            userCart = await Cart_Detail.create({ userId: userData._id });
        }

        // Add product to cart
        userCart.products.push({ productId });
        await userCart.save();

        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding product to cart' });
    }
});

// Inside your Express app setup

// Endpoint to fetch user's cart data
app.get('/get-cart/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const userCart = await Cart_Detail.findOne({ userId }).populate('products.productId');
        if (!userCart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.status(200).json(userCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching cart data' });
    }
});
app.delete('/delete-product/:productId', async (req, res) => {
    const productId = req.params.productId;

    console.log("Product Id", productId)
    try {
        // Find the user's cart and remove the product
        const updatedCart = await Cart_Detail.findOneAndUpdate(
            { "products._id": productId },
            { $pull: { products: { _id: productId } } },
            { new: true }
        ).populate('products.productId');

        if (!updatedCart) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }

        res.status(200).json(updatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting product from cart' });
    }
});


app.post('/process-payment', async (req, res) => {
    try {
        const { paypalPaymentId, products } = req.body;

        // Create a new payment document
        const payment = new Payment_Detail({
            paypalPaymentId,
            products,

        });

        // Save the payment document to the database
        await payment.save();

        res.status(201).json({ message: 'Payment processed successfully', payment });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get("/api/shopAdmin", async (req, res) => {
    try {
        const shopAdmins = await Shop.find();
        res.json(shopAdmins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


// Update your Express.js server
app.get("/api/shopAdmin/:shopId/products", async (req, res) => {
    try {
        const products = await Product_Detail.find({ shopAdminId: req.params.shopId });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

app.listen(9000, () => {
    console.log("server started");
});
