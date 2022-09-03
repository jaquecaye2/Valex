import { Router } from "express";
import { createCard } from "../controllers/cardController";
import { validateSchema } from "../middlewares/validateSchema";
import { validateCompany } from "../middlewares/validateCompany";
import { validateEmployee } from "../middlewares/validateEmployee";

const router = Router();

router.post("/create-card/:id/:type", validateCompany, validateEmployee, createCard)



export default router