'use client';
import { useState } from 'react';

export default function ContactClient({ contacts: initialContacts }) {
    const [contacts, setContacts] = useState(initialContacts);
    const [form, setForm] = useState({ name: '', email: '', id: null });

    const fetchContacts = async () => {
        const res = await fetch('/api/contact');
        const data = await res.json();
        setContacts(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email)
            return alert('Name and Email are required');
        const method = form.id ? 'PUT' : 'POST';
        await fetch('/api/contact', {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        setForm({ name: '', email: '', id: null });
        fetchContacts();
    };

    const handleDelete = async (id) => {
        await fetch('/api/contact', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        fetchContacts();
    };

    const handleEdit = (contact) => setForm(contact);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">📬 Contact Us</h1>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white py-3 rounded-lg font-semibold"
                    >
                        {form.id ? 'Update Contact' : 'Add Contact'}
                    </button>
                </form>

                {/* Contact List Section */}
                <div className="mt-10">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">📇 Contact List</h2>
                    <ul className="space-y-3">
                        {contacts.map((c) => (
                            <li key={c.id} className="bg-gray-50 p-4 rounded-lg shadow flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-medium text-gray-800">{c.name}</p>
                                    <p className="text-sm text-gray-600">{c.email}</p>
                                </div>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleEdit(c)}
                                        className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(c.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}