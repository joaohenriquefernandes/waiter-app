import { model, Schema } from 'mongoose';

export const Category = model('Category', new Schema({
  name: {
    type: String,
    require: true
  },
  icon: {
    type: String,
    require: true
  },
}));
