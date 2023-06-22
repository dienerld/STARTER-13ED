## VERBOS/MÉTODOS HTTP UTILIZADOS NO PADRÃO REST:
    - GET
    - POST
    - PUT
    - DELETE

    GET    - utilizado quando o objetivo é buscar/listar registros
    POST   - utilizado quando o objetivo é criar/cadastrar novos registro
    PUT    - utilizado quando o objetivo é atualizar um registro previamente cadastrado
    DELETE - utilizado quando o objetivo é excluir/deletar um registro


## FORMAS DE ENVIAR DADOS NA REQUISIÇÃO(REQUEST)
    - body
    - query (params) - URL/personagens?nome="Mufasa"&cor="Preto"
    - path (params) - URL/personagens/1

    BODY  - Utilizar quando o objetivo for cadastrar ou atualizar registros. É no body que vai todos os dados que serão necessários para o cadastro ou atualização do registro.
    OBS: utilizar somente em rotas de método POST ou PUT 
    
    QUERY - Utilizar quando o objetivo for filtrar os dados listados com base nos parametros enviados. 
    OBS: Utilizar somente em rotas de método GET
    
    PATH  - Utilizar quando o objetivo for listar/atualizar/excluir um único registro, ou criar um novo registro para uma entidade específica (Ex: cadastrar uma nova transação para o usuário de ID 1)
    OBS: pode ser utilizado em rotas GET, POST, PUT e DELETE

    get  - buscar por id
    post - url/users/123/transacao
    put -  url/transacao/1
    delete - url/transacao/1

