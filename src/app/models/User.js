import mongoose from 'mongoose';
import timeZone from 'mongoose-timezone';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import authConfig from '../../config/auth';

const UserSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    senha: {
      type: String,
      required: true,
    },
    telefones: [
      {
        numero: {
          type: String,
          required: true,
        },
        ddd: {
          type: String,
          required: true,
        },
      },
    ],
    data_criacao: { type: Date },
    data_atualizacao: { type: Date },
    ultimo_login: {
      type: Date,
      default: Date.now,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: 'data_criacao', updatedAt: 'data_atualizacao' },
  }
);

UserSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('senha')) next();

  this.senha = await bcrypt.hash(this.senha, 8);
});

UserSchema.plugin(timeZone);

UserSchema.methods = {
  compareHashed(pass) {
    return bcrypt.compare(pass, this.senha);
  },

  generateToken() {
    this.token = jwt.sign({ id: this.id }, authConfig.secret, {
      expiresIn: 1800,
    });

    return this.token;
  },
};

export default mongoose.model('users', UserSchema);
