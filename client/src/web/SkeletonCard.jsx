// import React from 'react'

// Skeleton card component
export function SkeletonCard() {
	return (
		<>
			<div className="flex border border-gray-300 items-center justify-center h-48 bg-gray-200 flex-shrink-0 animate-pulse">
				<div className="w-9 h-9 border-2 border-gray-300 border-t-gray-400/70 rounded-full animate-spin"></div>
			</div>
			<div className="p-3 h-20 border border-gray-300 text-gray-100 bg-gray-300 flex-shrink-0 animate-pulse">
				<div className="flex justify-between items-center mb-4">
					<div className="w-24 bg-gray-400/30 rounded-full h-1.5 overflow-hidden"></div>
					<div className="w-12 bg-gray-400/50 rounded-full h-3 overflow-hidden"></div>
				</div>
				<div className="flex justify-between items-center">
					<div className="w-20 bg-gray-400/30 rounded-full h-2.5 overflow-hidden"></div>
					<div className="w-14 bg-gray-400/30 rounded-full h-1 overflow-hidden"></div>
				</div>
			</div>
		</>
	);
}

// Skeleton card list component
export function SkeletonCardList() {
	return (
		<div className="border border-gray-300/50 rounded-lg overflow-hidden w-72 h-36 flex-shrink-0 animate-pulse bg-gray-200">
			<div className="flex">
				<div className="w-80 h-36 bg-gray-200"></div>
				<div className="pl-3 pr-2 w-full bg-gray-100 flex flex-col justify-center">
					<div className="h-2 bg-gray-200/70 rounded mb-2 w-28"></div>
					<div className="h-1.5 bg-gray-200/70 rounded mb-4 w-14"></div>
					<div className="h-1 bg-gray-200/70 rounded w-1/2"></div>
				</div>
			</div>
		</div>
	);
}
