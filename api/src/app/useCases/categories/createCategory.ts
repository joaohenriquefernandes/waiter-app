import type { Request, Response } from 'express';
import { Category } from '../../models/Category.js';

export async function createCategory(request: Request, response: Response) {
  try {
    const { name, icon } = request.body;
    const category = await Category.create({ name, icon });
    response.status(201).json({ category });
  } catch {
    response.sendStatus(500);
  }
}
