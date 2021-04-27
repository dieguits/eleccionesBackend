"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.canVote = exports.createVote = void 0;
var database_1 = require("../database");
var elector_1 = require("../interface/elector");
var som;
function createVote(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var newVote, data, flag;
        return __generator(this, function (_a) {
            newVote = req.body;
            data = {
                rpt: false,
                message: "",
            };
            som = -1;
            flag = true;
            if (newVote[0].elector_id != null) {
                didVote(newVote[0].elector_id);
                console.log("2. ingresooooooo :::::: ", som);
                setTimeout(function () {
                    console.log("3. ingresooooooo :::::: ", som);
                    if (newVote[0].elector_id != null && som == 0) {
                        console.log("SI PUEDE VOTAR");
                        var conn_1 = database_1.connect();
                        newVote.forEach(function (item) {
                            // if (item.elector_id) {
                            // 	electorId = item.elector_id;
                            // }
                            var rpt = conn_1.query("INSERT INTO VOTOS (represent_id) VALUES (?)", item.represent_id);
                            //console.log("INSERTO ???? :::: ", rpt);
                        });
                        conn_1.query("INSERT INTO WHOVOTE (elector_id) VALUES (?)", newVote[0].elector_id, function (err, rows) {
                            if (!err) {
                                console.log("WHOVOTE INSERTION:::: ", rows);
                            }
                        });
                        data.message = "Su voto fue registrado con exito.";
                        data.rpt = true;
                    }
                    else {
                        data.message = "Su votacion ya fue registrada, no esta permitido votar mas de dos veces.";
                        data.rpt = false;
                    }
                    return res.json({
                        data: data,
                    });
                }, 2000);
            }
            return [2 /*return*/];
        });
    });
}
exports.createVote = createVote;
function canVote(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, conn;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.params.email;
                    return [4 /*yield*/, database_1.connect()];
                case 1:
                    conn = _a.sent();
                    return [4 /*yield*/, conn.query("SELECT * FROM ELECTORES WHERE email = ?", email, function (err, rows, fields) { return __awaiter(_this, void 0, void 0, function () {
                            var elector;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        elector = new elector_1.Elector();
                                        if (!!err) return [3 /*break*/, 3];
                                        if (!rows[0]) return [3 /*break*/, 2];
                                        console.log("the elector is:::::: ", rows[0].id);
                                        elector.id = rows[0].id;
                                        elector.email = rows[0].email;
                                        return [4 /*yield*/, conn.query("SELECT * from WHOVOTE WHERE elector_id = ?", rows[0].id, function (err, rows, fields) {
                                                if (rows[0]) {
                                                    console.log("PAILA USTED YA VOTO:::", rows[0]);
                                                    elector.id = 0;
                                                    elector.email = "";
                                                    console.log("PAILA ELECTOR:::: ", elector);
                                                    return res.json(elector);
                                                }
                                                else {
                                                    console.log("HAGALE MIJO VOTE PUES::: ", elector);
                                                    return res.json(elector);
                                                }
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2: return [2 /*return*/, res.json(elector)];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.canVote = canVote;
function didVote(electorId) {
    var flag = false;
    var conn = database_1.connect();
    conn.query("SELECT * from WHOVOTE WHERE elector_id = ?", electorId, function (err, rows, fields) {
        if (!err) {
            console.log("1. RESPUESTA DIDVOTE ::::: ", rows);
            if (rows[0] != null && rows[0].elector_id > 0) {
                flag = true;
                som = 1;
                console.log("hagale::: ", rows[0].elector_id);
            }
            else {
                console.log("SIKASSSSSSS SIRVIO");
                som = 0;
            }
            console.log("ESTA ES LA BANDERRAAAAA ;;;;;;", flag);
            return flag;
            // const element: any = JSON.parse(rows.toString());
            // console.log("trackinggggg ;:::::::::::::>>>>>>>", element);
            // if (element.elector_id != null && element.elector_id > 0) {
            // 	console.log("EXISTE WHOVOTEEEEE::::::::::::: ", element.elector_id);
            // 	flag = false;
            //     return false;
            // 	//		break;
            // }
        }
        else {
            som = 0;
            return flag;
        }
    });
}
