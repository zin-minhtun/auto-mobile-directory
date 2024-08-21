import { useState } from "react";
import VehicleModal from "./Modules/Vehicle/VehicleModal";

export default function Sidebar({
	fetchVehicles,
	buttons = [],
	updateVehicles,
	currentPage,
	resetPage,
}) {
	const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);

	const handleClick = (button) => {
		if (button === "Create") {
			if (currentPage > 0) {
				resetPage(0);
				fetchVehicles();
			}

			setIsVehicleModalOpen(true);
		} else if (button === "Vehicles") {
			resetPage(0);
			fetchVehicles();
		}
	};

	const closeVehicleModal = () => {
		setIsVehicleModalOpen(false);
	};

	const handleVehicleCreated = (createdVehicle) => {
		updateVehicles("create", createdVehicle); // Update vehicles state after create
	};

	return (
		<>
			<nav
				className="flex flex-row space-x-1 sm:space-x-0 sm:flex-col sm:w-32 p-4 sm:space-y-2 sm:bg-gray-300 shadow-inner"
				style={{ minHeight: `calc(100vh - 66px)` }}
			>
				{buttons.map((button, index) => (
					<button
						key={index}
						onClick={() => handleClick(button.label)}
						className={`flex flex-col justify-center items-center py-2 px-4 rounded-md w-full ${button.color}`}
					>
						<div className="flex items-center justify-center">
							{button.icon}
						</div>
						<div className="text-center mt-1">{button.label}</div>
					</button>
				))}
			</nav>

			{isVehicleModalOpen && (
				<VehicleModal
					isOpen={isVehicleModalOpen}
					onClose={closeVehicleModal}
					onVehicleCreated={handleVehicleCreated}
				/>
			)}

		</>
	);
}
