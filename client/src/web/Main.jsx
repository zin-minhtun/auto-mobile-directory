import { createContext, useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Banner from "./Banner";
import Navigation from "./Navigation";
import axiosInstance from "../api/axios";
import Footer from "./Footer";

export const SearchContext = createContext();

export default function Main() {
	const [loading, setLoading] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [totalPages, setTotalPages] = useState(1);

	const [vehicles, setVehicles] = useState(Array(6).fill(null)); // Initialize with placeholders
	const [featuredVehicles, setFeaturedVehicles] = useState(Array(6).fill(null)); // Initialize with placeholders

	const fetchVehicles = useCallback(async (page, limit, search, filter) => {
		setLoading(true);
		try {
			const response = await axiosInstance.get("/api/vehicles", {
				params: { page: page + 1, limit, search, filter },
			});
			setVehicles(response.data.vehicles);
			setTotalPages(response.data.totalPages);
		} catch (error) {
			console.error("Error fetching vehicles:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	const fetchFeaturedVehicles = useCallback(async (page, limit, search) => {
		setLoading(true);
		try {
			const response = await axiosInstance.get(
				"/api/vehicles/featured-vehicles",
				{
					params: { page: page + 1, limit, search },
				}
			);
			setFeaturedVehicles(response.data.vehicles);
			setTotalPages(response.data.totalPages);
		} catch (error) {
			console.error("Error fetching vehicles:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	return (
		<div className="bg-gray-50 flex flex-col min-h-screen">
			{/* Navigation */}
			<Navigation />
			{/* Banner */}
			<Banner handleSearch={setSearchQuery} />

			{/* Main Content */}
			<SearchContext.Provider
				value={{
					searchQuery,
					loading,
					setLoading,
					totalPages,
					setTotalPages,
					vehicles,
					fetchVehicles,
					featuredVehicles,
					fetchFeaturedVehicles,
				}}
			>
				<Outlet />
			</SearchContext.Provider>

			{/* Footer */}
			<Footer />
		</div>
	);
}
