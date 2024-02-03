import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate();

	const userLogout = () => {
		sessionStorage.removeItem("token");
		navigate("/");
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<button className="btn btn-primary" onClick={userLogout}>Log out</button>
			</div>
		</nav>
	);
};
