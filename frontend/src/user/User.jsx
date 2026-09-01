import { useState, useEffect } from "react";
import { getAllUsers, updateUser } from "../services/user.service";
import DataTable from "../share/DataTable";
import GenericForm from "../share/GenericForm";
import FormModal from "../share/FormModal";

export default function User(){

    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [form, setForm] = useState({});

    const passwordFields = [
        {
            name: "password",
            label: "New Password",
            type: "password",
            required: true,
            placeholder: "New Password"
        }
    ]

    const topUpFields = [
        {
            name: "amount",
            label: "Top Up Amount",
            type: "number",
            required: true,
            placeholder: "Amount",
            min: 0,
            step: "0.01"
        }
    ];

    const userColumns = [
        {
            key: "username",
            label: "Username"
        },
        {
            key: "email",
            label: "Email"
        },
        {
            key: "status",
            label: "Status",
            render: (user) => {
                const badgeStyles = {
                ACTIVE: "badge-success text-white",
                PENDING: "badge-warning text-black",
                REJECTED: "badge-error text-white",
                };

                const style = badgeStyles[user.status] || "badge-ghost";

                return (
                <span className={`badge ${style} font-medium text-xs`}>
                    {user.status || "UNKNOWN"}
                </span>
                );
            },
        },
        {
            key: "amount",
            label: "Amount",
            render: (user) => `$${Number(user.amount || 0).toFixed(2)}`
        },
        {
            key: "actions",
            label: "Action",
            render: (user) => {
                return (<div className="flex justify-center gap-2">
                    {user.status === "PENDING" && (<>
                        <button
                            type="button"
                            className="btn btn-sm btn-success"
                            onClick={() => onApprove(user.id)}
                        >
                            Approve
                        </button>

                        <button
                            type="button"
                            className="btn btn-sm btn-error"
                            onClick={() => onReject(user.id)}
                        >
                            Reject
                        </button>
                    </>
                    )}

                    {user.status === "ACTIVE" && (
                        <>
                            <button
                                type="button"
                                className="btn btn-sm btn-warning"
                                onClick={() => onResetPassword(user)}
                            >
                                Reset Password
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-primary mx-2"
                                onClick={() => onTopUp(user)}
                            >
                                Top Up
                            </button>
                        </>
                    )}

                    {user.status === "REJECTED" && (<p>-</p>)}
                </div>
            )}
        }
    ]

    useEffect(() => {
            async function fetchData() {
                const user = await getAllUsers();
                setUsers(user.data);
            }
            fetchData()
        }, [])    

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const onApprove = async (id) => {
        const user = users.find(user => user.id === id);
        const mod = JSON.parse(
            localStorage.getItem("user")
        )
        await updateUser(id, { ...user, status: "ACTIVE", approvedBy: mod.username, approvedDate: new Date()})
        const response = await getAllUsers();
        setUsers(response.data);
        
    }

    const onReject = async (id) => {
        const user = users.find(user => user.id === id);
        await updateUser(id, { ...user, status: "REJECTED"})
        const response = await getAllUsers();
        setUsers(response.data);
    }

    const onResetPassword = (user) => {
        setSelectedUser(user);

        setForm({
            password: ""
        });

        setModalType("RESET_PASSWORD");

        setIsModalOpen(true);
    };

    const onTopUp = (user) => {
        setSelectedUser(user);

        setForm({
            amount: ""
        });

        setModalType("TOP_UP");

        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = users.find(
            user => user.id === selectedUser.id
        );

        if (modalType === "RESET_PASSWORD") {

            await updateUser(selectedUser.id, {
                ...user,
                password: form.password,
                updatedDate: new Date()
            });

        } else if (modalType === "TOP_UP") {

            await updateUser(selectedUser.id, {
                ...user,
                amount: form.amount,
                updatedDate: new Date()
            });
        }

        const response = await getAllUsers();
        setUsers(response.data);

        // Reset modal
        setForm({});
        setSelectedUser(null);
        setModalType(null);
        setIsModalOpen(false);
    };

    return (
        <div className="p-6">
            <DataTable
                columns={userColumns}
                data={users}
                onDelete={() => {}}
                onUpdate={() => {}}
                entity="Users" 
            />
            <FormModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setForm({});
                    setSelectedUser(null);
                    setModalType(null);
                }}
                title={
                    modalType === "RESET_PASSWORD"
                        ? `Reset Password for ${selectedUser?.username}`
                        : `Top Up Amount for ${selectedUser?.username}`
                }
                maxWidth="max-w-md"
            >
                <GenericForm
                    fields={
                        modalType === "RESET_PASSWORD"
                            ? passwordFields
                            : topUpFields
                    }
                    values={form}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    gridCols="grid-cols-1"
                />
            </FormModal>
        </div>
    )
}