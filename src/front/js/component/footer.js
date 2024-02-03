import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<p>
			Made by Fede:
			<a href="https://github.com/fede1525" style={{ marginLeft: "8px" }}>
				<FontAwesomeIcon icon={faGithub} size="lg" />
			</a>
		</p>
	</footer>
);
