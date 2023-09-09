import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import loginMock from '../../mocks/login.mock';
import transactionMock from '../../mocks/transaction.mock';
import UserModel from '../../../src/database/models/user.model';
import TransactionModel from '../../../src/database/models/transaction.model';


chai.use(chaiHttp);

describe('POST /transactions', function () {
  beforeEach(function () { sinon.restore(); });

  describe('quando a requisição é feita com dados válidos', function () {
    it('deve retornar um status 201 com uma transação criada', async function () {
      // arrange
      sinon.stub(jwt, 'verify').resolves({ email: loginMock.existingUser.email });
      sinon.stub(UserModel, 'findOne').resolves(UserModel.build(loginMock.existingUser));
      sinon.stub(TransactionModel, 'create').resolves(TransactionModel.build(transactionMock.validTransactionFromDB));
      // act
      const httpResponse = await chai.request(app).post('/transactions').send(transactionMock.validTransactionBody).set('Authorization', 'genericToken');;
      // assert
      expect(httpResponse.status).to.equal(201);
      expect(httpResponse.body).to.be.deep.equal(transactionMock.validTransactionFromDB);
    });
  });

  describe('quando a requisição é feita com dados inválidos', function () {
    it('ao enviar um nome vazio deve retornar um status 400 com uma mensagem de erro', async function () {
      // arrange
      sinon.stub(jwt, 'verify').resolves({ email: loginMock.existingUser.email });
      sinon.stub(UserModel, 'findOne').resolves(UserModel.build(loginMock.existingUser));
      
      // act
      const httpResponse = await chai.request(app).post('/transactions').send(transactionMock.emptyNameTransaction).set('Authorization', 'genericToken');;
      // assert
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.be.deep.equal({ message: 'Name is required' });
    });
  });
});
