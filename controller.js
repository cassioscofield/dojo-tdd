const MENSAGEM_ID_CAMPANHA_INVALIDO = 'idCampanha inválido';
const MENSAGEM_AUTHORIZATION_NAO_ENVIADO = 'authorization não foi enviado no header';
const MENSAGEM_CAMPANHA_NAO_ENCONTRADA = 'Campanha não encontrada';
const MENSAGEM_CAMPANHA_ENCONTRADA_COM_SUCESSO = 'Campanha encontrada sucesso';

const STATUS_CODE_BAD_REQUEST = 400;
const STATUS_CODE_UNAUTHORIZED = 401;
const STATUS_CODE_NOT_FOUND = 404;
const STATUS_CODE_FOUND = 200;

module.exports = controller = function(campanhaRepository) {
    return function (req, res) {
        if (!req.headers.Authorization) {
            res.status(STATUS_CODE_UNAUTHORIZED);
            res.send({mensagem: MENSAGEM_AUTHORIZATION_NAO_ENVIADO});
            return;
        }

        if(isNaN(req.params.idCampanha)){
            res.status(STATUS_CODE_BAD_REQUEST);
            res.send({mensagem: MENSAGEM_ID_CAMPANHA_INVALIDO});
            return;
        }

        const campanha = campanhaRepository.find(req.params.idCampanha);

        if (campanha === 'undefined') {
            res.status(STATUS_CODE_NOT_FOUND);
            res.send({mensagem: MENSAGEM_CAMPANHA_NAO_ENCONTRADA});
            return;
        }
        
        res.status(STATUS_CODE_FOUND);
        res.send({ mensagem: MENSAGEM_CAMPANHA_ENCONTRADA_COM_SUCESSO, data: campanha });
        return;
        
        
    };
}
