import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import { environment } from './../common/environments';
import { validateCPF } from './../common/validators';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    cpf: {
      required: false,
      type: String,
      validate: {
        message: '{PATH}: Invalid CPF ({VALUE})',
        validator: validateCPF
      }
    },
    email: {
      match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      required: true,
      type: String,
      unique: true
    },
    gender: {
      enum: ['Female', 'Male'],
      required: false,
      type: String
    },
    name: {
      maxlength: 80,
      minlength: 3,
      required: true,
      type: String
    },
    password: {
      required: true,
      select: false,
      type: String
    }
  },
  { versionKey: false }
);

const hashPassword = (obj, next) => {
  bcrypt
    .hash(obj.password, environment.security.saltRounds)
    .then(hash => {
      obj.password = hash;
      next();
    })
    .catch(next);
};

const saveMiddleware = function(next) {
  const document: User = this;

  if (!document.isModified('password')) {
    next();
  } else {
    hashPassword(document, next);
  }
};

// tslint:disable-next-line:only-arrow-functions
const updateMiddleware = function(next) {
  if (this.getUpdate().password) {
    hashPassword(this.getUpdate(), next);
  }
};

userSchema.pre('save', saveMiddleware);

userSchema.pre('findOneAndUpdate', updateMiddleware);

userSchema.pre('update', updateMiddleware);

export const User = mongoose.model<IUser>('User', userSchema);
