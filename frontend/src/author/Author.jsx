import { useState, useEffect } from "react"
import GenericForm from "../share/GenericForm"
import DataTable from "../share/DataTable"
import FormModal from "../share/FormModal"
import { createAuthor, deleteAuthor, getAllAuthors, getAuthorById, updateAuthor } from "../services/author.service"



export default function Author(){

    const authorFields = [
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
            placeholder: "Name"
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            required: true,
            placeholder: "abc@gmail.com"
        },
        {
            name: "country",
            label: "Country",
            type: "text",
            required: true,
            placeholder: "Country"
        }
    ]

    const authorColumns = [
        {
            key: "name",
            label: "Name"
        },
        {
            key: "email",
            label: "Email"
        },
        {
            key: "country",
            label: "Country"
        },
        {
            key: "action",
            label: "Action"
        }
    ]

    const authorDto = {
        name: "",
        email: "",
        country: "",
    }

    const [authors, setAuthors] = useState([])

    const [editingId, setEditingId] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form, setForm] = useState(authorDto)

    const [searchValue, setSearchValue] = useState("");

    const filteredAuthor = authors.filter(author => author.name.toLowerCase().includes(searchValue.toLowerCase()));

    useEffect(() => {
        async function fetchData() {
            const author = await getAllAuthors()
            setAuthors(author.data)
        }
        fetchData()
    }, [])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const clearForm = () => setForm(authorDto)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId){
            await updateAuthor(editingId, form)
        } else {
            await createAuthor(form)
        }
        const allAuthors = await getAllAuthors()
        setAuthors(allAuthors.data)
        console.log("Submitted!")
        clearForm()
        setEditingId(null)
        setIsModalOpen(false);
    }

    const handleUpdate = async (author) => {
        const originalAuthor = await getAuthorById(author.id);
        setForm(originalAuthor.data);
        setEditingId(author.id)
        setIsModalOpen(true);
    }

    const handleDelete = async (author) => {
        const ok = confirm("Are you sure you want to delete this author?")
        if (!ok) {
            return
        }
        await deleteAuthor(author.id)
        const allAuthors = await getAllAuthors();
        setAuthors(allAuthors.data);
    }

    return (
        <div className="p-6">
            <DataTable
                columns={authorColumns}
                data={filteredAuthor}
                onAdd={() => {
                    clearForm()
                    setEditingId(null)
                    setIsModalOpen(true)
                }}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                entity="Authors" 
                searchValue={searchValue}
                onSearch={setSearchValue}
                searchPlaceholder="Search author name..."
            />
            <FormModal 
                    isOpen={isModalOpen} 
                    onClose={() => {
                        setIsModalOpen(false)
                        clearForm()
                    }} 
                    title={editingId ? "Update Author" : "Create Author"}
                >
                    <GenericForm
                        fields={authorFields}
                        values={form}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    ></GenericForm>
            </FormModal>
        </div>
    )
}