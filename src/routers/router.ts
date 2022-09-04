import { Router } from "express";
import { createCard, activateCard, viewBalance, blockCard, unlockCard } from "../controllers/cardController";
import { rechargeCard } from "../controllers/rechargeController"
import { purchase } from "../controllers/purchaseController";

import { validateSchema } from "../middlewares/validateSchema";
import { validateCompany } from "../middlewares/validateCompany";
import { validateEmployee } from "../middlewares/validateEmployee";
import { validateCard } from "../middlewares/validateCard"

import activateCardSchema from "../schemas/activateCardSchema";
import passwordSchema from "../schemas/passwordSchema";
import amountSchema from "../schemas/amountSchema";
import purchaseSchema from "../schemas/purchaseSchema"

const router = Router();

router.post("/create-card/:idEmployee/:type", validateCompany, validateEmployee, createCard)

router.post("/activate-card/:id", validateCard, validateSchema(activateCardSchema), activateCard)

router.get("/view-balance/:id", validateCard, viewBalance)

router.post("/block-card/:id", validateCard, validateSchema(passwordSchema), blockCard)

router.post("/unlock-card/:id", validateCard, validateSchema(passwordSchema), unlockCard)

router.post("/recharge-card/:id", validateCompany, validateCard, validateSchema(amountSchema), rechargeCard)

router.post("/purchase/:id", validateCard, validateSchema(purchaseSchema), purchase)

export default router