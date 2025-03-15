let cadastros = [];

//get
export async function GET() {
  return new Response(JSON.stringify(cadastros));
}

//post
export async function POST(req) {
  const { firstName, lastName, contact } = await req.json();
  const newUser = {
    firstName,
    lastName,
    contact,
  };

  cadastros.push(newUser);

  return new Response(JSON.stringify(newUser), { status: 201 });
}
//put
export async function PUT(req) {
  const { firstName, lastName, contact } = await req.json();
  const userIndex = cadastros.findIndex(
    (cadastro) => cadastro.firstName === firstName
  );

  if (userIndex === -1) {
    return new Response("Erro ao editar!", { status: 404 });
  }
  cadastros[userIndex] = { firstName, lastName, contact };

  return new Response(JSON.stringify(cadastros[userIndex]), { status: 201 });
}
//delete
export async function DELETE(req) {
  const { firstName } = await req.json();
  const userIndex = cadastros.findIndex(
    (cadastro) => cadastro.firstName === firstName
  );

  if (userIndex === -1) {
    return new Response("User não encontrado.", { status: 404 });
  }
  cadastros.splice(userIndex, 1);
  return new Response(null, { status: 204 });
}
