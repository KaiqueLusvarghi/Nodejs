// Importa componentes do express
import { Router } from "express";
// Importa TesteController
import TesteController from "./controllers/TesteController";
// Validação dos parâmetros da rota
import ValidaTeste1 from "./controllers/middlewares/ValidaTeste1";
import ProdutoController from "./controllers/ProdutoController";
// Instancia roteador
const Roteador = Router();
// Define rota tipo get que, para funcionar, deve ser requisitada conforme exemplo.
// Exemplo de requisição: localhost:4000/teste/123?num=456
// Onde 123 e 456 podem ser substituídos por quaisquer valores

Roteador.get(
 // URL com parêmetro :id
    'test/id',
    ValidaTeste1,
   // Aciona função do TesteController   
    new TesteController().teste1
);

Roteador.get('/produtos', new ProdutoController().index);
Roteador.get('/produtos/:id', new ProdutoController().show);
Roteador.post('/produtos', new ProdutoController().store);
Roteador.put('/produtos/:id', new ProdutoController().update);
Roteador.delete('/produtos/:id', new ProdutoController().delete);

export default Roteador;
