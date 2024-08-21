import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import placeholderImage from "../../../assets/ATG_150.jpg";
import { Checkbox } from "@mui/material";

export default function VehicleForm({
	onSubmit,
	onClose,
	initialValues,
	btnLabel,
}) {
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

	// Define the categories array as per the enum values
	const categories = [
		"Sedan",
		"Hatchback",
		"SUV",
		"Coupe",
		"Van",
		"Minivan",
		"Truck",
	];

	// State to hold the selected image
	const [selectedImage, setSelectedImage] = useState(
		initialValues?.image
			? `${apiBaseUrl}/${initialValues.image}`
			: placeholderImage
	);

	// Define validation schema with Yup
	const validationSchema = Yup.object().shape({
		make: Yup.string().required("Make is required"),
		model: Yup.string().required("Model is required"),
		year: Yup.number().required("Year is required"),
		price: Yup.number()
			.required("Price is required")
			.min(0, "Price must be a positive number"),
		mileage: Yup.number()
			.required("Mileage is required")
			.min(0, "Mileage must be a positive number"),
		color: Yup.string().required("Color is required"),
		transmission: Yup.string().required("Transmission is required"),
		fuelType: Yup.string().required("Fuel Type is required"),
		category: Yup.mixed().required("Category is required"),
		description: Yup.string(),
		image: Yup.mixed()
			.required("Image is required")
			.test("fileType", "Must be png, jpg, jpeg", (value) => {
				// Check if a value is provided (either a file or a string)
				if (value) {
					// Determine if the value is a string (e.g., existing image path) or a File object
					const extension = (typeof value === "string" ? value : value.name)
						.split(".") // Split the string by '.' to separate the file name and extension
						.pop() // Get the last part of the array, which is the file extension
						.toLowerCase(); // Convert the extension to lowercase for comparison

					// Check if the extracted extension is one of the allowed formats
					return ["png", "jpg", "jpeg"].includes(extension);
				}

				// If no value is provided or the value is neither a file nor a string, return false
				return false;
			}),
	});

	// Function to handle image change
	const handleImageChange = (event, setFieldValue) => {
		if (event.currentTarget.files.length) {
			const file = event.currentTarget.files[0];
			setSelectedImage(URL.createObjectURL(file)); // Create a preview URL
			setFieldValue("image", file); // Set the file to Formik's field value
		}
	};

	return (
		<Formik
			initialValues={{
				make: initialValues?.make || "",
				model: initialValues?.model || "",
				year: initialValues?.year || "",
				price: initialValues?.price || "",
				cost: initialValues?.cost || "",
				amount: initialValues?.amount || "",
				mileage: initialValues?.mileage || "",
				color: initialValues?.color || "",
				transmission: initialValues?.transmission || "",
				fuelType: initialValues?.fuelType || "",
				category: initialValues?.category || "",
				description: initialValues?.description || "",
				image: initialValues?.image || null,
				isConsigned: initialValues?.isConsigned || false,
			}}
			validationSchema={validationSchema}
			onSubmit={(values, { setSubmitting }) => {
				setSubmitting(true);
				onSubmit(values);
				setSubmitting(false);
			}}
		>
			{({ values, isSubmitting, setFieldValue }) => (
				<Form className="p-4" encType="multipart/form-data">
					<div className="flex flex-col">
						<div className="grid grid-cols-8 space-x-2">
							<div className="col-span-2 h-48">
								<div className="">
									<label
										htmlFor="image"
										className="block text-gray-700 font-semibold mb-1"
									>
										Image
									</label>
									<input
										type="file"
										name="image"
										accept="image/*"
										onChange={(event) =>
											handleImageChange(event, setFieldValue)
										}
										className="hidden" // Hide the file input
									/>
								</div>

								{/* Preview Image */}
								{selectedImage && (
									<div className="w-full overflow-hidden border border-gray-300 rounded-md">
										<img
											src={selectedImage}
											alt="Preview"
											className="w-full object-cover" // Apply object-cover for cropping
											onClick={() =>
												document.querySelector('input[name="image"]').click()
											} // Trigger file input on click
											style={{ height: "148px" }}
										/>
									</div>
								)}

								<ErrorMessage
									name="image"
									component="div"
									className="text-red-500 text-xs"
								/>
							</div>
							<div className="col-span-6">
								<label
									htmlFor="description"
									className="block text-gray-700 font-semibold mb-1"
								>
									Description
								</label>
								<Field
									name="description"
									as="textarea"
									rows="4"
									className="w-full p-3 border border-gray-300 rounded-md"
									placeholder="Enter description here..."
									style={{ maxHeight: "150px", minHeight: "150px" }}
								/>
								<ErrorMessage
									name="description"
									component="div"
									className="text-red-500 text-xs"
								/>
							</div>
						</div>
						<div className="grid grid-cols-8 space-x-2">
							<div className="col-span-2 h-20">
								<label
									htmlFor="make"
									className="block text-gray-700 font-semibold mb-1"
								>
									Make
								</label>
								<Field
									name="make"
									type="text"
									className="w-full p-1.5 bg-gray-50 border border-gray-300 rounded-md"
									placeholder="Toyota"
								/>
								<ErrorMessage
									name="make"
									component="div"
									className="text-red-500 text-xs"
								/>
							</div>
							<div className="col-span-2 h-20">
								<label
									htmlFor="model"
									className="block text-gray-700 font-semibold mb-1"
								>
									Model
								</label>
								<Field
									name="model"
									type="text"
									className="w-full p-1.5 bg-gray-50 border border-gray-300 rounded-md"
									placeholder="Camry"
								/>
								<ErrorMessage
									name="model"
									component="div"
									className="text-red-500 text-xs"
								/>
							</div>
							<div className="col-span-2 h-20">
								<label
									htmlFor="year"
									className="block text-gray-700 font-semibold mb-1"
								>
									Year
								</label>
								<Field
									name="year"
									type="number"
									className="w-full p-1.5 bg-gray-50 border border-gray-300 rounded-md hide-number-input-arrows"
									placeholder="2004"
								/>
								<ErrorMessage
									name="year"
									component="div"
									className="text-red-500 text-xs"
								/>
							</div>

							<div className="col-span-2 h-20">
								<label
									htmlFor="category"
									className="block text-gray-700 font-semibold mb-1"
								>
									Category
								</label>
								<Field
									as="select"
									name="category"
									className="w-full p-1.5 bg-gray-50 border border-gray-300 rounded-md"
								>
									<option value="" label="Select a category" />
									{categories.map((category, index) => (
										<option key={index} value={category} label={category} />
									))}
								</Field>
								<ErrorMessage
									name="category"
									component="div"
									className="text-red-500 text-xs"
								/>
							</div>
						</div>
						<div className="grid grid-cols-8 space-x-2">
							<div className="col-span-2 h-20">
								<label
									htmlFor="mileage"
									className="block text-gray-700 font-semibold mb-1"
								>
									Mileage
								</label>
								<Field
									name="mileage"
									type="number"
									className="w-full p-1.5 bg-gray-50 border border-gray-300 rounded-md hide-number-input-arrows"
									placeholder="150000"
								/>
								<ErrorMessage
									name="mileage"
									component="div"
									className="text-red-500 text-xs"
								/>
							</div>
							<div className="col-span-2 h-20">
								<label
									htmlFor="color"
									className="block text-gray-700 font-semibold mb-1"
								>
									Color
								</label>
								<Field
									name="color"
									type="text"
									className="w-full p-1.5 bg-gray-50 border border-gray-300 rounded-md"
									placeholder="Red"
								/>
								<ErrorMessage
									name="color"
									component="div"
									className="text-red-500 text-xs"
								/>
							</div>
							<div className="col-span-2 h-20">
								<label
									htmlFor="transmission"
									className="block text-gray-700 font-semibold mb-1"
								>
									Transmission
								</label>
								<Field
									name="transmission"
									type="text"
									className="w-full p-1.5 bg-gray-50 border border-gray-300 rounded-md"
									placeholder="Manual"
								/>
								<ErrorMessage
									name="transmission"
									component="div"
									className="text-red-500 text-xs"
								/>
							</div>
							<div className="col-span-2 h-20">
								<label
									htmlFor="fuelType"
									className="block text-gray-700 font-semibold mb-1"
								>
									Fuel Type
								</label>
								<Field
									name="fuelType"
									type="text"
									className="w-full p-1.5 bg-gray-50 border border-gray-300 rounded-md"
									placeholder="Diesel"
								/>
								<ErrorMessage
									name="fuelType"
									component="div"
									className="text-red-500 text-xs"
								/>
							</div>
						</div>
						<div className="grid grid-cols-8 space-x-2">
							<div className="col-span-2 h-20">
								<label
									htmlFor="isConsigned"
									className="block text-gray-700 font-semibold mb-1"
								>
									Consigned Car?
								</label>
								<Checkbox
									name="isConsigned"
									checked={values.isConsigned || false}
									onChange={(event) =>
										setFieldValue("isConsigned", event.target.checked)
									}
									sx={{
										"&.Mui-checked": {
											color: "#374151", // Color when checked
										},
									}}
								/>
								<ErrorMessage
									name="isConsigned"
									component="div"
									className="text-red-500 text-xs"
								/>
							</div>
							<div
								className={`col-span-2 h-20 ${
									values.isConsigned ? "hidden" : ""
								}`}
							>
								<label
									htmlFor="cost"
									className="block text-gray-700 font-semibold mb-1"
								>
									Cost ( Lks )
								</label>
								<Field
									name="cost"
									type="number"
									className="w-full p-1.5 bg-gray-50 border border-gray-300 rounded-md hide-number-input-arrows"
									placeholder="Enter Cost"
								/>
								<ErrorMessage
									name="cost"
									component="div"
									className="text-red-500 text-xs"
								/>
							</div>
							<div
								className={`col-span-2 h-20 ${
									!values.isConsigned ? "hidden" : ""
								}`}
							>
								<label
									htmlFor="amount"
									className="block text-gray-700 font-semibold mb-1"
								>
									Amount ( Lks )
								</label>
								<Field
									name="amount"
									type="number"
									className="w-full p-1.5 bg-gray-50 border border-gray-300 rounded-md hide-number-input-arrows"
									placeholder="Amount"
								/>
								<ErrorMessage
									name="amount"
									component="div"
									className="text-red-500 text-xs"
								/>
							</div>
							<div className="col-span-2 h-20">
								<label
									htmlFor="price"
									className="block text-gray-700 font-semibold mb-1"
								>
									Sale Price ( Lks )
								</label>
								<Field
									name="price"
									type="number"
									className="w-full p-1.5 bg-teal-300 border border-gray-300 rounded-md hide-number-input-arrows"
									placeholder="Enter Price"
								/>
								<ErrorMessage
									name="price"
									component="div"
									className="text-red-500 text-xs"
								/>
							</div>
						</div>
					</div>
					<div className="flex justify-end pt-8 space-x-4">
						<button
							type="button"
							className="bg-red-500 hover:bg-red-600 text-gray-100 px-4 py-2 rounded-md border border-red-700"
							onClick={onClose}
							disabled={isSubmitting}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-900"
							disabled={isSubmitting}
						>
							{btnLabel}
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
