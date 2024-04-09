import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";



const ShopSpecificDetail = () => {

    const { shopId } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/shopAdmin/${shopId}/products`);
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [shopId]);
    return (
        <div>
            <h1>Products added by this shop</h1>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        <p>Product Name: {product.productname}</p>
                        <p>Description: {product.productdescr}</p>
                        <p>Price: {product.productprice}</p>
                        <p>Category: {product.
                            productcategory
                        }</p>
                        <p>Quantity: {product.

                            productquantity

                        }</p>
                        <img src={`data:image/jpeg;base64,${product.

                            productPhoto
                            }`} className="img-fluid rounded-top" style={{ height: '80px', width: '80px' }} alt="" />
                    </li>
                ))}
            </ul>
        </div>


    )
}

export default ShopSpecificDetail