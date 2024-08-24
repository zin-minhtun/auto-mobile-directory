import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import PublicIcon from "@mui/icons-material/Public";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingModal from "./Modules/Setting/SettingModal";

export default function Home() {
	const location = useLocation();
	const [settingModalOpen, setSettingModalOpen] = useState(false);

	// Get the last segment of the pathname
	const pathSegments = location.pathname
		.split("/")
		.filter((segment) => segment); // Remove empty segments
	const displayTitle = pathSegments[pathSegments.length - 1]; // Get the last segment and assign to a variable

	const cards = [
		{
			route: "/",
			label: "Website",
			icon: <PublicIcon sx={{ fontSize: 40 }} />,
			external: true,
		},
		{
			route: "/admin/vehicles",
			label: "Vehicles",
			icon: <TimeToLeaveIcon sx={{ fontSize: 40 }} />,
			external: false,
		},
		{
			route: null,
			label: "Setting",
			icon: <SettingsIcon sx={{ fontSize: 40 }} />,
			external: false,
		},
	];

	const handleSetting = () => {
		setSettingModalOpen(true);
	};

	return (
		<>
			{location.pathname === "/admin" || location.pathname === "/admin/" ? (
				<div className="flex items-center justify-center min-h-screen bg-gray-300 p-4">
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
						{cards.map((card, index) =>
							card.external ? (
								<a
									href={card.route}
									target="_blank"
									rel="noopener noreferrer"
									key={index}
								>
									<div className="flex flex-col w-32 justify-center items-center bg-gray-800 text-gray-100 p-4 rounded-md shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300">
										{card.icon}
										<p className="text-lg font-semibold my-2 capitalize">
											{card.label}
										</p>
									</div>
								</a>
							) : (
								<Link
									to={card.route}
									state={{ title: card.label }} // Pass title as state
									key={index}
									onClick={() =>
										card.label === "Setting" ? handleSetting() : null
									}
								>
									<div className="flex flex-col w-32 justify-center items-center bg-gray-800 text-gray-100 p-4 rounded-md shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300">
										{card.icon}
										<p className="text-lg font-semibold my-2">{card.label}</p>
									</div>
								</Link>
							)
						)}
					</div>
				</div>
			) : (
				<NavBar title={displayTitle} /> // Use displayTitle derived from the last segment
			)}

			<Outlet />

			{settingModalOpen && (
				<SettingModal
					isOpen={settingModalOpen}
					onClose={() => setSettingModalOpen(false)} // Correct the onClose prop
				/>
			)}
		</>
	);
}
