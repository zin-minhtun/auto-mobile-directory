import { useState } from "react";
import { Link } from "react-router-dom";
import {
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import logo from "../assets/logo.png";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

export default function Navigation() {
	const [drawerOpen, setDrawerOpen] = useState(false);

	const toggleDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setDrawerOpen(open);
	};

	return (
		<nav className="bg-gray-900 px-4">
			<ul className="flex justify-between items-center">
				<li className="text-gray-50">
					{/* Hide the left icon on desktop */}
					<IconButton onClick={toggleDrawer(true)}>
						<DensityMediumIcon
							className="text-gray-100"
							sx={{ fontSize: 30 }}
						/>
					</IconButton>
				</li>
				<li className="flex-1 flex justify-center sm:justify-start sm:ml-4">
					{/* Center on mobile, left on desktop */}
					<Link to="/" className="flex">
						<img src={logo} alt="Logo" className="w-48 opacity-95" />
					</Link>
				</li>
			</ul>

			<Drawer
				anchor="left"
				open={drawerOpen}
				onClose={toggleDrawer(false)}
				sx={{
					"& .MuiDrawer-paper": { backgroundColor: "black", padding: "20px" },
				}}
			>
				<div
					className="w-72 text-gray-200/90"
					role="presentation"
					onKeyDown={toggleDrawer(false)}
				>
					<div className="flex justify-between items-center text-gray-100">
						<h2 className="text-xl font-semibold tracking-wide">ATG Automobiles</h2>
						<IconButton onClick={toggleDrawer(false)}>
							<CloseIcon className="text-gray-100" />
						</IconButton>
					</div>
					<div className="mt-3">
						<List>
							<ListItem>
								<PhoneIcon className="text-red-500 mr-3" />
								<ListItemText primary="(123) 456-7890" />
							</ListItem>
							<ListItem>
								<AlternateEmailIcon className="text-red-500 mr-3" />
								<ListItemText primary="123 Main St, City, Country | 123 Main St, City, Country" />
							</ListItem>
						</List>
					</div>
				</div>
			</Drawer>
		</nav>
	);
}
