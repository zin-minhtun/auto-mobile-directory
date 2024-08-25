// import React from "react";

export default function PaginationButtons({
	currentPage,
	totalPages,
	setCurrentPage,
    setPageChanged,
}) {
	const handleClickedChange = (newPage) => {
		if (newPage >= 0 && newPage < totalPages) {
			setCurrentPage(newPage);
            setPageChanged(true);
		}
	};

	return (
		<div className="flex justify-between items-center my-6 mx-3">
			<button
				onClick={() => handleClickedChange(currentPage - 1)}
				disabled={currentPage === 0}
				className={`bg-gray-800 text-gray-100 px-4 py-2 rounded-md mx-1 ${
					currentPage === 0 ? "bg-gray-400" : ""
				}`}
			>
				Prev
			</button>
			<span className="text-gray-700">
				Page {currentPage + 1} of {totalPages}
			</span>
			<button
				onClick={() => handleClickedChange(currentPage + 1)}
				disabled={currentPage >= totalPages - 1}
				className={`bg-gray-800 text-gray-100 px-4 py-2 rounded-md mx-1 ${
					currentPage >= totalPages - 1 ? "bg-gray-400" : ""
				}`}
			>
				Next
			</button>
		</div>
	);
}
