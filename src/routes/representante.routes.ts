import { Router } from "express";
import { getRepresents, createRepresent } from "../controllers/representante.controller";
import cors from 'cors';

const router = Router();

router.route("/").get(getRepresents, cors()).post(createRepresent, cors());

export default router;
