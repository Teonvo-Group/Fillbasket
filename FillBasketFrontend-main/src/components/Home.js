import React, { Component } from 'react';
import RequiredAdmin from '../helpers/isAdmin';
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: "",
      products: [], // Initialize products as an empty array
      loading: true,
      error: null,
      selectedCategory: 'All Products' // Initialize selectedCategory state
    };

    this.handleCategoryChange = this.handleCategoryChange.bind(this);

  }

  componentDidMount() {
    this.fetchUserData();
    this.fetchProductData();
  }

  fetchUserData() {
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
    }).then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
      });
  }

  fetchProductData() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/gets-Product`)
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

  handleCategoryChange(category) {
    this.setState({ selectedCategory: category });
  }

  handleAddToCart = (productId) => {
    const token = window.localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BACKEND_URL}/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        productId,
        token
      })
    }).then((res) => {
      if (res.ok) {
        // Handle success (e.g., show a confirmation message)
        console.log("Product added to cart successfully");
      } else {
        // Handle error
        console.error("Failed to add product to cart");
      }
    }).catch((error) => {
      console.error("Error adding product to cart:", error);
    });
  }


  logOut = () => {
    window.localStorage.clear();
    window.location.href = "./"
  }


  render() {

    const { products, selectedCategory, loading, error } = this.state;

    const filteredProducts = selectedCategory === 'All Products' ? products : products.filter(product => product.productcategory === selectedCategory);
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
          
          <div className="container px-0">
            <nav className="navbar navbar-light bg-white navbar-expand-xl">
              <a href="/Home" className="navbar-brand"><h1 className="text-primary display-6">Fill Basket</h1></a>
              <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="fa fa-bars text-primary" />
              </button>
              <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                <div className="navbar-nav mx-auto">
                  <a href="/" className="nav-item nav-link">Home</a>
                  {/* <a href="index.html" class="nav-item nav-link active">Home</a> */}
                  <a href="/Shop" className="nav-item nav-link">Shops</a>
                  {RequiredAdmin ?
                    (<a href="/shop_admin_dashboard" className="nav-item nav-link">Shop Detail</a>) : (
                      <a href="/Shopd" className="nav-item nav-link">Shop Detail</a>
                    )}
                  {/* <a href="cart.html" class="nav-item nav-link">Cart</a> */}
                  <a href="/contact" className="nav-item nav-link">Contact</a>
                </div>
                <div className="d-flex m-3 me-0">
                  {/* <button className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fas fa-search text-primary" /></button> */}
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
        {/* Modal Search Start */}
        {/* <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content rounded-0">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body d-flex align-items-center">
                <div className="input-group w-75 mx-auto d-flex">
                  <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                  <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* Modal Search End */}
        {/* Hero Start */}
        <div className="container-fluid py-5 mb-5 hero-header">
          <div className="container py-5">
            <div className="row g-5 align-items-center">
              <div className="col-md-12 col-lg-7">
                <h4 className="mb-3 text-secondary">Discover local shops online</h4>
                <h1 className="mb-5 display-3 text-primary">Local gems, just a click away!</h1>
                {/* <div className="position-relative mx-auto">
                  <input className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill" type="" placeholder="Search" />
                  <button type="submit" className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100" style={{ "top": "0", "right": "25%" }}>Search Now</button>
                </div> */}
              </div>
              <div className="col-md-12 col-lg-5 ">
                <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                  <div className="carousel-inner" role="listbox">
                    <div className="carousel-item active rounded">
                      <img src="img/hero-img-1.png" className="img-fluid w-100 h-100 bg-secondary rounded" alt="First slide" />
                      {/* <a href className="btn px-4 py-2 text-white rounded">Groceries</a> */}
                    </div>
                     <div className="carousel-item rounded">
                      <img src="images/blog-3.jpg" className="img-fluid w-100 h-100 rounded" alt="Second slide" />
                      <a href className="btn px-4 py-2 text-white rounded">Clothes</a>
                    </div>
                    <div className="carousel-item rounded">
                      <img src="images/electronics-banner-1.jpg" className="img-fluid w-100 h-100 rounded" alt="Third slide" />
                      <a href className="btn px-4 py-2 text-white rounded">Electronics</a>
                    </div>
                    <div className="carousel-item rounded">
                      <img src="images/bueatyproduct.jpeg" className="img-fluid w-100 h-100 rounded" alt="Fourth slide" />
                      <a href className="btn px-4 py-2 text-white rounded">Bueaty</a>
                    </div>
                    <div className="carousel-item rounded">
                      <img src="images/returantfood.jpeg" className="img-fluid w-100 h-100 rounded" alt="Fivth slide" />
                      <a href className="btn px-4 py-2 text-white rounded">Restaurant</a>
                    </div> 
                  </div>
                 {/*  <button className="carousel-control-prev" type="button" data-bs-target="carouselId" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="carouselId" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Hero End */}
        {/* Featurs Section Start */}
        <div className="container-fluid featurs py-5">
          <div className="container py-5">
            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="featurs-item text-center rounded bg-light p-4">
                  <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                    <i className="fas fa-car-side fa-3x text-white" />
                  </div>
                  <div className="featurs-content text-center">
                    <h5>Free Shipping</h5>
                    <p className="mb-0">Free on order over 300</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="featurs-item text-center rounded bg-light p-4">
                  <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                    <i className="fas fa-user-shield fa-3x text-white" />
                  </div>
                  <div className="featurs-content text-center">
                    <h5>Security Payment</h5>
                    <p className="mb-0">100% security payment</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="featurs-item text-center rounded bg-light p-4">
                  <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                    <i className="fas fa-exchange-alt fa-3x text-white" />
                  </div>
                  <div className="featurs-content text-center">
                    <h5>30 Day Return</h5>
                    <p className="mb-0">30 day money guarantee</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="featurs-item text-center rounded bg-light p-4">
                  <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                    <i className="fa fa-phone-alt fa-3x text-white" />
                  </div>
                  <div className="featurs-content text-center">
                    <h5>24/7 Support</h5>
                    <p className="mb-0">Support every time fast</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Featurs Section End */}
        {/* Fruits Shop Start*/}
        <div className="container-fluid fruite py-5">
          <div className="container py-5">
            <div className="tab-class text-center">
              <div className="row g-4">
                <div className="col-lg-4 text-start">
                  <h1>Shop Products</h1>
                </div>
                <div className="col-lg-8 text-end">
                  <ul className="nav nav-pills d-inline-flex text-center mb-5">
                    <li className="nav-item">
                      <a className={`d-flex m-2 py-2 bg-light rounded-pill ${selectedCategory === 'All Products' ? 'active' : ''}`} onClick={() => this.handleCategoryChange('All Products')}>
                        <span className="text-dark" style={{ "width": "130px" }}>All Products</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`d-flex py-2 m-2 bg-light rounded-pill ${selectedCategory === 'Groceries' ? 'active' : ''}`} onClick={() => this.handleCategoryChange('Groceries')}>
                        <span className="text-dark" style={{ "width": "130px" }}>Groceries</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`d-flex m-2 py-2 bg-light rounded-pill ${selectedCategory === 'Clothes' ? 'active' : ''}`} onClick={() => this.handleCategoryChange('Clothes')}>
                        <span className="text-dark" style={{ "width": "130px" }}>Clothes</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`d-flex m-2 py-2 bg-light rounded-pill ${selectedCategory === 'Beauty' ? 'active' : ''}`} onClick={() => this.handleCategoryChange('Beauty')}>
                        <span className="text-dark" style={{ "width": "130px" }}>Beauty</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={`d-flex m-2 py-2 bg-light rounded-pill ${selectedCategory === 'Electronics' ? 'active' : ''}`} onClick={() => this.handleCategoryChange('Electronics')}>
                        <span className="text-dark" style={{ "width": "130px" }}>Electronics</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="tab-content">
                <div id="tab-1" className="tab-pane fade show p-0 active">
                  <div className="row g-4">
                    <div className="col-lg-12">
                      <div className="row g-4">


                        {filteredProducts.map(product => (

                          <div key={product._id} className="col-md-6 col-lg-4 col-xl-3">
                            <div className="rounded position-relative fruite-item">
                              <div className="fruite-img">
                                <img src={`data:image/jpeg;base64,${product.productPhoto}`} className="img-fluid w-100 rounded-top" alt="" />
                              </div>
                              {/* <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">Fruits</div> */}
                              <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                <h4>{product.productname}</h4>
                                <p>{product.productdescr}</p>
                                <p>{product.productcategory}</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                  <p className="text-dark fs-5 fw-bold mb-0">₹{[product.productprice]} / kg</p>
                                  <a onClick={() => this.handleAddToCart(product._id)} href className="btn border border-secondary rounded-pill px-3 text-primary">
                                    <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>

                        ))}




                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Fruits Shop End*/}
        {/* Featurs Start */}
        <div className="container-fluid service py-5">
          <div className="container py-5">
            <div className="row g-4 justify-content-center">
              <div className="col-md-6 col-lg-4">
                <a href>
                  <div className="service-item bg-secondary rounded border border-secondary">
                    <img src="img/featur-1.jpg" className="img-fluid rounded-top w-100" alt="" />
                    <div className="px-4 rounded-bottom">
                      <div className="service-content bg-primary text-center p-4 rounded">
                        <h5 className="text-white">Fresh Apples</h5>
                        <h3 className="mb-0">20% OFF</h3>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-md-6 col-lg-4">
                <a href>
                  <div className="service-item bg-dark rounded border border-dark">
                    <img src="images/blog-3.jpg" className="img-fluid rounded-top w-100" alt="" />
                    <div className="px-4 rounded-bottom">
                      <div className="service-content bg-light text-center p-4 rounded">
                        <h5 className="text-primary">Clothes</h5>
                        <h3 className="mb-0">50-60% OFF</h3>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-md-6 col-lg-4">
                <a href>
                  <div className="service-item bg-primary rounded border border-primary">
                    <img src="images/electronics-banner-1.jpg" className="img-fluid rounded-top w-100" alt="" />
                    <div className="px-4 rounded-bottom">
                      <div className="service-content bg-secondary text-center p-4 rounded">
                        <h5 className="text-white">Electronics</h5>
                        <h3 className="mb-0">Discount ₹99</h3>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              
              <div className="col-md-6 col-lg-4">
                <a href>
                  <div className="service-item bg-dark rounded border border-dark">
                    <img src="images/bueatyproduct.jpeg" className="img-fluid rounded-top w-100" alt="" />
                    <div className="px-4 rounded-bottom">
                      <div className="service-content bg-light text-center p-4 rounded">
                        <h5 className="text-primary">Beauty Products</h5>
                        <h3 className="mb-0">Free delivery</h3>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-md-6 col-lg-4">
                <a href>
                  <div className="service-item bg-dark rounded border border-dark">
                    <img src="images/returantfood.jpeg" className="img-fluid rounded-top w-100" alt="" />
                    <div className="px-4 rounded-bottom">
                      <div className="service-content bg-light text-center p-4 rounded">
                        <h5 className="text-primary">Restaurant </h5>
                        <h3 className="mb-0">Starter from 499</h3>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Featurs End */}

        {/* Banner Section Start*/}
        <div className="container-fluid banner bg-secondary my-5">
          <div className="container py-5">
            <div className="row g-4 align-items-center">
              <div className="col-lg-6">
                <div className="py-4">
                  <h1 className="display-3 text-white">Fresh Exotic Fruits</h1>
                  <p className="fw-normal display-3 text-dark mb-4">in Our Store</p>
                  {/* <p className="mb-4 text-dark">The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic words etc.</p> */}
                  <a href className="banner-btn btn border-2 border-white rounded-pill text-dark py-3 px-5">BUY</a>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="position-relative">
                  <img src="img/baner-1.png" className="img-fluid w-100 rounded" alt="" />
                  <div className="d-flex align-items-center justify-content-center bg-white rounded-circle position-absolute" style={{ "width": "140px", "height": "140px", "top": "0", "left": "0" }}>
                    <h1 style={{ "font-size": "100px" }}>1</h1>
                    <div className="d-flex flex-column">
                      <span className="h2 mb-0">₹100</span>
                      <span className="h4 text-muted mb-0">kg</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Banner Section End */}
        {/* Bestsaler Product Start */}
        <div className="container-fluid py-5">
          <div className="container py-5">
            <div className="text-center mx-auto mb-5" style={{ "max-width": "700px" }}>
              <h1 className="display-4">Bestseller Products</h1>
              {/* <p>Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.</p> */}
            </div>
            <div className="row g-4">
              <div className="col-lg-12">
                <div className="row g-4">
                  {filteredProducts.map(product => (
                    <div key={product._id} className="col-md-6 col-lg-4 col-xl-3">
                      <div className="p-4 rounded bg-light">
                        <div className="row align-items-center">
                          <div className="col-6">
                            <img src={`data:image/jpeg;base64,${product.productPhoto}`} className="img-fluid rounded-circle w-100" alt="" />
                          </div>
                          <div className="col-6">
                            <a href className="h5">{product.productname}</a>
                            <div className="d-flex my-3">
                              <i className="fas fa-star text-primary" />
                              <i className="fas fa-star text-primary" />
                              <i className="fas fa-star text-primary" />
                              <i className="fas fa-star text-primary" />
                              <i className="fas fa-star" />
                            </div>
                            <h4 className="mb-3">₹{[product.productprice]}</h4>
                            <a onClick={() => this.handleAddToCart(product._id)} href className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                          </div>
                        </div>
                      </div>
                    </div>

                  ))}

                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bestsaler Product End */}
        {/* Fact Start */}
        <div className="container-fluid py-5">
          <div className="container">
            <div className="bg-light p-5 rounded">
              <div className="row g-4 justify-content-center">
                <div className="col-md-6 col-lg-6 col-xl-3">
                  <div className="counter bg-white rounded p-5">
                    <i className="fa fa-users text-secondary" />
                    <h4>satisfied customers</h4>
                    <h1>1963</h1>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-3">
                  <div className="counter bg-white rounded p-5">
                    <i className="fa fa-users text-secondary" />
                    <h4>Quality of service</h4>
                    <h1>99%</h1>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-3">
                  <div className="counter bg-white rounded p-5">
                    <i className="fa fa-users text-secondary" />
                    <h4>quality certificates</h4>
                    <h1>33</h1>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-3">
                  <div className="counter bg-white rounded p-5">
                    <i className="fa fa-users text-secondary" />
                    <h4>Available Shops</h4>
                    <h1>789</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Fact Start */}

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
                    <input className="form-control border-0 w-100 py-3 px-4 rounded-pill" type="email" placeholder="Your Email" required />
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
        {/* Copyright Start */}
        <div className="container-fluid copyright bg-dark py-4">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                {/* <span className="text-light"><a href><i className="fas fa-copyright text-light me-2" />Your Site Name</a>, All right reserved.</span> */}
              </div>
              <div className="col-md-6 my-auto text-center text-md-end text-white">
              </div>
            </div>
          </div>
        </div>
        {/* Copyright End */}
        {/* Back to Top */}
        <a
          href='#'
          className="btn btn-primary border-3 border-primary rounded-circle back-to-top"
        >
          <i className="fa fa-arrow-up" />
        </a>
        {/* JavaScript Libraries */}
        {/* Template Javascript */}
      </div>
    )
  }
}      
