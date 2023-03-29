import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

class ProdutoController {
    async index(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const produtos = await prisma.produto.findMany({ //recupera os produtos
            orderBy: { nome: 'asc' },
            select: {
                nome: true,  // seleciona as propriedade desejadas de Produto
                preco: true,
                Categoria: {
                    select: { nome: true }  // traz do model relacionado Categoria apenas o nome
                }
            }
        }); // recupera todos os produto        
        res.status(200).json(produtos);
    }
    async show(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const produto = await prisma.produto.findUnique(// busca produto conforme where            

            {
                where: { id: Number(req.params.id) },
                select: {
                    id: true, // seleciona as propriedades desejadas de Produto
                    nome: true,
                    preco: true,
                    categoria: {
                        select: { nome: true }
                    }
                }
            }
        );
        res.status(200).json(produto);
    }

    async store(req: Request, res: Response) {
        const prisma = new PrismaClient();
        //obtém json vindo do cliente. Exemplo Formato: {nome: "Prego", preco:2.3, categoriaId:1}        
        const { nome, preco, categoriaId } = req.body;
        const novoPoduto = await prisma.produto.create(
            {
                data: {
                    nome: nome,
                    preco: preco,
                    categoria: { connect: { id: categoriaId } } // associa produto à categoria               
                },
                select: {
                    id: true,
                    nome: true,
                    preco: true,
                    categoria: true  // traz todos os dados de catedoria               
                }
            }
        );
        res.status(200).json(novoPoduto);
    }

    async update(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { nome, preco, categoriaId } = req.body;
        const produtoAlterado = await prisma.produto.update(
            {
                where: { id: Number(req.params.id) },
                data: {
                    nome: nome,
                    preco: preco,
                    categoria: { connect: { id: categoriaId } } // associa produto à categoria                
                }, select: {
                    id: true, nome: true,
                    preco: true, categoria: true
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

    async associarFornecedores(req: Request, res: Response) {
        // Exemplo de json recebido: {fornecedores:[1,2]}        
        const { fornecedores } = req.body;
        const dados = fornecedores.map((x: any) => { return { id: x } }); // resulta: [{id:1},{id:2}]        
        const prisma = new PrismaClient();
        const produtoAlterado = await prisma.produto.update(
            {
                where: { id: Number(req.params.id) },
                data: {
                    fornecedores: { connect: dados } // associa produto à categoria               
                },
                select: {
                    nome: true,
                    preco: true,
                    categoria: true,
                    fornecedores: true
                }
            }
        );
        return res.status(200).json(produtoAlterado);
    }

}
export default ProdutoController