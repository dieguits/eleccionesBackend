"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var representante_controller_1 = require("../controllers/representante.controller");
var router = express_1.Router();
router.route("/").get(representante_controller_1.getRepresents).post(representante_controller_1.createRepresent);
exports.default = router;
