// Formulario para crear/editar itemss

// src/app/api/middleware/auth.js



//import { authenticateUser } from '../middleware/auth'; // Asegúrate de que esta ruta sea correcta
import prisma from '../../lib/prisma';

export const GET = authenticateUser(async (req, res) => {
  try {
    const { category, inStock } = req.query;
    const items = await prisma.item.findMany({
      where: {
        ...(category && { category }),
        ...(inStock && { inStock: true }),
      },
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
});

export const POST = authenticateUser(async (req, res) => {
  try {
    const { name, description, quantity } = req.body;
    const newItem = await prisma.item.create({
      data: {
        name,
        description,
        quantity,
        userId: req.user.id, // Assuming req.user contains user information
      },
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating item' });
  }
});



