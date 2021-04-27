import { Request, Response } from "express";

import { connect } from "../database";
import { Elector } from "../interface/elector";
import { VoteWho } from "../interface/voteWho";
import { Vote } from "../interface/voto";
import { WhoVote } from "../interface/whoVote";

var som: number;

export async function createVote(req: Request, res: Response) {
	const newVote: Array<VoteWho> = req.body;

	let data = {
		rpt: false,
		message: "",
	};
	som = -1;
	//let electorId: Elector = canVote();
	//console.log("the elector is:::: ", newVote[0].elector_id);
	let flag: boolean = true;
	if (newVote[0].elector_id != null) {
		didVote(newVote[0].elector_id);
		console.log("2. ingresooooooo :::::: ", som);
		setTimeout(() => {
			console.log("3. ingresooooooo :::::: ", som);
			if (newVote[0].elector_id != null && som == 0) {
				console.log("SI PUEDE VOTAR");
				const conn = connect();
				newVote.forEach((item: VoteWho) => {
					// if (item.elector_id) {
					// 	electorId = item.elector_id;
					// }

					const rpt = conn.query("INSERT INTO VOTOS (represent_id) VALUES (?)", item.represent_id);
					//console.log("INSERTO ???? :::: ", rpt);
				});

				conn.query("INSERT INTO WHOVOTE (elector_id) VALUES (?)", newVote[0].elector_id, (err, rows) => {
					if(!err) {
						console.log("WHOVOTE INSERTION:::: ", rows);						
					}
				});
				data.message = "Su voto fue registrado con exito.";
				data.rpt = true;
				
			} else {
				data.message = "Su votacion ya fue registrada, no esta permitido votar mas de dos veces.";
				data.rpt = false;
			}

			return res.json({
				data,
			});
		}, 2000);
	}
}

export async function canVote(req: Request, res: Response) {
	const email: string = req.params.email;
	//console.log("there you gooooo:::: ", email);
	const conn = await connect();

	await conn.query("SELECT * FROM ELECTORES WHERE email = ?", email, async (err, rows, fields) => {
		let elector: Elector = new Elector();
		if (!err) {
			if (rows[0]) {
				console.log("the elector is:::::: ", rows[0].id);
				elector.id = rows[0].id;
				elector.email = rows[0].email;
				await conn.query("SELECT * from WHOVOTE WHERE elector_id = ?", rows[0].id, (err, rows, fields) => {
					if (rows[0]) {
						console.log("PAILA USTED YA VOTO:::", rows[0]);
						elector.id = 0;
						elector.email = "";
						console.log("PAILA ELECTOR:::: ", elector);
						return res.json(elector);
					} else {
						console.log("HAGALE MIJO VOTE PUES::: ", elector);
						return res.json(elector);
					}
				});
			} else {
				return res.json(elector);
			}
		}
	});
}

function didVote(electorId: number) {
	let flag: boolean = false;

	const conn = connect();

	conn.query("SELECT * from WHOVOTE WHERE elector_id = ?", electorId, (err, rows, fields) => {
		if (!err) {
			console.log("1. RESPUESTA DIDVOTE ::::: ", rows);
			if (rows[0] != null && rows[0].elector_id > 0) {
				flag = true;
				som = 1;
				console.log("hagale::: ", rows[0].elector_id);
			} else {
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
		} else {
			som = 0;
			return flag;
		}
	});
}
