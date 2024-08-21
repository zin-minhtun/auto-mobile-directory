import { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TablePagination,
	Checkbox,
	CircularProgress,
	Switch,
} from "@mui/material";
import axiosInstance from "../../../api/axios";
import VehicalDetailsDrawer from "./VehicalDetailsDrawer";

export default function Index() {
	const [vehicles, setVehicles] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [totalPages, setTotalPages] = useState(0);
	const [selectedVehicles, setSelectedVehicles] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [loading, setLoading] = useState(false); // Add loading state
	const [drawerOpen, setDrawerOpen] = useState(false); // State for Drawer
	const [selectedVehicle, setSelectedVehicle] = useState(null); // State for the selected vehicle

	const buttons = [
		{
			label: "Vehicles",
			icon: <TimeToLeaveIcon sx={{ fontSize: 40 }} />,
			color:
				"text-gray-100 bg-cyan-700 hover:bg-cyan-800 border border-cyan-900",
		},
		{
			label: "Create",
			icon: <AddToPhotosIcon sx={{ fontSize: 40 }} />,
			color:
				"text-gray-100 bg-orange-700 hover:bg-orange-800 border border-orange-900",
		},
	];

	useEffect(() => {
		fetchVehicles(page, rowsPerPage, searchQuery);
	}, [page, rowsPerPage, searchQuery]);

	const fetchVehicles = async (page, limit, search) => {
		setLoading(true); // Set loading to true before fetching
		try {
			const response = await axiosInstance.get("/api/vehicles", {
				params: { page: page + 1, limit, search },
			});

			console.log(response)
			setVehicles(response.data.vehicles);
			setTotalPages(response.data.totalPages);
		} catch (error) {
			console.error("Error fetching vehicles:", error);
		} finally {
			setLoading(false); // Set loading to false after fetching
		}
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		setSelectedVehicles([]); // Clear selected vehicles when page changes
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0); // Reset to first page
		setSelectedVehicles([]); // Clear selected vehicles when rows per page changes
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = vehicles.map((vehicle) => vehicle._id);
			setSelectedVehicles(newSelecteds);
			return;
		}
		setSelectedVehicles([]);
	};

	const handleClick = (id) => {
		const selectedIndex = selectedVehicles.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selectedVehicles, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selectedVehicles.slice(1));
		} else if (selectedIndex === selectedVehicles.length - 1) {
			newSelected = newSelected.concat(selectedVehicles.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selectedVehicles.slice(0, selectedIndex),
				selectedVehicles.slice(selectedIndex + 1)
			);
		}

		setSelectedVehicles(newSelected);
	};

	const handleBulkDelete = async () => {
		try {
			await axiosInstance.post("/api/vehicles/bulk-delete", {
				ids: selectedVehicles,
			});
			setSelectedVehicles([]);
			fetchVehicles(page, rowsPerPage, searchQuery);
		} catch (error) {
			console.error("Error deleting vehicles:", error);
		}
	};

	const handleSearchInputChange = (event) => {
		setSearchQuery(event.target.value);
		setPage(0); // Reset to first page on search
	};

	const handleViewClick = (vehicle) => {
		setSelectedVehicle(vehicle); // Set the selected vehicle
		setDrawerOpen(true); // Open the drawer
	};

	const handleDrawerClose = () => {
		setDrawerOpen(false); // Close the drawer
	};

	const handleFeaturedChange = async (vehicleId, isFeatured) => {
		try {
			// Send an API request to update the vehicle's featured status
			await axiosInstance.put(`/api/vehicles/${vehicleId}/update-featured`, {
				isFeatured: !isFeatured, // Toggle the current status
			});

			// Update the vehicles state directly
			setVehicles((prevVehicles) =>
				prevVehicles.map((vehicle) =>
					vehicle._id === vehicleId
						? { ...vehicle, isFeatured: !isFeatured }
						: vehicle
				)
			);
		} catch (error) {
			console.error("Error updating featured status:", error);
		}
	};

	const updateVehicleState = (state = "create", vehicle) => {
		if (state === "create") {
			// Update the vehicles state with the newly created vehicle in reverse order
			// setVehicles((prevVehicles) => [vehicle, ...prevVehicles]);
			fetchVehicles();
		} else {
			// Update the updated vehicle state directly
			setVehicles((prevVehicles) =>
				prevVehicles.map((oldVehicle) =>
					oldVehicle._id === vehicle._id ? vehicle : oldVehicle
				)
			);
		}
	};

	const handleSoldChange = async (vehicleId, isSold) => {
		try {
			// Send an API request to update the vehicle's sold status
			await axiosInstance.put(`/api/vehicles/${vehicleId}/update-sold`, {
				isSold: !isSold, // Toggle the current status
			});

			// Update the vehicles state directly
			setVehicles((prevVehicles) =>
				prevVehicles.map((vehicle) =>
					vehicle._id === vehicleId ? { ...vehicle, isSold: !isSold } : vehicle
				)
			);
		} catch (error) {
			console.error("Error updating sold status:", error);
		}
	};

	return (
		<div className="sm:flex">
			{/* Left Sidebar */}
			<Sidebar
				buttons={buttons}
				fetchVehicles={fetchVehicles}
				updateVehicles={updateVehicleState}
				currentPage={page}
				resetPage={setPage}
			/>

			{/* Main Content */}
			<div className="p-4 w-full">
				{/* Search Input */}
				<div className="flex mb-3 space-x-2">
					<input
						type="text"
						placeholder="Search Vehicles"
						className="p-1.5 pl-4 border border-gray-400 bg-gray-100 rounded-md"
						value={searchQuery}
						onChange={handleSearchInputChange}
					/>

					{selectedVehicles.length > 0 && (
						<button
							onClick={handleBulkDelete}
							className="bg-red-500 hover:bg-red-600 text-gray-100 px-4 py-2 rounded-md border border-red-700"
						>
							Delete Selected
						</button>
					)}
				</div>
				<Paper sx={{ width: "100%", overflow: "hidden" }}>
					<TableContainer sx={{ maxHeight: 540 }}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell padding="checkbox">
										<Checkbox
											indeterminate={
												selectedVehicles.length > 0 &&
												selectedVehicles.length < vehicles.length
											}
											checked={
												vehicles.length > 0 &&
												selectedVehicles.length === vehicles.length
											}
											onChange={handleSelectAllClick}
											sx={{
												"&.Mui-checked": {
													color: "#374151", // Checked color
												},
												"&.MuiCheckbox-indeterminate": {
													color: "#374151 !important", // Indeterminate color with !important
												},
											}}
										/>
									</TableCell>
									<TableCell>
										<span className="font-semibold text-base underline">
											Make
										</span>
									</TableCell>
									<TableCell>
										<span className="font-semibold text-base underline">
											Model
										</span>
									</TableCell>
									<TableCell align="right">
										<span className="font-semibold text-base underline">
											Year
										</span>
									</TableCell>
									<TableCell align="right">
										<span className="font-semibold text-base underline">
											Price
										</span>
									</TableCell>
									<TableCell align="right">
										<span className="font-semibold text-base underline">
											Mileage
										</span>
									</TableCell>
									<TableCell align="right">
										<span className="font-semibold text-base underline">
											Color
										</span>
									</TableCell>
									<TableCell align="right">
										<span className="font-semibold text-base underline">
											Transmission
										</span>
									</TableCell>
									<TableCell align="right">
										<span className="font-semibold text-base underline">
											Fuel
										</span>
									</TableCell>
									<TableCell align="right">
										<span className="font-semibold text-base underline">
											Featured?
										</span>
									</TableCell>
									<TableCell align="right">
										<span className="font-semibold text-base underline">
											Sold?
										</span>
									</TableCell>
									<TableCell align="right">
										<span className="font-semibold text-base underline">
											Action
										</span>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{loading ? ( // Conditional rendering for loading state
									<TableRow>
										<TableCell colSpan={11} align="center">
											<CircularProgress size={20} sx={{ color: "#374151" }} />{" "}
											{/* Loading spinner */}
										</TableCell>
									</TableRow>
								) : (
									vehicles.map((vehicle) => (
										<TableRow
											key={vehicle._id}
											selected={selectedVehicles.indexOf(vehicle._id) !== -1}
											sx={{
												"&:hover": {
													backgroundColor: "#f5f5f5", // Change to your desired hover color
												},
											}}
										>
											<TableCell padding="checkbox">
												<Checkbox
													checked={selectedVehicles.indexOf(vehicle._id) !== -1}
													onChange={() => handleClick(vehicle._id)}
													sx={{
														"&.Mui-checked": {
															color: "#374151", // Color when checked
														},
													}}
												/>
											</TableCell>
											<TableCell>{vehicle.make}</TableCell>
											<TableCell>{vehicle.model}</TableCell>
											<TableCell align="right">
												<span className="bg-cyan-700 text-gray-50 rounded-md py-1 px-2">
													{vehicle.year}
												</span>
											</TableCell>
											<TableCell align="right">
												<span className="mr-1">$</span>
												<span>{vehicle.price}</span>
											</TableCell>
											<TableCell align="right">{vehicle.mileage}</TableCell>
											<TableCell align="right">{vehicle.color}</TableCell>
											<TableCell align="right">
												{vehicle.transmission}
											</TableCell>
											<TableCell align="right">{vehicle.fuelType}</TableCell>
											<TableCell align="right">
												<Switch
													checked={vehicle.isFeatured}
													onChange={() =>
														handleFeaturedChange(
															vehicle._id,
															vehicle.isFeatured
														)
													}
													color="primary"
												/>
											</TableCell>
											<TableCell align="right">
												<Switch
													checked={vehicle.isSold}
													onChange={() =>
														handleSoldChange(vehicle._id, vehicle.isSold)
													}
													color="primary"
												/>
											</TableCell>
											<TableCell align="right">
												<button
													onClick={() => handleViewClick(vehicle)}
													className="bg-gray-700 text-gray-100 px-2 py-1 rounded-md hover:bg-gray-800 border border-gray-900"
												>
													View
												</button>
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[10, 25, 50]}
						component="div"
						count={totalPages * rowsPerPage}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
						sx={{
							".MuiTablePagination-toolbar": {
								backgroundColor: "#f3f4f6",
							},
							".MuiTablePagination-selectLabel": {
								color: "#111827",
							},
							".MuiTablePagination-displayedRows": {
								color: "#111827",
							},
							".MuiTablePagination-select": {
								color: "#111827",
							},
						}}
					/>
				</Paper>
			</div>

			{/* Vehicle Details Drawer */}
			<VehicalDetailsDrawer
				drawerOpen={drawerOpen}
				handleDrawerClose={handleDrawerClose}
				selectedVehicle={selectedVehicle}
				onVehicleUpdated={updateVehicleState}
			/>
		</div>
	);
}
