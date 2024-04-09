import React, { useState, useEffect } from "react";
import axios from "axios";
import RequiredAdmin from "../helpers/isAdmin";
import { useNavigate } from "react-router-dom";

const Shopdetail = () => {

    const [shopAdmins, setShopAdmins] = useState([]);

    const navigate = useNavigate();
    const [selectedShopId, setSelectedShopId] = useState(null);

    const handleShowMore = (shopId) => {
        setSelectedShopId(shopId);
        navigate(`/specificShopDetail/${shopId}`);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/shopAdmin`);
                setShopAdmins(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            <>
                <meta charSet="utf-8" />
                <title>shop-detail</title>
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
                                    {RequiredAdmin ?
                                        (<a href="/shop_admin_dashboard" className="nav-item nav-link">Shop Detail</a>) : (
                                            <a href="/Shopr" className="nav-item nav-link">Shop Detail</a>
                                        )}
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




                    <div className="container-fluid py-5 mb-5 hero-header">
                        <h1>Shop Admins</h1>
                        <ul>
                            {shopAdmins.map((admin) => (
                                <li key={admin._id}>
                                    <p>Shop Name: {admin.Shopname}</p>
                                    <p>Owner Name: {admin.ownername}</p>
                                    <p>Email: {admin.Email}</p>
                                    <p>
                                        GST_no
                                        : {admin.
                                            GST_no
                                        }</p>
                                    <p>

                                        cont_no
                                        : {admin.

                                            cont_no
                                        }</p>
                                    <img src={`data:image/jpeg;base64,${admin.
                                        Shop_photo
                                        }`} className="img-fluid rounded-top" style={{ height: '80px', width: '80px' }} alt="" />
                                    {/* Add other fields here */}
                                    <button onClick={() => handleShowMore(admin._id)}>Show More</button>
                                </li>
                            ))}
                        </ul>
                    </div>
            </>
        </div>
    )
}

export default Shopdetail;
