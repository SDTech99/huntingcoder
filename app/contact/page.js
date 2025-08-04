import ContactClient from './ContactClient';

async function getContacts() {
  const res = await fetch('http://localhost:3000/api/contact', {
    cache: 'no-store', 
  });
  const contacts = await res.json();
  return contacts;
}

export default async function ContactPage() {
  const contacts = await getContacts();

  return <ContactClient contacts={contacts} />;
}
