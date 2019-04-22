import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const BlogSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId
  },
  title: {
    type: String
  },
  authorId: {
    type: mongoose.Types.ObjectId
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