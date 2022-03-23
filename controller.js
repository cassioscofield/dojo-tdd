const MENSAGEM_ID_CAMPANHA_INVALIDO = 'idCampanha inválido';
const MENSAGEM_AUTHORIZATION_NAO_ENVIADO = 'authorization não foi enviado no header';

const STATUS_CODE_BAD_REQUEST = 400;
const STATUS_CODE_UNAUTHORIZED = 401;

module.exports = controller = function(campanhaRepository) {
    return function (req, res) {
        if (!req.headers.Authorization) {
            res.status(STATUS_CODE_UNAUTHORIZED);
            res.send({mensagem: MENSAGEM_AUTHORIZATION_NAO_ENVIADO});
            return;
        }
        res.status(STATUS_CODE_BAD_REQUEST);
        res.send({mensagem: MENSAGEM_ID_CAMPANHA_INVALIDO});
        return;
    };
}
