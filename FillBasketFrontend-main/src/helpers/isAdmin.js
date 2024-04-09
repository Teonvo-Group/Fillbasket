import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class RequiredAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            loading: true
        };
    }

    componentDidMount() {
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
                this.setState({ userData: data.data, loading: false });
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
                this.setState({ loading: false });
            });
    }

    render() {
        const { children } = this.props;
        const { userData, loading } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        // Assuming auth object contains user admin status
        if (!userData || !userData.shop_admin) {
            return <Navigate to="/Shopr" />;
        } else {
            return children;
        }
    }
}

export default RequiredAdmin;
