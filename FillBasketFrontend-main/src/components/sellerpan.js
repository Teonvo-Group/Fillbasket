import React, { Component } from 'react'

export default class shopreg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Shopname: "",
      ownnername: "",
      GST_no: "",
      cont_no: "",
      aadhar_photo: "",
      Shop_photo: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/login-user`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      })
    }).then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          alert("Login Succesful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);

          window.location.href = "./Home"
        }
      });
  }
  render() {
    return (
      <div>
        <>
          <meta charSet="utf-8" />
          <title>Seller Pannel</title>
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
            <div className="container topbar bg-primary d-none d-lg-block">
              <div className="d-flex justify-content-between">
                <div className="top-info ps-2">
                  <small className="me-3">
                    <i className="fas fa-map-marker-alt me-2 text-secondary" />{" "}
                    <a href="#" className="text-white">
                      Sampleaddress, India
                    </a>
                  </small>
                  <small className="me-3">
                    <i className="fas fa-envelope me-2 text-secondary" />
                    <a href="#" className="text-white">
                      abc@gmail.com
                    </a>
                  </small>
                </div>
                <div className="top-link pe-2">
                  <a href="#" className="text-white">
                    <small className="text-white mx-2">Privacy Policy</small>/
                  </a>
                  <a href="#" className="text-white">
                    <small className="text-white mx-2">Terms of Use</small>/
                  </a>
                  <a href="#" className="text-white">
                    <small className="text-white ms-2">Sales and Refunds</small>
                  </a>
                </div>
              </div>
            </div>
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

                    <a href="/Shopd" className="nav-item nav-link">
                      Shop
                    </a>
                    <a href="shop-detail.html" className="nav-item nav-link active">
                      Shop Detail
                    </a>

                    <a href="contact.html" className="nav-item nav-link">
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
            <h1 className="text-center text-white display-6">Sell Your Product</h1>
            {/* <ol className="breadcrumb justify-content-center mb-0">
      <li className="breadcrumb-item">
        <a href="#">Home</a>
      </li>
      <li className="breadcrumb-item">
        <a href="#">Pages</a>
      </li>
      <li className="breadcrumb-item active text-white">Shop Details</li>
    </ol> */}
          </div>
          {/* Single Page Header End */}
          <div>
            <section className="containerr forms">
              <div className="form login">
                <div className="form-content">
                  <header>  Enter Product Details   </header>
                  <form onSubmit={this.handleSubmit}>
                    <div className="field input-field">
                      <input
                        type="text"
                        name='Product Name'
                        // value={user.email}
                        // onChange={handleChange}
                        placeholder="Product Name"
                        className="input"
                        required=" "
                        onChange={(e) => this.setState({ ProductName: e.target.value })}
                      />
                    </div>
                    <div className="field input-field">
                      <input
                        type="text"
                        name='ownnername'
                        // value={user.password}
                        // onChange={handleChange}
                        placeholder="Category"
                        className="input"
                        required=" "
                        onChange={(e) => this.setState({ Category: e.target.value })}
                      />
                      {/* <i className="bx bx-hide eye-icon" /> */}
                    </div>
                    <div className="field input-field">
                      <input
                        type="text"
                        name='GST_no'
                        // value={user.email}
                        // onChange={handleChange}
                        placeholder="Price"
                        className="input"
                        required=" "
                        onChange={(e) => this.setState({ GST_no: e.target.value })}
                      />
                    </div>
                    <div className="field input-field">
                      <input
                        type="text"
                        name='cont_no'
                        // value={user.email}
                        // onChange={handleChange}
                        placeholder="Quantity"
                        className="input"
                        required=" "
                        onChange={(e) => this.setState({ cont_no: e.target.value })}
                      />
                    </div>
                    <div className="field input-field">

                      <input
                        type="file"
                        name='aadhar_photo'
                        // value={user.email}
                        // onChange={handleChange}
                        placeholder="Upload Product Image"
                        className="input"
                        required=" "
                        onChange={(e) => this.setState({ aadhar_photo: e.target.value })}
                      />
                    </div>
                    {/* <div className="field input-field">
              <input
                type="file"
                name='Shop_photo'
                // value={user.email}
                // onChange={handleChange}
                // placeholder="Enter your contact_no."
                className="input"
                required=" "
                onChange={(e)=>this.setState({Shop_photo: e.target.value})}
              />
            </div> */}
                    <div className="field button-field">
                      <button type='submit'>SUBMIT</button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
            {/* JavaScript */}
          </div>
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

          {/* Back to Top */}
          <a
            href="#"
            className="btn btn-primary border-3 border-primary rounded-circle back-to-top"
          >
            <i className="fa fa-arrow-up" />
          </a>
          {/* JavaScript Libraries */}
          {/* Template Javascript */}
        </>

      </div>
    )
  }
}
