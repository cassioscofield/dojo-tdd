const MENSAGEM_ID_CAMPANHA_INVALIDO = 'idCampanha inválido';
const MENSAGEM_ID_CAMPANHA_NAO_ENCONTRADO = 'idCampanha não encontrado';
const MENSAGEM_AUTHORIZATION_NAO_ENVIADO = 'authorization não foi enviado no header';

const STATUS_CODE_BAD_REQUEST = 400;
const STATUS_CODE_UNAUTHORIZED = 401;
const STATUS_CODE_NOT_FOUND = 404;
const STATUS_CODE_OK = 200;

module.exports = controller = function(campanhaRepository) {
    return function (req, res) {
        if (!req.headers.Authorization) {
            res.status(STATUS_CODE_UNAUTHORIZED);
            res.send({mensagem: MENSAGEM_AUTHORIZATION_NAO_ENVIADO});
            return;
        }
        const idCampanha = req.params.idCampanha;
        if (!Number.isInteger(Number(idCampanha))) {
            res.status(STATUS_CODE_BAD_REQUEST);
            res.send({mensagem: MENSAGEM_ID_CAMPANHA_INVALIDO});
            return;
        }
        const campanha = campanhaRepository.findById(idCampanha);
        if (!campanha) {
            res.status(STATUS_CODE_NOT_FOUND);
            res.send({mensagem: MENSAGEM_ID_CAMPANHA_NAO_ENCONTRADO});
            return;
        }
        res.status(STATUS_CODE_OK);
        res.send(campanha);
    };
}
