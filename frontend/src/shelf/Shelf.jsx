import { useState, useEffect } from "react";
import { getShelfByUsername } from "../services/shelf.service";
import { getBookById, readBook } from "../services/book.service";

export default function Shelf() {
	const [shelves, setShelves] = useState([]);
	const [shelfToBookMap, setShelfToBookMap] = useState({});
	const [searchValue, setSearchValue] = useState("");

	const user = JSON.parse(localStorage.getItem("user") || "null");

	const filteredShelf = shelves.filter((shelf) => {
		const bookName = shelfToBookMap[shelf.bookId]?.name;

		return bookName
			? bookName.toLowerCase().includes(searchValue.toLowerCase())
			: false;
	});

	useEffect(() => {
		async function fetchData() {
			if (user != "null") {
				const response = await getShelfByUsername(user.username);
				setShelves(response.data);
				const uniqueBookIds = [
					...new Set(response.data.map((shelf) => shelf.bookId))
				];
				const bookEntries = await Promise.all(
					uniqueBookIds.map(async (bookId) => {
						const bookRes = await getBookById(bookId);
						return [bookId, bookRes.data];
					})
				);
				setShelfToBookMap(Object.fromEntries(bookEntries));
			}
		}

		fetchData();
	}, []);

	const handleReadBook = async (bookId) => {
		const blobRes = await readBook(bookId);
		const blobUrl = URL.createObjectURL(blobRes.data);
		window.open(blobUrl, "_blank");
		setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
	};

	return (
		<div className="container mx-auto px-20 py-8">
			<h1 className="text-3xl font-bold mb-4 text-center">My Books</h1>
			<div className="flex justify-end mb-10">
				<label className="input">
					<svg
						className="h-[1em] opacity-50"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
					>
						<g
							strokeLinejoin="round"
							strokeLinecap="round"
							strokeWidth="2.5"
							fill="none"
							stroke="currentColor"
						>
							<circle cx="11" cy="11" r="8"></circle>
							<path d="m21 21-4.3-4.3"></path>
						</g>
					</svg>
					<input
						type="text"
						className="grow"
						placeholder="Search by book name..."
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
				</label>
			</div>
			{shelves.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-24 text-center">
					<p className="text-xl font-medium text-base-content/60 mb-2">
						Your shelf is empty
					</p>
					<p className="text-sm text-base-content/40">
						Looks like you haven't added any books yet.
					</p>
				</div>
			) : filteredShelf.length === 0 ? (
				<div className="text-center py-20 text-base-content/60">
					No books found.
				</div>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-20">
					{filteredShelf.map((shelf) => (
						<div
							key={shelf.id}
							className="card bg-base-100 shadow-md border border-base-200 overflow-hidden cursor-pointer 
                            transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-xl"
							onClick={() => handleReadBook(shelf.bookId)}
						>
							<figure className="h-70 bg-base-200 overflow-hidden">
								{shelfToBookMap[shelf.bookId]?.coverImage ? (
									<img
										src={`http://localhost:8080/api/book/${shelf.bookId}/cover-image`}
										alt={shelfToBookMap[shelf.bookId]?.name || "Unknown"}
										className="w-full h-full object-cover"
									/>
								) : (
									<div className="flex items-center justify-center w-full h-full text-base-content/40 font-semibold text-sm">
										No Cover
									</div>
								)}
							</figure>

							<div className="card-body p-4 gap-1 text-center">
								<h2 className="card-title text-base line-clamp-1">
									{shelfToBookMap[shelf.bookId]?.name || "Unknown"}
								</h2>
								<p className="mt-3 text-gray-500 text-sm">Click to Read</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
