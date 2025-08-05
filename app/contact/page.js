import ContactClient from './ContactClient';
import { existsSync, mkdirSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

async function getContacts() {
  const dir = join(process.cwd(), 'contactData');
  // Create directory if it doesn't exist
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    console.log('contactData folder created.');
    return []; // Return an empty array or handle as needed
  }
  const files = readdirSync(dir);
  
  const contacts = files.map((file) => {
    const content = readFileSync(join(dir, file), 'utf-8');
    return JSON.parse(content);
  });

  return contacts;
}

export default async function ContactPage() {
  let contacts =[];

  try {
    contacts = await getContacts();
  } catch (error) {
    console.error('Error loading contacts:', error);
  }

  return <ContactClient contacts={contacts} />;
}
