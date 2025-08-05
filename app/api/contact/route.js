import { writeFileSync, existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync } from 'fs';
import { join } from 'path';

let contactList = [];
const dir = join(process.cwd(), 'contactData');

export async function GET() {

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  // Read all JSON files from contactData directory
  const files = readdirSync(dir);
  contactList = files.map((file) => {
    const filePath = join(dir, file);
    const data = readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  });

  return Response.json(contactList);
}

export async function POST(req) {
  const body = await req.json();
  const newContact = { ...body, id: Date.now() };

  contactList.push(newContact);

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const filePath = join(dir, `${newContact.id}.json`);
  writeFileSync(filePath, JSON.stringify(newContact, null, 2));

  return Response.json(newContact);
}

export async function PUT(req) {
  const updated = await req.json();

  contactList = contactList.map((c) => (c.id === updated.id ? updated : c));

  const filePath = join(dir, `${updated.id}.json`);
  writeFileSync(filePath, JSON.stringify(updated, null, 2));

  return Response.json(updated);
}

export async function DELETE(req) {
  const { id } = await req.json();
  contactList = contactList.filter((c) => c.id !== id);

  const filePath = join(dir, `${id}.json`);
  if (existsSync(filePath)) {
    unlinkSync(filePath);
  }

  return Response.json({ success: true });
}
