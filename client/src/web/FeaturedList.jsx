import { useRef, useContext, useEffect } from "react";
import { SkeletonCardList } from "./SkeletonCard";
import { Link } from "react-router-dom";
import { VehicleContext } from "./Main";

export default function FeaturedList() {
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
	const scrollRef = useRef(null);

	const { featuredVehicles } = useContext(VehicleContext);

	const scrollRight = () => {
		if (scrollRef.current) {
			const maxScrollLeft =
				scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

			if (scrollRef.current.scrollLeft >= maxScrollLeft) {
				// Restart from the beginning
				scrollRef.current.scrollTo({
					left: 0,
					behavior: "smooth",
				});
			} else {
				// Scroll to the right
				scrollRef.current.scrollBy({
					left: 200, // Adjust scroll amount as needed
					behavior: "smooth",
				});
			}
		}
	};

	useEffect(() => {
		// Set up the auto-scrolling interval
		const intervalId = setInterval(scrollRight, 3000); // Adjust time interval as needed

		// Clean up the interval on component unmount
		return () => clearInterval(intervalId);
	}, []);

	return (
		<>
			{featuredVehicles.data.length > 0 && (
				<div className="px-2 sm:px-4 py-5">
					<div className="flex flex-row justify-between mb-1.5 px-2">
						<p className="text-gray-800 text-xl font-semibold">Featured Cars</p>
						<div className="text-gray-600 font-semibold text-sm py-1 underline">
							<Link to="/featured-cars">View all</Link>
						</div>
					</div>
					<div className="relative">
						{/* Left Scroll Button */}
						<button
							onClick={() =>
								scrollRef.current.scrollBy({ left: -200, behavior: "smooth" })
							}
							className="absolute pb-1 ml-3 left-0 top-1/2 transform -translate-y-1/2 bg-gray-900/20 text-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none z-10 sm:inline-flex invisible sm:visible"
						>
							&larr;
						</button>

						{/* Right Scroll Button */}
						<button
							onClick={scrollRight}
							className="absolute pb-1 mr-3 right-0 top-1/2 transform -translate-y-1/2 bg-gray-900/20 text-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none z-10 sm:inline-flex invisible sm:visible"
						>
							&rarr;
						</button>

						<div className="overflow-x-auto scrollbar-hidden" ref={scrollRef}>
							<div className="flex space-x-3">
								{featuredVehicles.data.map((vehicle) =>
									vehicle ? ( // Check if the vehicle object is not null/undefined
										<div
											key={vehicle._id}
											className="border border-gray-400/80 rounded-lg overflow-hidden w-72 h-36 flex-shrink-0"
										>
											<div className="flex">
												<img
													src={`${apiBaseUrl}/${vehicle.image}`}
													alt={`${vehicle.make}`}
													className="w-36 object-cover"
												/>
												<div className="pl-3 pr-2 w-full bg-yellow-50 flex flex-col justify-center">
													<div className="text-gray-700 text-md font-medium">
														{`${vehicle.make}${vehicle.model}`.length > 12
															? `${vehicle.make} ${vehicle.model}`.substring(
																	0,
																	12
															  ) + "..."
															: `${vehicle.make} ${vehicle.model}`}
													</div>
													<p className="text-gray-600 text-sm">
														Year: {vehicle.year}
													</p>
													<div className="flex justify-between items-center mt-3">
														<p
															className="text-gray-600 text-lg font-semibold"
															style={{ paddingBottom: "3px" }}
														>
															${vehicle.price}
														</p>
														<p
															className="text-gray-50 text-xs bg-orange-500 px-1.5 rounded-md"
															style={{ paddingBottom: "2px" }}
														>
															Popular
														</p>
													</div>
												</div>
											</div>
										</div>
									) : (
										<SkeletonCardList key={Math.random()} /> // Add a skeleton card for null values
									)
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
