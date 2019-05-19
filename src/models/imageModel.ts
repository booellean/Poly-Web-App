import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ImageSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId
  },
  name: {
    type: String
  },
  suffix: {
    type: String
  },
  fp : {
    type: String
  },
  alt : {
    type: String
  }
},
{
  collection: 'images'
});