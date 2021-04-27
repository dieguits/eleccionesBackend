"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var representante_controller_1 = require("../controllers/representante.controller");
var cors_1 = __importDefault(require("cors"));
var router = express_1.Router();
router.route("/").get(representante_controller_1.getRepresents, cors_1.default()).post(representante_controller_1.createRepresent, cors_1.default());
exports.default = router;
