import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const BlogSchema = new Schema({
  authorAlias: {
    type: String
  },
  authorName: {
    type: String
  },
  authorEmail: {
    type: String
  },
  postCategory: {
    type: Array,
    default: ['development']
  },
  postContent:{
    type: String
  },
  postDate: {
    type: Date,
    default: Date.now
  },
  postImage: {
    type: String,
    default: `<img src="cool-cat.png>"`
  },
  postTags: {
    type: Array
  },
  postTitle: {
    type: String
  }
})