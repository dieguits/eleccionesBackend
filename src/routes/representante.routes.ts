import { Router } from "express";
import { getRepresents, createRepresent } from "../controllers/representante.controller";

const router = Router();

router.route("/").get(getRepresents).post(createRepresent);

export default router;
