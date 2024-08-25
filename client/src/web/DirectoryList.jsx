import { useState, useEffect, useCallback, useContext, useRef } from "react";
import { SkeletonCard } from "./SkeletonCard";
import PaginationButtons from "./PaginationButtons";
import VehicleDetailDrawer from "./VehicleDetailDrawer";
import { VehicleContext } from "./Main";
// import PaginationButtons from "./PaginationButtons";

export default function DirectoryList({
	currentPage,
	setCurrentPage,
	filter,
	setFilter,
}) {
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
	const cardRef = useRef(null);

	const { allVehicles, dispatch } = useContext(VehicleContext);
	const vehicles = allVehicles.data;
	const isLoading = allVehicles.loading;
	const totalPages = allVehicles.totalPages;
	const isPageChanged = allVehicles.pageChanged;

	const [drawerOpen, setDrawerOpen] = useState(false); // Drawer open state
	const [selectedVehicle, setSelectedVehicle] = useState(null); // Selected vehicle

	const handlePageChanged = useCallback(
		(status) => {
			dispatch({ type: "CHANGE_VEHICLES_PAGE", payload: status });
		},
		[dispatch]
	);

	// Scroll effect when page changes
	useEffect(() => {
		if (isPageChanged && cardRef.current) {
			window.scrollTo({
				top: cardRef.current.offsetTop - 70,
				behavior: "smooth",
			});

			handlePageChanged(false); // Reset pageChanged after scroll
		}
	}, [isPageChanged, handlePageChanged]); // Add pageChanged to the dependencies

	// Handle card click
	const handleCardClick = (vehicle) => {
		setSelectedVehicle(vehicle);
		setDrawerOpen(true);
	};

	return (
		<>
			<div className="sticky top-0 bg-gray-50 w-full z-10">
				<div className="flex overflow-x-auto whitespace-nowrap space-x-2 px-2 py-4 sm:px-4">
					<button
						className={`${
							filter === "all" ? "bg-gray-800" : "bg-gray-400"
						} font-medium text-gray-100 text-sm rounded-full py-1.5 px-4 focus:outline-none`}
						onClick={() => {
							setFilter("all");
							setCurrentPage(0);
							handlePageChanged(true); // Mark that the page was changed by the user
						}}
					>
						All
					</button>
					<button
						className={`${
							filter === "for_sale" ? "bg-gray-800" : "bg-gray-400"
						} font-medium text-gray-100 text-sm rounded-full py-1.5 px-4 focus:outline-none`}
						onClick={() => {
							setFilter("for_sale");
							setCurrentPage(0);
							handlePageChanged(true); // Mark that the page was changed by the user
						}}
					>
						For Sale
					</button>
					<button
						className={`${
							filter === "sold" ? "bg-gray-800" : "bg-gray-400"
						} font-medium text-gray-100 text-sm rounded-full py-1.5 px-4 focus:outline-none`}
						onClick={() => {
							setFilter("sold");
							setCurrentPage(0);
							handlePageChanged(true); // Mark that the page was changed by the user
						}}
					>
						Sold
					</button>
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
							key={vehicle?._id || index} // Use index as key during loading
							className="relative rounded-lg overflow-hidden"
							ref={index === 0 ? cardRef : null}
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
