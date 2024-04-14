import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequiredAdmin from '../helpers/isAdmin';
export default function Cart() {
  const [cartData, setCartData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);


  const [cartTotal, setCartTotal] = useState(0);

  const fetchUserData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/userData`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        console.log(data.data?._id, "data id");
        setUserData(data.data);
        // You cannot use setState in functional components, so you should setCartData instead
        // setCartData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }

  const fetchCartData = () => {
    const userId = userData?._id
    fetch(`${process.env.REACT_APP_BACKEND_URL}/get-cart/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to fetch cart data');
        }
      })
      .then((data) => {
        console.log("Cart Data:", data);
        setCartData(data); // Update cart data state
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  };

  const handleDeleteProduct = (productId) => {
    // Send a request to delete the product from the cart
    fetch(`${process.env.REACT_APP_BACKEND_URL}/delete-product/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    })
      .then((res) => {
        if (res.ok) {
          // If deletion is successful, fetch the updated cart data
          fetchCartData();
        } else {
          throw new Error('Failed to delete product from cart');
        }
      })
      .catch((error) => {
        console.error("Error deleting product from cart:", error);
      });
  };


  useEffect(() => {
    fetchUserData(); // Fetch user data on component mount
  }, []);
  useEffect(() => {
    if (userData) {
      fetchCartData(); // Fetch cart data only when userData is available
    }
  }, [userData]);


  // Render loading state while waiting for data
  const handleQuantityChange = (productId, newQuantity) => {
    // Find the product in the cart data and update its quantity
    const updatedCartData = cartData.products.map(product => {
      if (product._id === productId) {
        if(newQuantity>=0){
        return {
          ...product,
          quantity: newQuantity
        };
      }
      }
      return product;
    });
    setCartData({ ...cartData, products: updatedCartData });
  };

  const calculateTotalPrice = (productPrice, quantity) => {
    return productPrice * quantity;
  };
  useEffect(() => {
    // Calculate total price when cartData changes
    if (cartData && cartData.products) {
      const totalPrice = cartData.products.reduce((total, product) => {
        return total + (product.productId.productprice * product.quantity);
      }, 0);

      // Add flat rate shipping price
      const totalWithShipping = totalPrice + 3.00; // Assuming flat rate is $3.00
      setCartTotal(totalWithShipping);
    }
  }, [cartData]);

  const handlePaymentSuccess = (details, data) => {
    // Make a POST request to store payment details and product details
    fetch(`${process.env.REACT_APP_BACKEND_URL}/process-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paypalPaymentId: details.id, products: cartData.products }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Payment processed successfully:', data.payment);
        window.location.reload();
        toast.success("Payment Successfully");
        deleteProductsFromCart(data.payment.products);
        setPaymentCompleted(true);

      })
      .catch(error => {
        console.error('Error processing payment:', error);
      });
  };

  const deleteProductsFromCart = (products) => {
    products.forEach(product => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/delete-product/${product._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      })
        .then((res) => {
          if (res.ok) {
            // If deletion is successful, do something
            console.log('Product deleted successfully:', product.productId);
          } else {
            throw new Error('Failed to delete product from cart');
          }
        })
        .catch((error) => {
          console.error("Error deleting product from cart:", error);
        });
    });
  };

  return (
    <>
      <meta charSet="utf-8" />
      <title>cart</title>
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <meta content="" name="keywords" />
      <meta content="" name="description" />
      {/* Google Web Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Raleway:wght@600;800&display=swap"
        rel="stylesheet"
      />
      {/* Icon Font Stylesheet */}
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
        rel="stylesheet"
      />
      {/* Libraries Stylesheet */}
      <link href="lib/lightbox/css/lightbox.min.css" rel="stylesheet" />
      <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
      {/* Customized Bootstrap Stylesheet */}
      <link href="css/bootstrap.min.css" rel="stylesheet" />
      {/* Template Stylesheet */}
      <link href="css/style.css" rel="stylesheet" />
      {/* Spinner Start */}
      {/* <div
    id="spinner"
    className="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50  d-flex align-items-center justify-content-center"
  >
    <div className="spinner-grow text-primary" role="status" />
  </div> */}
      {/* Spinner End */}
      {/* Navbar start */}
      <div className="container-fluid fixed-top">

        <div className="container px-0">
          <nav className="navbar navbar-light bg-white navbar-expand-xl">
            <a href="/Home" className="navbar-brand">
              <h1 className="text-primary display-6">Fill Basket</h1>
            </a>
            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="fa fa-bars text-primary" />
            </button>
            <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
              <div className="navbar-nav mx-auto">
                <a href="/" className="nav-item nav-link">
                  Home
                </a>
                <a href="/Shopd" className="nav-item nav-link">
                  Shop
                </a>
                {RequiredAdmin ?
                  (<a href="/shop_admin_dashboard" className="nav-item nav-link">Shop Detail</a>) : (
                    <a href="/Shopr" className="nav-item nav-link">Shop Detail</a>
                  )}
                <a href="/cart" className="nav-item nav-link">
                  Cart
                </a>
                <a href="/contact" className="nav-item nav-link">
                  Contact
                </a>
              </div>
              <div className="d-flex m-3 me-0">
                <button
                  className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4"
                  data-bs-toggle="modal"
                  data-bs-target="#searchModal"
                >
                  <i className="fas fa-search text-primary" />
                </button>
                <a href="#" className="position-relative me-4 my-auto">
                  <i className="fa fa-shopping-bag fa-2x" />
                  <span
                    className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                    style={{ top: "-5px", left: 15, height: 20, minWidth: 20 }}
                  >
                    3
                  </span>
                </a>
                <a href="#" className="my-auto">
                  <i className="fas fa-user fa-2x" />
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* Navbar End */}
      {/* Modal Search Start */}
      <div
        className="modal fade"
        id="searchModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Search by keyword
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body d-flex align-items-center">
              <div className="input-group w-75 mx-auto d-flex">
                <input
                  type="search"
                  className="form-control p-3"
                  placeholder="keywords"
                  aria-describedby="search-icon-1"
                />
                <span id="search-icon-1" className="input-group-text p-3">
                  <i className="fa fa-search" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Search End */}
      {/* Single Page Header start */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Cart</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li>
          <li className="breadcrumb-item active text-white">Cart</li>
        </ol>
      </div>
      {/* Single Page Header End */}
      {/* Cart Page Start */}
      <PayPalScriptProvider options={{ 'client-id': process.env.REACT_APP_PAYPAL_CLIENTID }}>
        <div className="container-fluid py-5">

          <div className="container py-5">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Products</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                {cartData ? (
                  <tbody>
                    {cartData.products.map(product => (


                      <tr key={product._id}>

                        <th scope="row">
                          <div className="d-flex align-items-center">
                            <img
                              src={`data:image/jpeg;base64,${product.productId.productPhoto}`}
                              className="img-fluid me-5 rounded-circle"
                              style={{ width: 80, height: 80 }}
                              alt=""
                            />
                          </div>
                        </th>
                        <td>
                          <p className="mb-0 mt-4"> {product.productId.productname}</p>
                        </td>
                        <td>
                          <p className="mb-0 mt-4">{product.productId.productprice} $</p>
                        </td>
                        <td>
                          <div className="input-group quantity mt-4" style={{ width: 100 }}>
                            <button
                              className="btn btn-sm btn-minus rounded-circle bg-light border"
                              onClick={() => handleQuantityChange(product._id,product.quantity - 1)}
                            >
                              <i className="fa fa-minus" />
                            </button>


                            <input
                              type="text"
                              className="form-control form-control-sm text-center border-0"
                              value={product.quantity}
                              readOnly
                            />
                            <button
                              className="btn btn-sm btn-plus rounded-circle bg-light border"
                              onClick={() => handleQuantityChange(product._id, product.quantity + 1)}
                            >
                              <i className="fa fa-plus" />
                            </button>
                          </div>
                          {product.quantity > product.productId.productquantity && <div className="alert alert-danger" role="alert">This much quantity not available</div>}
                        </td>
                        <td>
                          <p className="mb-0 mt-4">
                            {calculateTotalPrice(product.productId.productprice, product.quantity)} $
                          </p>
                        </td>
                        <td>
                          <button className="btn btn-md rounded-circle bg-light border mt-4" onClick={() => handleDeleteProduct(product._id)}>
                            <i className="fa fa-times text-danger" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <p>No items in cart</p>
                )}
              </table>
            </div>
            <div className="mt-5">
              <input
                type="text"
                className="border-0 border-bottom rounded me-5 py-3 mb-4 p-2"
                placeholder="Coupon Code"
              />
              <button
                className="btn border-secondary rounded-pill px-4 py-3 text-primary"
                type="button"
              >
                Apply Coupon
              </button>
            </div>
            <div className="row g-4 justify-content-end">
              <div className="col-8" />
              <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                <div className="bg-light rounded">
                  <div className="p-4">
                    <h1 className="display-6 mb-4">
                      Cart <span className="fw-normal">Total</span>
                    </h1>
                    <div className="d-flex justify-content-between mb-4">
                      <h5 className="mb-0 me-4">Subtotal:</h5>
                      <p className="mb-0">${cartTotal.toFixed(2)}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <h5 className="mb-0 me-4">Shipping</h5>
                      <div className="">
                        <p className="mb-0">Flat rate: $3.00</p>
                      </div>
                    </div>
                    <p className="mb-0 text-end">Shipping to Ukraine.</p>
                  </div>
                  <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                    <h5 className="mb-0 ps-4 me-4">Total</h5>
                    <p className="mb-0 pe-4">${cartTotal.toFixed(2)}</p>
                  </div>

                  {/* PayPal buttons */}
                  {cartTotal && (
                    <PayPalButtons
                      style={{ layout: 'horizontal' }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [{
                            amount: {
                              value: cartTotal.toFixed(2), // Use cartTotal here
                              currency_code: 'USD',
                            },
                          }],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order.capture().then(details => {
                          handlePaymentSuccess(details, cartData); // Handle successful payment
                        });
                      }}
                    />
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </PayPalScriptProvider>

      {/* Cart Page End */}
      {/* Footer Start */}
      <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
        <div className="container py-5">
          <div
            className="pb-4 mb-4"
            style={{ borderBottom: "1px solid rgba(226, 175, 24, 0.5)" }}
          >
            <div className="row g-4">
              <div className="col-lg-3">
                <a href="#">
                  <h1 className="text-primary mb-0">Fruitables</h1>
                  <p className="text-secondary mb-0">Fresh products</p>
                </a>
              </div>
              <div className="col-lg-6">
                <div className="position-relative mx-auto">
                  <input
                    className="form-control border-0 w-100 py-3 px-4 rounded-pill"
                    type="number"
                    placeholder="Your Email"
                  />
                  <button
                    type="submit"
                    className="btn btn-primary border-0 border-secondary py-3 px-4 position-absolute rounded-pill text-white"
                    style={{ top: 0, right: 0 }}
                  >
                    Subscribe Now
                  </button>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="d-flex justify-content-end pt-3">
                  <a
                    className="btn  btn-outline-secondary me-2 btn-md-square rounded-circle"
                    href=""
                  >
                    <i className="fab fa-twitter" />
                  </a>
                  <a
                    className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                    href=""
                  >
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a
                    className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                    href=""
                  >
                    <i className="fab fa-youtube" />
                  </a>
                  <a
                    className="btn btn-outline-secondary btn-md-square rounded-circle"
                    href=""
                  >
                    <i className="fab fa-linkedin-in" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-light mb-3">Why People Like us!</h4>
                <p className="mb-4">
                  typesetting, remaining essentially unchanged. It was popularised
                  in the 1960s with the like Aldus PageMaker including of Lorem
                  Ipsum.
                </p>
                <a
                  href=""
                  className="btn border-secondary py-2 px-4 rounded-pill text-primary"
                >
                  Read More
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="text-light mb-3">Shop Info</h4>
                <a className="btn-link" href="">
                  About Us
                </a>
                <a className="btn-link" href="">
                  Contact Us
                </a>
                <a className="btn-link" href="">
                  Privacy Policy
                </a>
                <a className="btn-link" href="">
                  Terms &amp; Condition
                </a>
                <a className="btn-link" href="">
                  Return Policy
                </a>
                <a className="btn-link" href="">
                  FAQs &amp; Help
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="text-light mb-3">Account</h4>
                <a className="btn-link" href="">
                  My Account
                </a>
                <a className="btn-link" href="">
                  Shop details
                </a>
                <a className="btn-link" href="">
                  Shopping Cart
                </a>
                <a className="btn-link" href="">
                  Wishlist
                </a>
                <a className="btn-link" href="">
                  Order History
                </a>
                <a className="btn-link" href="">
                  International Orders
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-light mb-3">Contact</h4>
                <p>Address: 1429 Netus Rd, NY 48247</p>
                <p>Email: Example@gmail.com</p>
                <p>Phone: +0123 4567 8910</p>
                <p>Payment Accepted</p>
                <img src="img/payment.png" className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}
      {/* Copyright Start */}
      <div className="container-fluid copyright bg-dark py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <span className="text-light">
                <a href="#">
                  <i className="fas fa-copyright text-light me-2" />
                  FillBasket
                </a>
                , All right reserved.
              </span>
            </div>
            
          </div>
        </div>
      </div>
      {/* Copyright End */}
      {/* Back to Top */}
      <a
        href="#"
        className="btn btn-primary border-3 border-primary rounded-circle back-to-top"
      >
        <i className="fa fa-arrow-up" />
      </a>
      {/* JavaScript Libraries */}
      {/* Template Javascript */}
      <ToastContainer />
    </>

  )
}
