import { Schema, model, Types } from 'mongoose';

export default model(
  'User',
  new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    links: [{ type: Types.ObjectId, ref: 'Link' }],
  })
);
