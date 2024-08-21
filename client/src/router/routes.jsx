import { createBrowserRouter } from "react-router-dom";
import Main from "../web/Main";
import App from "../App";
import Dashboard from "../admin/Dashboard";
import VehicleIndex from "../admin/Modules/Vehicle/Index";
import NotFound from "../admin/NotFound";
import Home from "../web/Home";
import AllFeaturedCars from "../web/AllFeaturedCars";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Main />,
				children: [
					{
						path: "",
						element: <Home />,
					},
					{
						path: "featured-cars",
						element: <AllFeaturedCars />,
					},
				],
			},
			{
				path: "/admin",
				element: <Dashboard />,
				children: [
					{
						path: "vehicles",
						element: <VehicleIndex />,
					},
				],
			},
			{
				path: "*", // This will catch all undefined routes
				element: <NotFound />, // Optional: Redirect or show a not found component
			},
		],
	},
]);

export default router;
