import { Request, Response } from "express";

import { connect } from "../database";
import { Representante } from "../interface/representante";

export async function getRepresents(req: Request, res: Response) {
    const conn = await connect();

    await conn.query("SELECT * FROM REPRESENTANTES", (err, rows, fields)=>{
        if(!err) {
            
            res.send(rows);
        }
    });    
}

export async function createRepresent(req: Request, res: Response) {
    const newRepre: Representante = req.body;
    const conn = await connect();
    await conn.query("INSERT INTO REPRESENTANTES SET ?", [newRepre]);
    return res.json({
        message: "Representante Created",
    });
}
