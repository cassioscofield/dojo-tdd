const controller = require('./controller');
it('Deve retornar 400 se o usuário passar um idCampanha não for numérico', done => {
	// Arrange
	const req = {
        params: {
            idCampanha: 'x'
        },
        headers: {
            Authorization: 'x',
        }
    };
	res = {
		status: function(statusCode) {
           // Assert
            expect(statusCode).toBe(400);
		},
		send: function(body) {
			done();
		}
	}
    // Act
	controller()(req, res);
});

it('Deve retornar 401 se o token de autorização não for enviado no header', done => {
	// Arrange
	req = {
        headers: { 'Authorization': '' },
        params: {},
    };
	res = {
		status: function(statusCode) {
            // Assert
            expect(statusCode).toBe(401);
		},
		send: function(body) {
			expect(body.mensagem).toBeTruthy();
			done();
		}
	}
    // Act
	controller()(req, res);
});

it('Deve retornar 404 se a campanha não for encontrada', done => {
	// Arrange
	req = {
        params: {
            idCampanha: '1'
        },
        headers: {
            'Authorization': 'x'
        }
    };
	res = {
		status: function(statusCode) {
            // Assert
            expect(statusCode).toBe(404);
		},
		send: function(body) {
			expect(body.mensagem).toBeTruthy();
			done();
		}
	}
    const campanhaRepositoryMock = {
        findById: function (id){
            if (id == 2) {
                return true;
            }
            return false;
        }
    };
    // Act
	controller(campanhaRepositoryMock)(req, res);
});

it('Deve retornar 200 se a campanha for encontrada', done => {
	// Arrange
	req = {
        params: {
            idCampanha: '2'
        },
        headers: {
            'Authorization': 'x'
        }
    };
	res = {
		status: function(statusCode) {
            // Assert
            expect(statusCode).toBe(200);
		},
		send: function(body) {
			done();
		}
	}
    const campanhaRepositoryMock = {
        findById: function (id){
            if (id == 2) {
                return true;
            }
            return false;
        }
    };
    // Act
	controller(campanhaRepositoryMock)(req, res);
});