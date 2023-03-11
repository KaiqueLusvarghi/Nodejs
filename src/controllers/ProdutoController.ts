import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

class ProdutoController {
    async index(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const produtos = await prisma.produto.findMany();//Recuperar produtos  
        
        res.status(200).json(produtos);

    } async show(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const produto = await prisma.produto.findUnique(// busca produto conforme where            

            {
                where: { id: Number(req.params.id) },
                select: { id: true, nome: true, preco: true }// quais dados se quer no resultado 
            });
        res.status(200).json(produto);
    }

    async store(req: Request, res: Response) {
        const prisma = new PrismaClient();
        //obtém json vindo do cliente        
        const dados = req.body;
        //console.log(dados);        
        const novoPoduto = await prisma.produto.create(
            {
                data: dados,
                select: {
                    id: true,
                    nome: true,
                    preco: true
                }
            }
        );
        res.status(200).json(novoPoduto);
    }
    async update(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const produtoAlterado = await prisma.produto.update(
            {
                where: { id: Number(req.params.id) },
                data: req.body,
                select: {
                    id: true,
                    nome: true,
                    preco: true
                }
            }
        );
        res.status(200).json(produtoAlterado);
    }
    async delete(req: Request, res: Response) {
        const prisma = new PrismaClient();
        await prisma.produto.delete(
            {
                where: {
                    id: Number(req.params.id)
                }
            }
        );
        res.status(200).json({ excluido: true });
    }
}
export default ProdutoController