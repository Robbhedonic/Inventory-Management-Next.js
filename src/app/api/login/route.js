// Login de usuarios



// src/app/api/login/route.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../../lib/prisma'; // Asegúrate de que el export sea default

export async function POST(request) {
  const { email, password } = await request.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return new Response(
      JSON.stringify({ message: 'Invalid email or password' }),
      { status: 401 }
    );
  }

  // Crea y firma el token JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return new Response(
    JSON.stringify({ token }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}