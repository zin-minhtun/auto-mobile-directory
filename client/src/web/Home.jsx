import { useState, useEffect, useContext } from "react";
import DirectoryList from "./DirectoryList";
import FeaturedList from "./FeaturedList";
import { SearchContext } from "./Main";

export default function Home() {
	const {
		loading,
		totalPages,
		searchQuery,
		vehicles,
		fetchVehicles,
		featuredVehicles,
		fetchFeaturedVehicles,
	} = useContext(SearchContext);

	const [currentPage, setCurrentPage] = useState(0);
	const [pageChanged, setPageChanged] = useState(false); // New state to track page change
	const [filter, setFilter] = useState("all");

	useEffect(() => {
		fetchFeaturedVehicles(0, 6, searchQuery);
	}, [fetchFeaturedVehicles, pageChanged, searchQuery]);

	useEffect(() => {
		fetchVehicles(currentPage, 6, searchQuery, filter);
	}, [fetchVehicles, searchQuery, currentPage, pageChanged, filter]);

	return (
		<>
			{/* Featured Section */}
			<FeaturedList
				loading={loading}
				currentPage={currentPage}
				pageChanged={pageChanged}
				featuredVehicles={featuredVehicles}
				fetchFeaturedVehicles={fetchFeaturedVehicles}
			/>
			{/* Car Lists */}
			<DirectoryList
				loading={loading}
				currentPage={currentPage}
				totalPages={totalPages}
				setCurrentPage={setCurrentPage}
				pageChanged={pageChanged}
				setPageChanged={setPageChanged}
				filter={filter}
				setFilter={setFilter}
				searchQuery={searchQuery}
				vehicles={vehicles}
				fetchVehicles={fetchVehicles}
			/>
		</>
	);
}
