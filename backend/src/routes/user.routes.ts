import { Router } from 'express';
import multer from 'multer';
import CreateUserServices from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import uploadConfig from '../config/upload';

import unsereAuthenticate from '../middlewares/unsureAuthenticated';

interface UserResponse {
  id: string;
  name: string;
  email: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
  avatar: string;
}

const userRouter = Router();
const upload = multer(uploadConfig);

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

userRouter.patch(
  '/avatar',
  unsereAuthenticate,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    const userResponse: UserResponse = { ...user };

    delete userResponse.password;

    return response.json(userResponse);
  },
);

export default userRouter;
