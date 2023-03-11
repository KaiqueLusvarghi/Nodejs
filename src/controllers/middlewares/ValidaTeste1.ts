import {Request,Response,NextFunction } from 'express';

function ValidaTeste1 (req:Request, res:Response,next:NextFunction) {
    const id = req.params.id;
    const num = req.query.num;
    if(Number(id)>1000 || num==null){

        //Retorna código 400 indicando bead request
        res.status(400).send("Parâmetros Inválido");
    }

 // chama a prócima função na rota e retorna sua resposta


    return next();
}   
export default ValidaTeste1;


