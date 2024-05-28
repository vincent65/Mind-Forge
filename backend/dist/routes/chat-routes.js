import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { generateChatComnpletion } from "../controllers/chat-controllers.js";
const chatRoutes = Router();
//protected api
chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken, generateChatComnpletion);
export default chatRoutes;
//# sourceMappingURL=chat-routes.js.map