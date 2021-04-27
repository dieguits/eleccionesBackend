"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var voto_controller_1 = require("../controllers/voto.controller");
var router = express_1.Router();
router.route('/').post(voto_controller_1.createVote);
router.route('/:email').get(voto_controller_1.canVote);
exports.default = router;
