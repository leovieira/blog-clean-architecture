import { Router } from "express";

import UserController from "./controllers/user/UserController";
import PostController from "./controllers/post/PostController";

const userController = new UserController();
const postController = new PostController();

const routes = Router();

routes.post('/users', userController.add);
routes.post('/posts', postController.add);
routes.get('/posts', postController.list);
routes.get('/posts/:id', postController.find);

export default routes;
