import { useState, useEffect, useContext } from "react";
import { SkeletonCard } from "./SkeletonCard";
import { Link } from "react-router-dom";
import { SearchContext } from "./Main";
import PaginationButtons from "./PaginationButtons";
import VehicleDetailDrawer from "./VehicleDetailDrawer";

export default function AllFeaturedCars() {
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

	const {
		loading,
		searchQuery,
		totalPages,
		featuredVehicles,
		fetchFeaturedVehicles,
	} = useContext(SearchContext);

	const [currentPage, setCurrentPage] = useState(0);
	const [pageChanged, setPageChanged] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false); // Drawer open state
	const [selectedVehicle, setSelectedVehicle] = useState(null); // Selected vehicle

	useEffect(() => {
		fetchFeaturedVehicles(currentPage, 6, searchQuery);
	}, [fetchFeaturedVehicles, currentPage, searchQuery]);

	// Scroll effect when page changes
	useEffect(() => {
		if (pageChanged) {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});

			setPageChanged(false);
		}
	}, [pageChanged, setPageChanged]);

	// Handle card click
	const handleCardClick = (vehicle) => {
		setSelectedVehicle(vehicle);
		setDrawerOpen(true);
	};

	return (
		<>
			<div className="flex flex-row justify-between mt-5 mb-2 px-4">
				<p className="text-gray-800 text-xl font-semibold">All Featured Cars</p>
				<div className="text-gray-600 font-semibold text-sm py-1 underline">
					<Link to="/">Back</Link>
				</div>
			</div>
			<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 px-2 sm:px-4">
				{!loading && featuredVehicles.length === 0 ? (
					<div className="col-span-full text-center py-8 text-gray-500">
						<p>No vehicles found.</p>
					</div>
				) : (
					featuredVehicles.map((vehicle, index) => (
						<div
							key={vehicle?._id || index}
							className="relative rounded-lg overflow-hidden cursor-pointer"
						>
							{loading || !vehicle ? (
								<SkeletonCard />
							) : (
								<div onClick={() => handleCardClick(vehicle)}>
									{vehicle.isSold ? (
										<div className="absolute top-0 left-0 bg-red-500 text-gray-100 text-sm font-medium px-2 py-1 rounded-tl-md rounded-br-md">
											Sold Out
										</div>
									) : (
										<div className="absolute top-0 left-0 bg-green-500 text-gray-100 text-sm font-medium px-2 py-1 rounded-tl-md rounded-br-md">
											For Sale
										</div>
									)}
									<img
										src={`${apiBaseUrl}/${vehicle.image}`}
										alt={`${vehicle.make}`}
										className="w-full h-48 object-cover"
									/>
									<div className="p-3 h-20 text-gray-100 bg-gray-700">
										<div className="flex justify-between items-center mb-1">
											<p className="text-base text-gray-100">
												{`${vehicle.make}${vehicle.model}`.length > 12
													? `${vehicle.make} ${vehicle.model}`.substring(
															0,
															12
													  ) + "..."
													: `${vehicle.make} ${vehicle.model}`}
											</p>
											<p className="bg-gray-100 text-sm text-gray-900 px-1 font-medium rounded-md focus:outline-none">
												{vehicle.year}
											</p>
										</div>
										<div className="flex justify-between items-center">
											<p className="text-gray-100 text-xl font-bold tracking-wide">
												${vehicle.price}
											</p>
											<p className="text-gray-300 text-sm">
												{`${vehicle.color}`.length > 10
													? `${vehicle.color}`.substring(0, 10) + "..."
													: `${vehicle.color}`}
											</p>
										</div>
									</div>
								</div>
							)}
						</div>
					))
				)}
			</div>

			<PaginationButtons
				currentPage={currentPage}
				totalPages={totalPages}
				setCurrentPage={setCurrentPage}
				setPageChanged={setPageChanged}
			/>

			<VehicleDetailDrawer
				drawerOpen={drawerOpen}
				setDrawerOpen={setDrawerOpen}
				selectedVehicle={selectedVehicle}
			/>
		</>
	);
}
