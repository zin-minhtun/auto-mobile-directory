import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
// import TextsmsIcon from '@mui/icons-material/Textsms';

export default function Navigation() {
	return (
		<nav className="bg-gray-900 px-4">
			<ul className="flex justify-between items-center">
				<li className="text-gray-50">
					{/* Hide the left icon on desktop */}
					<DensityMediumIcon sx={{ fontSize: 30 }} />
				</li>
				<li className="flex-1 flex justify-center sm:justify-start sm:ml-4">
					{/* Center on mobile, left on desktop */}
					<Link to="/" className="flex">
						<img src={logo} alt="Logo" className="w-48 opacity-95" />
					</Link>
				</li>
				{/* <li className="text-gray-50">
					<TextsmsIcon sx={{ fontSize: 30 }} />
				</li> */}
			</ul>
		</nav>
	);
}
