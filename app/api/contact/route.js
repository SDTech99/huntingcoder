import { writeFileSync, existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync } from 'fs';
import { join } from 'path';

let contactList = [];
const dir = join(process.cwd(), 'contactData');

async function getAllContacts() {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    return [];
  }

  const files = readdirSync(dir);
  return files.map((file) => {
    const filePath = join(dir, file);
    const data = readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  });
}

export async function GET() {

  contactList = await getAllContacts();
  return Response.json(contactList);
}

export async function POST(req) {
  const body = await req.json();
  contactList = await getAllContacts();
  const emailExists = contactList.some((c) => c.email.toLowerCase() === body.email.toLowerCase());

  if (emailExists) {
    return Response.json({ error: 'Email already exists' }, { status: 400 });
  }
  const newContact = { ...body, id: Date.now() };

  contactList.push(newContact);

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  // body.email = body.email.toLowerCase();
  const filePath = join(dir, `${newContact.id}.json`);
  writeFileSync(filePath, JSON.stringify(newContact, null, 2));

  return Response.json(newContact);
}

export async function PUT(req) {
  const updated = await req.json();
  contactList = await getAllContacts();

  contactList = contactList.map((c) => (c.id === updated.id ? updated : c));

  const filePath = join(dir, `${updated.id}.json`);
  writeFileSync(filePath, JSON.stringify(updated, null, 2));

  return Response.json(updated);
}

export async function DELETE(req) {
  const { id } = await req.json();
  contactList = await getAllContacts();

  contactList = contactList.filter((c) => c.id !== id);

  const filePath = join(dir, `${id}.json`);
  if (existsSync(filePath)) {
    unlinkSync(filePath);
  }

  return Response.json({ success: true });
}
