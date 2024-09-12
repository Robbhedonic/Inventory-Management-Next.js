 
 
 
//  //src/app/api/items/route.js

// import prisma from '../../../lib/prisma';
// import jwt from 'jsonwebtoken';

// const authenticateUser = async (request) => {
//   const token = request.headers.get('Authorization')?.split(' ')[1];
//   if (!token) {
//     return null;
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     return decoded.userId;
//   } catch (error) {
//     return null;
//   }
// };

// export async function GET(request) {
//   const userId = await authenticateUser(request);
//   if (!userId) {
//     return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
//   }

//   const items = await prisma.item.findMany({
//     where: { userId: userId },
//   });

//   return new Response(JSON.stringify(items), { status: 200 });
// }

// export async function POST(request) {
//   const userId = await authenticateUser(request);
//   if (!userId) {
//     return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
//   }

//   const { name, description, quantity, inStock, category } = await request.json();
//   const item = await prisma.item.create({
//     data: { name, description, quantity, inStock, category, userId },
//   });

//   return new Response(JSON.stringify(item), { status: 201 });
// }




 // src/app/api/items/route.js

import prisma from '../../../lib/prisma';
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

export async function GET(request) {
  const userId = await authenticateUser(request);
  if (!userId) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  const items = await prisma.item.findMany({
    where: { userId: userId },
  });

  return new Response(JSON.stringify(items), { status: 200 });
}

export async function POST(request) {
  const userId = await authenticateUser(request);
  if (!userId) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  const { name, description, quantity, inStock, category, imageUrl } = await request.json(); // Incluye imageUrl
  const item = await prisma.item.create({
    data: { name, description, quantity, inStock, category, imageUrl, userId }, // Crea el ítem con imageUrl
  });

  return new Response(JSON.stringify(item), { status: 201 });
}