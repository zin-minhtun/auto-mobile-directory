// import React from "react";
import VehicleForm from "./VehicleForm";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axiosInstance from "../../../api/axios";

export default function VehicleModal({ isOpen, onClose, onVehicleCreated }) {
	const handleFormSubmit = async (values) => {
		try {
			const formData = new FormData();
			Object.keys(values).forEach((key) => {
				if (key === "image" && values.image instanceof File) {
					formData.append(key, values.image); // Append the image file
				} else {
					formData.append(key, values[key]); // Append other form fields
				}
			});
	
			const response = await axiosInstance.post("/api/vehicles", formData);
			onVehicleCreated(response.data); // Callback to create a new vehicle in vehicle list
		} catch (error) {
			console.error("Error creating vehicle:", error);
		}
		onClose(); // Close the modal after submission
	};
	

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
			<div className="bg-white p-6 rounded-md shadow-lg w-full sm:w-2/4">
				<div className="flex items-center space-x-1 py-2">
					<h2 className="text-xl font-bold">Create Vehicle</h2>
					<AddCircleOutlineIcon
						className="text-gray-700"
						sx={{ fontSize: 26, paddingTop: "1px" }}
					/>
				</div>
				<VehicleForm
					onSubmit={handleFormSubmit}
					onClose={onClose}
					btnLabel="Submit"
				/>
			</div>
		</div>
	);
}
