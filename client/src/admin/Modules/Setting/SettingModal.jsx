// import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

export default function SettingModal({ isOpen, onClose }) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
			<div className="bg-white p-6 rounded-md shadow-lg w-full sm:w-2/4">
				<div className="flex justify-between py-2">
					<div className="flex items-center space-x-1">
						<h2 className="text-xl font-bold">Settings</h2>
						<SettingsIcon
							className="text-gray-700"
							sx={{ fontSize: 26, paddingTop: "5px" }}
						/>
					</div>
					<IconButton onClick={onClose}>
						<CloseIcon className="text-gray-500" />
					</IconButton>
				</div>
				<div>
					<Formik>
						{() => (
							<Form className="p-4" encType="multipart/form-data">
								<div className="flex flex-col">
									<div className="grid grid-cols-8 space-x-2">
										<div className="col-span-4 h-20">
											<label
												htmlFor="mileage"
												className="block text-gray-700 font-semibold mb-1"
											>
												Username / Email
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
										<div className="col-span-4 h-20">
											<label
												htmlFor="mileage"
												className="block text-gray-700 font-semibold mb-1"
											>
												Password
											</label>
											<Field
												name="mileage"
												type="password"
												className="w-full p-1.5 bg-gray-50 border border-gray-300 rounded-md hide-number-input-arrows"
												placeholder="******"
											/>
											<ErrorMessage
												name="mileage"
												component="div"
												className="text-red-500 text-xs"
											/>
										</div>
									</div>
									<div className="grid grid-cols-8">
										<div className="col-span-8">
											<div className="flex justify-end pt-3">
												<button
													type="submit"
													className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md border border-red-800"
												>
													Change
												</button>
											</div>
										</div>
									</div>
									
									<div className="grid grid-cols-8 space-x-2">
										<div className="col-span-2 h-20">
											<label
												htmlFor="phone"
												className="block text-gray-700 font-semibold mb-1"
											>
												Phone
											</label>
											<Field
												name="phone"
												type="text"
												className="w-full p-1.5 bg-gray-50 border border-gray-300 rounded-md"
												placeholder="Phone number"
											/>
											<ErrorMessage
												name="phone"
												component="div"
												className="text-red-500 text-xs"
											/>
										</div>
										<div className="col-span-6 h-20">
											<label
												htmlFor="address"
												className="block text-gray-700 font-semibold mb-1"
											>
												Address
											</label>
											<Field
												name="address"
												type="text"
												className="w-full p-1.5 bg-gray-50 border border-gray-300 rounded-md"
												placeholder="Enter address"
											/>
											<ErrorMessage
												name="address"
												component="div"
												className="text-red-500 text-xs"
											/>
										</div>
									</div>
									<div className="grid grid-cols-8 space-x-2">
										<div className="col-span-8 h-20">
											<label
												htmlFor="footerText"
												className="block text-gray-700 font-semibold mb-1"
											>
												Footer Text
											</label>
											<Field
												name="footerText"
												type="text"
												className="w-full p-1.5 bg-gray-50 border border-gray-300 rounded-md hide-number-input-arrows"
												placeholder="Enter footer text for website"
											/>
											<ErrorMessage
												name="footerText"
												component="div"
												className="text-red-500 text-xs"
											/>
										</div>
									</div>
									<div className="grid grid-cols-8">
										<div className="col-span-8">
											<div className="flex justify-end pt-3 pb-5">
												<button
													type="submit"
													className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-900"
												>
													Submit
												</button>
											</div>
										</div>
									</div>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
}
