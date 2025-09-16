import type { Request, Response } from 'express';
import { Product } from '../../models/Product.js';

export async function createProduct(request: Request, response: Response) {
  try {
    const imagePath = request.file?.filename;
    const { name, description, price, category, ingredients } = request.body;
    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
      imagePath
    });
    response.status(201).json({ product });
  } catch {
    response.sendStatus(500);
  }
}
