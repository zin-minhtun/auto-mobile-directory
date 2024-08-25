import { useState, useCallback, useEffect, useContext } from "react";
import { SkeletonCard } from "./SkeletonCard";
import { Link } from "react-router-dom";
import { VehicleContext } from "./Main";
import PaginationButtons from "./PaginationButtons";
import VehicleDetailDrawer from "./VehicleDetailDrawer";

export default function AllFeaturedCars() {
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

	const { searchQuery, dispatch, featuredVehicles, fetchFeaturedVehicles } =
		useContext(VehicleContext);
	const vehicles = featuredVehicles.data;
	const isLoading = featuredVehicles.loading;
	const totalPages = featuredVehicles.totalPages;
	const isPageChanged = featuredVehicles.pageChanged;

	const [currentPage, setCurrentPage] = useState(0);
	const [drawerOpen, setDrawerOpen] = useState(false); // Drawer open state
	const [selectedVehicle, setSelectedVehicle] = useState(null); // Selected vehicle

	const handlePageChanged = useCallback(
		(status) => {
			dispatch({ type: "CHANGE_FEATURED_VEHICLES_PAGE", payload: status });
		},
		[dispatch]
	);

	// Reset to the first page when the search query changes
    useEffect(() => {
        setCurrentPage(0);
    }, [searchQuery]);

	useEffect(() => {
		fetchFeaturedVehicles(currentPage, 6, searchQuery);
	}, [fetchFeaturedVehicles, currentPage, searchQuery]);

	// Scroll effect when page changes
	useEffect(() => {
		if (isPageChanged) {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});

			handlePageChanged(false); // Reset pageChanged after scroll
		}
	}, [isPageChanged, handlePageChanged]);

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
				{!isLoading && vehicles.length === 0 ? (
					<div className="col-span-full text-center py-8 text-gray-500">
						<p>No vehicles found.</p>
					</div>
				) : (
					vehicles.map((vehicle, index) => (
						<div
							key={vehicle?._id || index}
							className="relative rounded-lg overflow-hidden cursor-pointer"
						>
							{isLoading || !vehicle ? (
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
				setPageChanged={handlePageChanged}
			/>

			<VehicleDetailDrawer
				drawerOpen={drawerOpen}
				setDrawerOpen={setDrawerOpen}
				selectedVehicle={selectedVehicle}
			/>
		</>
	);
}
