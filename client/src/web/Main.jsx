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
	featuredVehicles: {
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
					...state.allVehicles,
					loading: false,
					totalPages: action.payload.totalPages,
					data: action.payload.vehicles,
				},
			};

		case "FETCH_FEATURED_VEHICLES_COMPLETED":
			return {
				...state,
				featuredVehicles: {
					...state.featuredVehicles,
					loading: false,
					totalPages: action.payload.totalPages,
					data: action.payload.vehicles,
				},
			};

		case "CHANGE_VEHICLES_PAGE":
			return {
				...state,
				allVehicles: {
					...state.allVehicles,
					pageChanged: action.payload,
				},
			};

		case "CHANGE_FEATURED_VEHICLES_PAGE":
			return {
				...state,
				featuredVehicles: {
					...state.featuredVehicles,
					pageChanged: action.payload,
				},
			};

		default:
			return state;
	}
};

export default function Main() {
	const [searchQuery, setSearchQuery] = useState("");
	const [vehicles, dispatch] = useReducer(reducer, initVehicleState);

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
		try {
			const response = await axiosInstance.get(
				"/api/vehicles/featured-vehicles",
				{
					params: { page: page + 1, limit, search },
				}
			);
			dispatch({
				type: "FETCH_FEATURED_VEHICLES_COMPLETED",
				payload: response.data,
			});
		} catch (error) {
			console.error("Error fetching vehicles:", error);
		}
	}, []);

	return (
		<div className="bg-gray-50 flex flex-col min-h-screen">
			{/* Navigation */}
			<Navigation />
			{/* Banner */}
			<Banner searchQuery={searchQuery} handleSearch={setSearchQuery} />

			{/* Main Content */}
			<VehicleContext.Provider
				value={{
					searchQuery,
					dispatch,
					allVehicles: vehicles.allVehicles,
					featuredVehicles: vehicles.featuredVehicles,
					fetchVehicles,
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
