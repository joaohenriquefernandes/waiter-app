import type { Request, Response } from 'express';
import { Product } from '../../models/Product.js';

export async function listProductsByCategory(request: Request, response: Response) {
  try {
    const { categoryId } = request.params;
    const products = await Product.find().where('category').equals(categoryId);
    response.json({ products });
  } catch {
    response.sendStatus(500);
  }
}
