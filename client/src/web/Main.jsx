import { createContext, useState, useReducer, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Banner from "./Banner";
import Navigation from "./Navigation";
import axiosInstance from "../api/axios";
import Footer from "./Footer";

export const VehicleContext = createContext();

const initVehicleState = {
	allVehicles: {
		loading: true,
		totalPages: 1,
		pageChanged: false,
		data: Array(6).fill(null),
	},
};

const reducer = (state, action) => {
	switch (action.type) {
		case "FETCH_VEHICLES_COMPLETED":
			return {
				...state,
				allVehicles: {
					loading: false,
					totalPages: action.payload.totalPages,
					pageChanged: false,
					data: action.payload.vehicles,
				},
			};
		
		case "CHANGE_PAGE":
			return {
				...state,
				allVehicles: {
					...state.allVehicles,
					pageChanged: action.payload,
				},
			};

		default:
			return state;
	}
};

export default function Main() {
	const [loading, setLoading] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [totalPages, setTotalPages] = useState(1);

	const [vehicles, dispatch] = useReducer(reducer, initVehicleState);
	const [featuredVehicles, setFeaturedVehicles] = useState(Array(6).fill(null)); // Initialize with placeholders

	const fetchVehicles = useCallback(async (page, limit, search, filter) => {
		try {
			const response = await axiosInstance.get("/api/vehicles", {
				params: { page: page + 1, limit, search, filter },
			});
			dispatch({
				type: "FETCH_VEHICLES_COMPLETED",
				payload: response.data,
			});
		} catch (error) {
			console.error("Error fetching vehicles:", error);
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
			<VehicleContext.Provider
				value={{
					searchQuery,
					loading,
					setLoading,
					totalPages,
					setTotalPages,
					dispatch,
					allVehicles: vehicles.allVehicles,
					fetchVehicles,
					featuredVehicles,
					fetchFeaturedVehicles,
				}}
			>
				<Outlet />
			</VehicleContext.Provider>

			{/* Footer */}
			<Footer />
		</div>
	);
}
