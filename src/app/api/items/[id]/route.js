

//src/app/api/items/[id]/route.js

import prisma from '../../../../lib/prisma';
import jwt from 'jsonwebtoken';

const authenticateUser = async (request) => {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    return null;
  }
};

export async function PUT(request, { params }) {
  const userId = await authenticateUser(request);
  if (!userId) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  const { id } = params;
  const { name, description, quantity, inStock, category } = await request.json();
  const item = await prisma.item.findUnique({ where: { id: Number(id) } });

  if (!item || item.userId !== userId) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 403 });
  }

  const updatedItem = await prisma.item.update({
    where: { id: Number(id) },
    data: { name, description, quantity, inStock, category },
  });

  return new Response(JSON.stringify(updatedItem), { status: 200 });
}

export async function DELETE(request, { params }) {
  const userId = await authenticateUser(request);
  if (!userId) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  const { id } = params;
  const item = await prisma.item.findUnique({ where: { id: Number(id) } });

  if (!item || item.userId !== userId) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 403 });
  }

  await prisma.item.delete({ where: { id: Number(id) } });
  return new Response(null, { status: 204 });
}