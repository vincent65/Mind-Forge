import {Router} from 'express';
import userRoutes from './user-routes.js';
import chatRoutes from './chat-routes.js';

//app router redirects where all the requests and messages go
//makes sure that they go to the right place, user, chatbot, etc. 

//domain/api/v1/
const appRouter = Router();

appRouter.use("/user", userRoutes);  //domain/api/v1/user
appRouter.use("/chats", chatRoutes); //domain/api/v1/chats

export default appRouter;