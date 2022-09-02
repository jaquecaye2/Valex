import { Router } from "express";
import { battle, ranking } from "../controllers/controller";
import { validateSchema } from "../middlewares/validateSchema";
import { users } from "../schemas/users";

const router = Router();

router.post("/battle", validateSchema(users), battle)

router.get("/ranking", ranking)

export default router