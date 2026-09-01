import { useState, useEffect } from "react"
import GenericForm from "../share/GenericForm"
import DataTable from "../share/DataTable"
import FormModal from "../share/FormModal"
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../services/category.service"

export default function Category(){

    const categoryFields = [
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
            placeholder: "Name"
        },
        {
            name: "description",
            label: "Description",
            type: "textarea",
            required: true,
            placeholder: "Description"
        },
    ]

    const categoryColumns = [
        {
            key: "name",
            label: "Name"
        },
        {
            key: "description",
            label: "Description"
        },
        {
            key: "action",
            label: "Action"
        },
    ]

    const categoryDto = {
        name: "",
        description: ""
    }

    const [categories, setCategories] = useState([])

    const [editingId, setEditingId] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form, setForm] = useState(categoryDto)

    useEffect(() => {
        async function fetchData() {
            const categories = await getAllCategories()
            setCategories(categories.data)
        }
        fetchData()
    }, [])
    
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const clearForm = () => setForm(categoryDto)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId){
            await updateCategory(editingId, form)
        } else {
            await createCategory(form)
        }
        const allCategories = await getAllCategories()
        setCategories(allCategories.data)
        console.log("Submitted!")
        clearForm()
        setEditingId(null)
        setIsModalOpen(false);
    }
    
    const handleUpdate = async (category) => {
        const originalCategory = await getCategoryById(category.id);
        setForm(originalCategory.data);
        setEditingId(category.id)
        setIsModalOpen(true);
    }

    const handleDelete = async (category) => {
        const ok = confirm("Are you sure you want to delete this category?")
        if (!ok) {
            return
        }
        await deleteCategory(category.id)
        const allCategories = await getAllCategories();
        setCategories(allCategories.data);
    }

    return (
        <div className="p-6">
            <DataTable
                columns={categoryColumns}
                data={categories}
                onAdd={() => {
                    clearForm()
                    setEditingId(null)
                    setIsModalOpen(true)
                }}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                entity="Categories" 
            />
            <FormModal 
                    isOpen={isModalOpen} 
                    onClose={() => {
                        setIsModalOpen(false)
                        clearForm()
                    }} 
                    title={editingId ? "Update Category" : "Create Category"}
                >
                    <GenericForm
                        fields={categoryFields}
                        values={form}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    ></GenericForm>
                </FormModal>
        </div>
    )
}