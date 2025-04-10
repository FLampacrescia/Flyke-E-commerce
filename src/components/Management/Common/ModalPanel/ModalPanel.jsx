import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./ModalPanel.css";
import toast from "react-hot-toast";

const API_URL = "https://67dc785fe00db03c40682c8c.mockapi.io/";

export default function ModalPanel({ closeModal, getData, dataToEdit, selectedSection }) {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (dataToEdit) {
            if (selectedSection === "products") {
                setValue("title", dataToEdit.title);
                setValue("image", dataToEdit.image);
                setValue("description", dataToEdit.description);
                setValue("price", dataToEdit.price);
            } else {
                setValue("name", dataToEdit.name);
                setValue("lastName", dataToEdit.lastName);
                setValue("email", dataToEdit.email);
                setValue("isAdmin", dataToEdit.isAdmin.toString());
            }
        } else {
            reset();
        }
    }, [dataToEdit, setValue, reset, selectedSection]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const endpoint = selectedSection === "products" ? "products" : "users";
            const url = dataToEdit ? `${API_URL}/${endpoint}/${dataToEdit.id}` : `${API_URL}/${endpoint}`;
            const method = dataToEdit ? "PUT" : "POST";

            if (selectedSection === "users") {
                data.isAdmin = data.isAdmin === "true";
            }

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, createdAt: new Date().toISOString() })
            });

            if (response.ok) {
                getData();
                toast.success(dataToEdit ? `${selectedSection === "products" ? "Producto" : "Usuario"} editado correctamente.`
                    : `${selectedSection === "products" ? "Producto" : "Usuario"} agregado correctamente.`);
                closeModal();
                reset();
            } else {
                toast.error("Error al guardar los datos.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error en la solicitud.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="admin-modal-title-container">
                    <h2 className="admin-modal-upper-title">
                        {dataToEdit ? `Editar ${selectedSection === "products" ? "Producto" : "Usuario"}` : `Agregar Nuevo ${selectedSection === "products" ? "Producto" : "Usuario"}`}
                    </h2>
                </div>
                <form className="admin-modal-form" onSubmit={handleSubmit(onSubmit)}>
                    {selectedSection === "products" ? (
                        <>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label" htmlFor="title">Nombre del producto</label>
                                <input className="admin-modal-input" type="text" id="title" {...register("title", { required: true })} />
                            </div>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label" htmlFor="image">Imagen (URL)</label>
                                <input className="admin-modal-input" type="url" id="image" {...register("image", { required: true })} />
                            </div>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label" htmlFor="description">Descripción</label>
                                <textarea className="admin-modal-input admin-modal-textarea" id="description" {...register("description", { required: true })} />
                            </div>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label" htmlFor="price">Precio</label>
                                <input className="admin-modal-input" type="number" id="price" {...register("price", { required: true })} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label" htmlFor="name">Nombre</label>
                                <input className="admin-modal-input" type="text" id="name" {...register("name", { required: true })} />
                            </div>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label" htmlFor="lastName">Apellido</label>
                                <input className="admin-modal-input" type="text" id="lastName" {...register("lastName", { required: true })} />
                            </div>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label" htmlFor="email">Email</label>
                                <input className="admin-modal-input" type="email" id="email" {...register("email", { required: true })} />
                            </div>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label" htmlFor="isAdmin">Administrador</label>
                                <select className="admin-modal-input" id="isAdmin" {...register("isAdmin", { required: true })}>
                                    <option value="true">Sí</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                        </>
                    )}

                    <div className="modal-buttons">
                        <button className="button btn-secondary" type="button" onClick={closeModal} disabled={loading}>Cancelar</button>
                        <button className="button btn-primary" type="submit" disabled={loading}>{loading ? "Guardando..." : "Guardar"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}