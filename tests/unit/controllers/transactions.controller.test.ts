import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import transactionsController from '../../../src/controllers/transactions.controller';
import transactionsService from '../../../src/services/transactions.service';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import transactionMock from '../../mocks/transaction.mock';
import { Transaction } from '../../../src/types/Transaction';

chai.use(sinonChai);

describe('TransactionController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('#create', function () {
    it('deve salvar ao enviar dados válidos', async function () {
      // Arrange
      req.body = transactionMock.validTransactionBody;
      const serviceResponse: ServiceResponse<Transaction> = {
        status: 'SUCCESSFUL',
        data: transactionMock.validTransactionFromDB,
      }
      sinon.stub(transactionsService, 'create').resolves(serviceResponse)
      // Act
      await transactionsController.create(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(transactionMock.validTransactionFromDB);
    });

    it('deve retornar um erro se enviar um nome inválido', async function () {
      // Arrange
      req.body = transactionMock.emptyNameTransaction;
      const serviceResponse: ServiceResponse<Transaction> = {
        status: 'INVALID_DATA',
        data: { message: 'Name is required' },
      }
      sinon.stub(transactionsService, 'create').resolves(serviceResponse)
      // Act
      await transactionsController.create(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: 'Name is required' });
    });
  });
});