/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

function AddSchool() {
    const [form, setForm] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        contact: "",
        image: "",
        email_id: ""
    });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("address", form.address);
        formData.append("city", form.city);
        formData.append("state", form.state);
        formData.append("contact", form.contact);
        formData.append("email_id", form.email_id);

        if (form.image) {
            formData.append("image", form.image);
        }

        try {
            const res = await axios.post(
                `${API_URL}/schools/createSchool`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            toast.success("School added successfully!");
            setForm({
                name: "",
                address: "",
                city: "",
                state: "",
                contact: "",
                image: "",
                email_id: "",
            });
        } catch (err) {
            toast.error("Failed to add school");
            console.error("Error while adding school:", err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container">
            <h2 className="school">Add New School</h2>
            <form onSubmit={handleSubmit} className="school-form">
                <div className="form-group">
                    <label htmlFor="name">School Name</label>
                    <input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter school name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        id="address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input
                            id="city"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            placeholder="Enter city"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="state">State</label>
                        <input
                            id="state"
                            name="state"
                            value={form.state}
                            onChange={handleChange}
                            placeholder="Enter state"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="contact">Contact Number</label>
                    <input
                        id="contact"
                        name="contact"
                        value={form.contact}
                        onChange={handleChange}
                        placeholder="Enter contact number"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        name="email_id"
                        type="email"
                        value={form.email_id}
                        onChange={handleChange}
                        placeholder="Enter email address"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">School Image</label>
                    <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            setForm({ ...form, image: e.target.files[0] });
                        }}
                    />
                </div>

                <button type="submit" className="submit-btn" disabled={submitting}>
                    {submitting ? "Adding School..." : "Add School"}
                </button>
            </form>
        </div>
    );
}

export default AddSchool;