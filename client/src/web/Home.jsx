import { useState, useEffect, useContext } from "react";
import DirectoryList from "./DirectoryList";
import FeaturedList from "./FeaturedList";
import { VehicleContext } from "./Main";

export default function Home() {
	const {
		searchQuery,
		fetchVehicles,
		fetchFeaturedVehicles,
	} = useContext(VehicleContext);

	const [currentPage, setCurrentPage] = useState(0);
	const [filter, setFilter] = useState("all");

	useEffect(() => {
		fetchVehicles(currentPage, 6, searchQuery, filter);
	}, [fetchVehicles, searchQuery, currentPage, filter]);

	useEffect(() => {
		fetchFeaturedVehicles(0, 6, searchQuery);
	}, [fetchFeaturedVehicles, searchQuery]);

	return (
		<>
			{/* Featured Section */}
			<FeaturedList />

			{/* Car Lists */}
			<DirectoryList
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				filter={filter}
				setFilter={setFilter}
			/>
		</>
	);
}
