// import React from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircleIcon from "@mui/icons-material/Circle";

export default function VehicleDetailDrawer({drawerOpen, setDrawerOpen, selectedVehicle}) {
	return (
		<>
			{/* Bottom Drawer */}
			<Drawer
				anchor="bottom"
				open={drawerOpen}
				onClose={() => setDrawerOpen(false)}
				PaperProps={{
					className: "p-4 bg-gray-100 rounded-t-lg shadow-lg", // Tailwind CSS classes
					style: { height: "30vh" },
				}}
			>
				<div className="flex justify-between items-center">
					<h2 className="text-xl font-semibold">
						# {selectedVehicle?.make} {selectedVehicle?.model}
					</h2>
					<IconButton onClick={() => setDrawerOpen(false)}>
						<CloseIcon />
					</IconButton>
				</div>
				<div className="flex items-center">
					<CircleIcon
						className={`mr-1 ${
							selectedVehicle?.isSold ? "text-red-500" : "text-green-400"
						}`}
						sx={{ fontSize: 16 }}
					/>
					{selectedVehicle?.isSold ? "Sold" : "For Sale"}
				</div>
				<div className="flex justify-between">
					<div className="mt-4 w-1/2">
						<p>
							<strong>Price:</strong> ${selectedVehicle?.price}
						</p>
						<p>
							<strong>Year:</strong> {selectedVehicle?.year}
						</p>
						<p>
							<strong>Color:</strong> {selectedVehicle?.color}
						</p>
						{/* Add more details as needed */}
					</div>
					<div className="mt-4 w-1/2">
						<p>
							<strong>Transmission:</strong> {selectedVehicle?.transmission}
						</p>
						<p>
							<strong>Fuel Type:</strong> {selectedVehicle?.fuelType}
						</p>
						<p>
							<strong>Category:</strong> {selectedVehicle?.category}
						</p>
						{/* Add more details as needed */}
					</div>
				</div>
				<div className="mt-auto mb-2 flex justify-between space-x-2 items-center pt-4 border-t border-gray-300/70">
					<button className="bg-orange-400 w-1/2 text-white text-lg px-4 py-2 rounded-lg shadow-md focus:outline-none">
						Message
					</button>
					<button className="bg-green-500 w-1/2 text-white text-lg px-4 py-2 rounded-lg shadow-md focus:outline-none">
						Call
					</button>
				</div>
			</Drawer>
		</>
	);
}
