import { Router } from 'express';
import CreateUserServices from '../services/CreateUserService';

interface UserResponse {
  id: string;
  name: string;
  email: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
}

const userRouter = Router();

userRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserServices();

    const user = await createUser.execute({ name, email, password });

    const userResponse: UserResponse = { ...user };

    delete userResponse.password;

    return response.json(userResponse);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default userRouter;
