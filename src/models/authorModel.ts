import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const AuthorSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId
  },
  name: {
    type: String
  },
  alias: {
    type: String
  },
  contact: {
    address : {
      street: {
        type: String
      },
      apt: {
        type: String
      },
      city: {
        type: String
      },
      state: {
        type: String
      },
      zip: {
        type: Number
      }
    },
    email: {
      type: String
    },
    phone: {
      type: Number
    }
  },
  about: {
    site: {
      type: String
    },
    bio: {
      type: String
    },
    dob: {
      type: Date
    },
    profession: {
      type: String
    }
  },
  perm: {
    type: String
  }
},
{
  collection: 'users'
});