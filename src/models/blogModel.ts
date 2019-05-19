import * as mongoose from 'mongoose';
import { AuthorSchema } from '../models/authorModel';
import { ImageSchema } from '../models/imageModel';

const Schema = mongoose.Schema;
const Author = mongoose.model('Author', AuthorSchema);
const Image = mongoose.model('Image', ImageSchema);

export const BlogSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId
  },
  title: {
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  },
  img: {
    type: Schema.Types.ObjectId,
    ref: 'Image'
  },
  category: {
    type: Array,
    default: ['development']
  },
  content:{
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  tags: {
    type: Array
  }
},
{
  collection: 'posts'
});