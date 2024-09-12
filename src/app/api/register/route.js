// Registro de usuarios

// src/app/api/register/route.js
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request) {
  const { name, email, password } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
  return new Response(JSON.stringify(user), { status: 201 });
}




// // src/app/api/register/route.js
// import prisma from '../../../lib/prisma';
// import bcrypt from 'bcryptjs'; // Asegúrate de usar bcryptjs en lugar de bcrypt

// export async function POST(request) {
//   const { name, email, password } = await request.json();

//   // Verifica si el usuario ya existe
//   const existingUser = await prisma.user.findUnique({ where: { email } });
//   if (existingUser) {
//     return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
//   }

//   // Encripta la contraseña
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Crea el nuevo usuario
//   try {
//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//       },
//     });

//     return new Response(JSON.stringify(user), { status: 201 });
//   } catch (error) {
//     console.error('Error creating user:', error.message);
//     return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
//   }
// }