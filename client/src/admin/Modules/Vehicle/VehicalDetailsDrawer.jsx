import { Drawer } from "@mui/material";
import VehicleForm from "./VehicleForm";
import axiosInstance from "../../../api/axios";

export default function VehicalDetailsDrawer({
	drawerOpen,
	handleDrawerClose,
	selectedVehicle,
	onVehicleUpdated,
}) {
	const handleFormUpdate = async (values) => {
		try {
			const formData = new FormData();
			Object.keys(values).forEach((key) => {
				if (key === "image" && values.image instanceof File) {
					formData.append(key, values.image);
				} else {
					formData.append(key, values[key]);
				}
			});

			// Use PUT method to update the vehicle
			const response = await axiosInstance.put(`/api/vehicles/${selectedVehicle._id}`, formData);
			onVehicleUpdated("update", response.data); // Callback to update vehicle in vehicle list
		} catch (error) {
			console.error("Error updating vehicle:", error);
		} finally {
			handleDrawerClose(); // Close the drawer after submission
		}
	};

	return (
		<Drawer
			anchor="left"
			open={drawerOpen}
			onClose={handleDrawerClose}
			sx={{
				width: "50%", // Drawer width 50%
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: "50%", // Drawer paper width 50%
					paddingTop: "20px",
				},
			}}
		>
			<h2 className="px-5 text-xl font-semibold mb-5">
				# Vehicle Details -{" "}
				<span className="text-gray-400">{`${selectedVehicle?.make} ${selectedVehicle?.model} ${selectedVehicle?.year}`}</span>
			</h2>
			<div className="px-3">
				<VehicleForm
					onSubmit={handleFormUpdate}
					onClose={handleDrawerClose}
					initialValues={selectedVehicle}
					btnLabel="Update"
				/>
			</div>
		</Drawer>
	);
}
