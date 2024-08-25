import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import bannerImage from "../assets/Banner.jpg";

export default function Banner({ searchQuery, handleSearch }) {
	const handleInputChange = (event) => {
		const value = event.target.value;
		handleSearch(value);
	};

	const clearSearch = () => {
		handleSearch(""); // Clear the search in parent as well
	};

	return (
		<div className="relative w-full h-52 sm:h-72 overflow-hidden mb-2">
			<img
				src={bannerImage}
				alt="Background"
				className="absolute inset-0 w-full h-full object-cover filter"
			/>

			<div className="absolute inset-0 flex items-center justify-center">
				<div className="flex flex-col space-y-4 w-full p-10 max-w-md">
					<p className="text-white text-2xl sm:text-3xl font-bold tracking-wide text-center">
						Find Your{" "}
						<span className="text-red-600 font-extrabold">Perfect</span> Car
						<span className="text-red-600 font-extrabold">.</span>
					</p>
					<div className="flex flex-row space-x-0 w-72 sm:w-full mx-auto">
						<input
							type="text"
							placeholder="Search by model or year.."
							value={searchQuery}
							className={`flex-1 border border-gray-800 border-r-0 text-sm text-black rounded-l-full rounded-r-md py-1.5 px-4 shadow-md ${
								searchQuery.length > 0
									? "bg-yellow-100 opacity-100"
									: "bg-red-50 opacity-70"
							} focus:bg-yellow-100 focus:opacity-100 focus:outline-none`}
							onChange={handleInputChange}
						/>
						<button
							className="flex items-center w-10 justify-center bg-red-700 border border-gray-800 border-l-0 text-gray-100 rounded-r-full rounded-l-md py-1.5 shadow-md"
							onClick={searchQuery ? clearSearch : null} // Clear search if there's a value
						>
							{searchQuery ? (
								<ClearIcon
									className="text-white"
									sx={{
										fontSize: 22,
										paddingBottom: "1px",
										paddingRight: "3px",
									}}
								/>
							) : (
								<SearchIcon
									className="text-white"
									sx={{ fontSize: 24, paddingTop: "2px" }}
								/>
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
