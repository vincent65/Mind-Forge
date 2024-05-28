import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { deleteChats, generateChatComnpletion, sendChatsToUser } from "../controllers/chat-controllers.js";

const chatRoutes = Router();
//protected api
chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken, generateChatComnpletion);
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.delete("/delete", verifyToken, deleteChats);
export default chatRoutes;