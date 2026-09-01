import { useState, useEffect } from "react";
import { getAllBooks } from "../services/book.service";
import { useNavigate } from "react-router-dom";

export default function Home(){

    const [books, setBooks] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            const response = await getAllBooks()
            setBooks(response.data)
        }
        fetchData()
    }, [])

    return (
        <div className="container mx-auto px-20 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Featured Books</h1>

            {/* 5-Column Grid on large screens */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-20">
                {books.map((book) => (
                <div
                    key={book.id}
                    className="card bg-base-100 shadow-md border border-base-200 overflow-hidden cursor-pointer 
                            transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-xl"
                            onClick={() => navigate(`/books/${book.id}`)}
                >
                    {/* Book Cover Image */}
                    <figure className="h-70 bg-base-200 overflow-hidden">
                        {book.coverImage ? (
                            <img
                            src={`http://localhost:8080/api/book/${book.id}/cover-image`}
                            alt={book.name}
                            className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-base-content/40 font-semibold text-sm">
                            No Cover
                            </div>
                        )}
                    </figure>

                    {/* Book Details */}
                    <div className="card-body p-4 gap-1 text-center">
                        <h2 className="card-title text-base line-clamp-1">
                            {book.name}
                        </h2>
                        {book.price !== undefined && (
                            <p className="text-primary font-bold text-sm">
                            ${Number(book.price).toFixed(2)}
                            </p>
                        )}
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}