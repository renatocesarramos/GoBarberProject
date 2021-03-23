import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/Users';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

type Response = { user: User; token: string };

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorret email/password combination', 401);
    }

    const passwordMath = await compare(password, user.password);

    if (!passwordMath) {
      throw new AppError('Incorret email/password combination', 401);
    }

    const { expireIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expireIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
