// import React from "react";

export default function Footer() {
	return (
		<footer className="bg-gray-800 text-gray-100 py-6 mt-auto">
			<div className="max-w-screen-xl mx-auto px-4">
				<div className="flex flex-col sm:flex-row justify-between items-center">
					<p className="text-sm mb-4 sm:mb-0">
						© {new Date().getFullYear()} Vehicle Directory. All rights reserved.
					</p>
					<div className="flex space-x-4">
						<a href="#" className="text-sm text-gray-400 hover:text-gray-100">
							Privacy Policy
						</a>
						<a href="#" className="text-sm text-gray-400 hover:text-gray-100">
							Terms of Service
						</a>
						<a href="#" className="text-sm text-gray-400 hover:text-gray-100">
							Contact Us
						</a>
					</div>
				</div>
				<div className="flex justify-center mt-4 space-x-4">
					<a href="#" className="text-gray-400 hover:text-gray-100">
						<i className="fab fa-facebook-f"></i>
					</a>
					<a href="#" className="text-gray-400 hover:text-gray-100">
						<i className="fab fa-twitter"></i>
					</a>
					<a href="#" className="text-gray-400 hover:text-gray-100">
						<i className="fab fa-instagram"></i>
					</a>
				</div>
			</div>
		</footer>
	);
}
