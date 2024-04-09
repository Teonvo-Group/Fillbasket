import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Shop_AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shop: null,
            loading: true,
            error: null,
            userData: "",
            productname: "",
            productprice: "",
            productcategory: "",
            productdescr: "",
            productPhoto: "",
            productquantity: "",
            products: [], // Initialize products as an empty array

        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.fetchUserData();
        this.fetchProductData(); // Call fetchProductData after fetching user data
    }
    componentDidMount() {
        // Fetch user data first
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
                this.setState({ userData: data.data }, () => {
                    // Once userData is fetched, fetch shop data
                    this.fetchShopData();
                });
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                this.setState({ error: 'Error fetching user data' });
            });
    }

    fetchShopData() {
        const { _id } = this.state.userData; // Accessing _id from userData
        fetch(`${process.env.REACT_APP_BACKEND_URL}/getshops/${_id}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Shop not found');
            })
            .then(data => {
                this.setState({
                    shop: data,
                    loading: false,
                    error: null
                }, () => {
                    // Call fetchProductData after setting shop data in the state
                    this.fetchProductData();
                });
            })
            .catch(error => {
                this.setState({
                    error: 'Error fetching shop: ' + error.message,
                    loading: false,
                    shop: null
                });
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("_id", this.state.shop._id)
        formData.append('productname', this.state.productname);
        formData.append('productprice', this.state.productprice);
        formData.append('productdescr', this.state.productdescr);
        formData.append('productcategory', this.state.productcategory);
        formData.append('productPhoto', this.state.productPhoto);
        formData.append('productquantity', this.state.productquantity);

        fetch(`${process.env.REACT_APP_BACKEND_URL}/create-product`, {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                toast.success("Product created successfully");
                window.location.reload();
                console.log(data);
                // Handle response as needed
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors as needed
            });


    }
    fetchProductData() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/gets-Product/admin/${this.state.shop._id}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Product not found');
            })
            .then(data => {
                this.setState({
                    products: data,
                    loading: false,
                    error: null
                });
            })
            .catch(error => {
                this.setState({
                    error: 'Error fetching product: ' + error.message,
                    loading: false,
                    products: [] // Ensure products is set to an empty array in case of error
                });
            });
    }
    handleDeleteProduct(productId) {


        fetch(`${process.env.REACT_APP_BACKEND_URL}/delete-product/${productId}/${this.state.shop._id}`, {
            method: "DELETE"
        })
            .then(response => {
                if (response.ok) {
                    toast.success("Product deleted successfully");
                    // Update the products list after successful deletion
                    this.fetchProductData();
                } else {
                    toast.error("Failed to delete product");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error("Failed to delete product");
            });
    }
    render() {
        const { shop, loading, error, products } = this.state;

        if (loading) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <p>{error}</p>;
        }

        return (
            
            <div>
            
        <meta charSet="utf-8" />
        <title>Ecommerce Website</title>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content name="keywords" />
        <meta content name="description" />
        {/* Google Web Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Raleway:wght@600;800&display=swap" rel="stylesheet" />
        {/* Icon Font Stylesheet */}
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />
        {/* Libraries Stylesheet */}
        <link href="lib/lightbox/css/lightbox.min.css" rel="stylesheet" />
        <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
        {/* Customized Bootstrap Stylesheet */}
        <link href="css/bootstrap.min.css" rel="stylesheet" />
        {/* Template Stylesheet */}
        <link href="css/style.css" rel="stylesheet" />
        {/* Spinner Start */}
        {/* <div id="spinner" className="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50  d-flex align-items-center justify-content-center">
      <div className="spinner-grow text-primary" role="status" />
    </div> */}
        {/* Spinner End */}
        {/* Navbar start */}
        <div className="container-fluid fixed-top">
          <div className="container topbar bg-primary d-none d-lg-block">
            <div className="d-flex justify-content-between">
              <div className="top-info ps-2">
                <small className="me-3"><i className="fas fa-map-marker-alt me-2 text-secondary" /> <a href className="text-white">smapleaddress, india</a></small>
                <small className="me-3"><i className="fas fa-envelope me-2 text-secondary" /><a href className="text-white">abc@gmail.com</a></small>
              </div>
              <div className="top-link pe-2">
                <a className="text-white"><small className="text-white mx-2">Privacy Policy</small>/</a>
                <a href className="text-white"><small className="text-white mx-2">Terms of Use</small>/</a>
                <a href className="text-white"><small className="text-white ms-2">Sales and Refunds</small></a>
              </div>
            </div>
          </div>
          <div className="container px-0">
            <nav className="navbar navbar-light bg-white navbar-expand-xl">
              <a href="/Home" className="navbar-brand"><h1 className="text-primary display-6">Fill Basket</h1></a>
              <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="fa fa-bars text-primary" />
              </button>
              <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                <div className="navbar-nav mx-auto">
                  {/* <a href="index.html" class="nav-item nav-link active">Home</a> */}
                  <a href="/Shopd" className="nav-item nav-link">Shops</a>
                  
                    <a href="/shop_admin_dashboard" className="nav-item nav-link">Shop Detail</a>                    
                  {/* <a href="cart.html" class="nav-item nav-link">Cart</a> */}
                  <a href="/contact" className="nav-item nav-link">Contact</a>
                </div>
                <div className="d-flex m-3 me-0">
                  <button className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fas fa-search text-primary" /></button>
                  <a href="/cart" className="position-relative me-4 my-auto">
                    <i className="fa fa-shopping-bag fa-2x" />
                    {/* <span class="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" style="top: -5px; left: 15px; height: 20px; min-width: 20px;">3</span> */}
                  </a>
                  <div class="dropdown">
                    <a href class="my-auto">
                      <i class="fas fa-user fa-2x"></i>
                    </a>
                    <div class="dropdown-content">
                      <h5>{this.state.userData.fname}</h5>
                      <h5>{this.state.userData.email}</h5>
                      <a href onClick={this.logOut}>Logout</a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
        {/* Navbar End */}
    <div className="container-fluid py-5 mb-5 hero-header">      
                <h2>{shop.Shopname}</h2>
                <p>Owner: {shop.ownername}</p>
                <p>Email: {shop.Email}</p>
                <p>GST No:{shop.GST_no}</p>
                <p>Contact No:{shop.cont_no}</p>
                <div className="row g-4">
                    <div className="col-lg-12">
                      <div className="row g-4">
                        <div className="col-md-6 col-lg-4 col-xl-3">
                <p>Aadhar Photo</p>
                <img src={`data:image/jpeg;base64,${shop.aadhar_photo}`} alt="Aadhar" style={{ height: "100px", width: "100px" }} />
                </div>
                <div className="col-md-6 col-lg-4 col-xl-3">
                <p>Shop Photo</p>
                <img src={`data:image/jpeg;base64,${shop.Shop_photo}`} alt="Shop" style={{ height: "100px", width: "100px" }} />
                </div>
                <div className="col-md-6 col-lg-4 col-xl-3">
                <p>Owner Photo</p>
                <img src={`data:image/jpeg;base64,${shop.owner_photo}`} alt="Owner" style={{ height: "100px", width: "100px" }} />
                </div>
                </div>
                </div>
                </div>
                <div className="form-content">
                    <header  style={{ color: '#d63384' }}>  Enter Your product Detail   </header>
                    <form onSubmit={this.handleSubmit}>
                        <div className="field input-field">
                            <input
                                type="text"
                                name='productname'
                                // value={user.email}
                                // onChange={handleChange}
                                placeholder="Product Name"
                                className="input"
                                required=" "
                                onChange={(e) => this.setState({ productname: e.target.value })}
                            />
                        </div>
                        <div className="field input-field">
                            <input
                                type="text"
                                name='productdescr'
                                // value={user.password}
                                // onChange={handleChange}
                                placeholder="Product Descr"
                                className="input"
                                required=" "
                                onChange={(e) => this.setState({ productdescr: e.target.value })}
                            />
                            {/* <i className="bx bx-hide eye-icon" /> */}
                        </div>
                        <div className="field input-field">
                            <input
                                type="number"
                                name='productprice'
                                // value={user.email}
                                // onChange={handleChange}
                                placeholder="Product Price"
                                className="input"
                                required=" "
                                onChange={(e) => this.setState({ productprice: e.target.value })}
                            />
                        </div>
                        <div className="field input-field">
                            <input
                                type="number"
                                name='productquantity'
                                // value={user.email}
                                // onChange={handleChange}
                                placeholder="Product Quantity"
                                className="input"
                                required=" "
                                onChange={(e) => this.setState({ productquantity: e.target.value })}
                            />
                        </div>
                        <div className="field input-field">
                            <input
                                type="file"
                                name='productPhoto'
                                // value={user.email}
                                // onChange={handleChange}
                                // placeholder="Enter your contact_no."
                                className="input"
                                required=" "
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        this.setState({ productPhoto: e.target.files[0] });
                                    }
                                }}
                            />
                        </div>
                        <div className="field input-field">
                            <label>Select Product Category:</label>
                            <div>
                                <select
                                    value={this.state.productcategory}
                                    onChange={(e) => this.setState({ productcategory: e.target.value })}
                                >
                                    <option value="Grocery">Grocery</option>
                                    <option value="Clothes">Clothes</option>
                                    <option value="Beauty">Beauty</option>
                                    <option value="Electronics">Electronics</option>
                                </select>
                            </div>
                        </div>



                        <div className="field button-field">
                            <button type='submit'>SUBMIT</button>
                        </div>
                    </form>

                    <div>Product Added</div>
                    <div className="row g-4">

                        {products.map(product => (
                            <div key={product._id}>
                                <div className="col-md-6 col-lg-4 col-xl-3">
                                    <div className="rounded position-relative fruite-item">
                                        <div className="fruite-img">
                                            <img src={`data:image/jpeg;base64,${product.productPhoto}`} className="img-fluid w-100 rounded-top" alt="" style={{ height: 100, width: 100 }} />
                                        </div>
                                        {/* <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">Fruits</div> */}
                                        <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                            <h4>{product.productname}</h4>
                                            <p>{product.productdescr}</p>
                                            <div className="d-flex justify-content-between flex-lg-wrap">
                                                <p className="text-dark fs-5 fw-bold mb-0">${[product.
                                                    productprice
                                                ]} / kg</p>
                                                <a href className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                            </div>
                                            <div className="d-flex justify-content-between flex-lg-wrap">
                                                <p className="text-dark fs-5 fw-bold mb-0">${product.productprice} / kg</p>
                                                {/* Delete button */}
                                                <button className="btn btn-danger" onClick={() => this.handleDeleteProduct(product._id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <ToastContainer />
                </div>
                {/* Footer Start */}
        <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
          <div className="container py-5">
            <div className="pb-4 mb-4" style={{ "border-bottom": "1px solid rgba(226, 175, 24, 0.5)" }}>
              <div className="row g-4">
                <div className="col-lg-3">
                  <a href>
                    <h1 className="text-primary mb-0">Fill Basket</h1>
                    <p className="text-secondary mb-0">Touch in with your local shops</p>
                  </a>
                </div>
                <div className="col-lg-6">
                  <div className="position-relative mx-auto">
                    <input className="form-control border-0 w-100 py-3 px-4 rounded-pill" type="number" placeholder="Your Email" />
                    <button type="submit" className="btn btn-primary border-0 border-secondary py-3 px-4 position-absolute rounded-pill text-white" style={{ "top": "0", "right": "0" }}>Subscribe Now</button>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="d-flex justify-content-end pt-3">
                    <a className="btn  btn-outline-secondary me-2 btn-md-square rounded-circle" href><i className="fab fa-twitter" /></a>
                    <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href><i className="fab fa-facebook-f" /></a>
                    <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href><i className="fab fa-youtube" /></a>
                    <a className="btn btn-outline-secondary btn-md-square rounded-circle" href="https://www.linkedin.com/in/yogesh-narayan-85b68223b/"><i className="fab fa-linkedin-in" /></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row g-5">
              <div className="col-lg-3 col-md-6">
                <div className="footer-item">
                  <h4 className="text-light mb-3">Why People Like us!</h4>
                  <p className="mb-4">typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the like Aldus PageMaker including of Lorem Ipsum.</p>
                  <a href className="btn border-secondary py-2 px-4 rounded-pill text-primary">Read More</a>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="d-flex flex-column text-start footer-item">
                  <h4 className="text-light mb-3">Shop Info</h4>
                  <a className="btn-link" href>About Us</a>
                  <a className="btn-link" href>Contact Us</a>
                  <a className="btn-link" href>Privacy Policy</a>
                  <a className="btn-link" href>Terms &amp; Condition</a>
                  <a className="btn-link" href>Return Policy</a>
                  <a className="btn-link" href>FAQs &amp; Help</a>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="d-flex flex-column text-start footer-item">
                  <h4 className="text-light mb-3">Account</h4>
                  <a className="btn-link" href>My Account</a>
                  <a className="btn-link" href>Shop details</a>
                  <a className="btn-link" href>Shopping Cart</a>
                  <a className="btn-link" href>Wishlist</a>
                  <a className="btn-link" href>Order History</a>
                  <a className="btn-link" href>International Orders</a>
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
            </div>
        );
    }
}

export default Shop_AdminDashboard;
