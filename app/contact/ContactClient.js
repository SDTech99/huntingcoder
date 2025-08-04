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
        <div className="p-6">
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-4 text-center">Contact Us</h1>
                    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                        <input
                            type="text"
                            placeholder="Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="border p-2 w-full"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="border p-2 w-full"
                        />
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                            {form.id ? 'Update' : 'Add'} Contact
                        </button>
                    </form>
                </div>
            </div>
            <ul className="space-y-2">
                {contacts.map((c) => (
                    <li key={c.id} className="border p-4 flex justify-between items-center">
                        <div>
                            <p><strong>{c.name}</strong></p>
                            <p>{c.email}</p>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => handleEdit(c)}
                                className="bg-yellow-400 text-black px-2 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(c.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}