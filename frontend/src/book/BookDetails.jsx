import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById } from "../services/book.service";
import { getAllAuthors } from "../services/author.service";
import { getAllCategories } from "../services/category.service";

export default function BookDetails(){

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const [book, setBook] = useState(null);
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const { id } = useParams();

    useEffect(()=> {
        async function fetchData() {
            try {
                const [bookRes, allAuthors, allCategories] = await Promise.all([
                    getBookById(id),
                    getAllAuthors(),
                    getAllCategories()
                ]);

                setBook(bookRes.data);
                setAuthors(allAuthors.data);
                setCategories(allCategories.data);

            } catch (error) {
                console.error("Failed to fetch book data:", error);
            }
        }

        fetchData();
    }, [id])

    if (!book) {
        return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
        );
    }

    const authorName = authors.find((author) => author.id === book.authorId)?.name || "Unknown";
    const categoryName = categories.find((category) => category.id === book.categoryId)?.name || "General";

    return (
        <div className="container mx-auto px-4 md:px-12 py-10 max-w-6xl">
            <button className="btn btn-neutral mb-6 gap-2" onClick={() => navigate(-1)}>
                Back
            </button>

        <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 md:p-10">
            
            {/* Cover Image */}
                <div className="flex justify-center items-start">
                    <img
                    src={`http://localhost:8080/api/book/${id}/cover-image`}
                    alt={book.name}
                    className="w-64 md:w-80 rounded-lg shadow-lg object-cover max-h-[480px]"
                    />
                </div>

                {/* Details Content */}
                <div className="flex flex-col gap-6">
                    <h1 className="text-3xl md:text-4xl font-bold">{book.name}</h1>

                    <div className="space-y-2 text-base">
                    <p>
                        <span className="font-semibold text-base-content/70">Author:</span>{" "}
                        <span className="font-medium">{authorName}</span>
                    </p>
                    <p>
                        <span className="font-semibold text-base-content/70">Category:</span>{" "}
                        <span className="badge badge-outline ml-1">{categoryName}</span>
                    </p>
                    </div>

                    <div>
                    <p className="text-sm font-medium text-base-content/60 uppercase tracking-wide">
                        Price
                    </p>
                    <p className="text-3xl font-extrabold text-primary">
                        ${Number(book.price || 0).toFixed(2)}
                    </p>
                    </div>

                    <div>
                    <h2 className="text-lg font-semibold mb-2">Description</h2>
                    <p className="text-base-content/70 leading-relaxed text-sm md:text-base whitespace-pre-line">
                        {book.description || "No description provided."}
                    </p>
                    </div>

                    {user && (<div className="mt-auto pt-4">
                                <button className="btn btn-primary w-full text-base">
                                    Buy Book
                                </button>
                            </div>
                    )}

                </div>
                </div>
            </div>  
        </div>
    );
}