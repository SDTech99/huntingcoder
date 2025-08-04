let contactList = [];

export async function GET() {
  return Response.json(contactList);
}

export async function POST(req) {
  const body = await req.json();
  const newContact = { ...body, id: Date.now() };
  contactList.push(newContact);
  return Response.json(newContact);
}

export async function PUT(req) {
  const updated = await req.json();
  contactList = contactList.map((c) => (c.id === updated.id ? updated : c));
  return Response.json(updated);
}

export async function DELETE(req) {
  const { id } = await req.json();
  contactList = contactList.filter((c) => c.id !== id);
  return Response.json({ success: true });
}