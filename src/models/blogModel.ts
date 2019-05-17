import * as mongoose from 'mongoose';
import { AuthorSchema } from '../models/authorModel';

const Schema = mongoose.Schema;
const Author = mongoose.model('Author', AuthorSchema);

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
  },
  img: {
    name: {
      type: String
    },
    suffix : {
      type: String
    },
    fp : {
      type: String
    }
  }
},
{
  collection: 'posts'
});