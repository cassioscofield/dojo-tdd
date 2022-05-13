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
	const idCampanha = '3334';
	
	const repository = {
		find: (id) => {
			if(id === '333') {
				return {
					id: 333,
					nome: 'dojo',
					dataExpiracao: 'data',
				}
			}
			return 'undefined';
		}
	}
	req = {
        headers: { 'Authorization': 'x' },
        params: {
			idCampanha: idCampanha
		},
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
    // Act
	controller(repository)(req, res);
});

it('Deve retornar 200 em caso de campanha encontrada', done => {
	// Arrange
	const repository = {
		find: (id) => {
			return {
				id: id,
				nome: 'dojo',
				dataExpiracao: 'data',
			}
		}
	}

	req = {
        headers: { 'Authorization': 'x' },
        params: {
			idCampanha: '999'
		},
    };
	res = {
		status: function(statusCode) {
            // Assert
            expect(statusCode).toBe(200);
		},
		send: function(body) {
			expect(body.mensagem).toBeTruthy();	
			done();
		}
	}
    // Act
	controller(repository)(req, res);
});

it('Deve retornar 200 e os dados da campanha', done => {
	// Arrange
	const idCampanha = '3334'
	const expectedResult = {
		id: idCampanha,
		nome: 'dojo',
		dataExpiracao: 'data',
	}

	const repository = {
		find: () => {
			return {
				id: idCampanha,
				nome: 'dojo',
				dataExpiracao: 'data',
			}
		}
	}

	req = {
		headers: { 'Authorization': 'x' },
		params: {
			idCampanha,
		},
	};

	res = {
		status: function (statusCode) {
			// Assert
			expect(statusCode).toBe(200);
		},

		send: function (body) {
			expect(body.mensagem).toBeTruthy();
			expect(body).toHaveProperty('data', expectedResult);
			expect(body.data).toHaveProperty('id', idCampanha);
			done();
		}
	}
	// Act
	controller(repository)(req, res);
});

it('Deve retornar 200 e o controller deve chamar o repository com o id de campanha', done => {
	// Arrange
	const idCampanha = '3334'
	const expectedResult = {
		id: idCampanha,
		nome: 'dojo',
		dataExpiracao: 'data',
	}


	const repository = {
		find: (id) => {
			expect(id).toBe(idCampanha);
			return {
				id: id,
				nome: 'dojo',
				dataExpiracao: 'data',
			}
		}
	}

	req = {
		headers: { 'Authorization': 'x' },
		params: {
			idCampanha,
		},
	};

	res = {
		status: function (statusCode) {
			// Assert
			expect(statusCode).toBe(200);
		},

		send: function (body) {
			expect(body.mensagem).toBeTruthy();
			expect(body).toHaveProperty('data', expectedResult);
			expect(body.data).toHaveProperty('id', idCampanha);
			done();
		}
	}
	// Act
	controller(repository)(req, res);
})