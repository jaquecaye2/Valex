import { Router } from "express";
import { createCard, activateCard } from "../controllers/cardController";
import { validateSchema } from "../middlewares/validateSchema";
import { validateCompany } from "../middlewares/validateCompany";
import { validateEmployee } from "../middlewares/validateEmployee";
import { validateCard } from "../middlewares/validateCard"
import activateCardSchema from "../schemas/activateCardSchema";

const router = Router();

router.post("/create-card/:id/:type", validateCompany, validateEmployee, createCard)

router.post("/activate-card/:id", validateCard, validateSchema(activateCardSchema), activateCard)

export default router