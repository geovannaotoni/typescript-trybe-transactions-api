import { expect } from 'chai';
import sinon from 'sinon';
import transactionMock from '../../mocks/transaction.mock';
import TransactionModel from '../../../src/database/models/transaction.model';
import transactionService from '../../../src/services/transactions.service';

describe('TransactionService', function () {
  
  describe('#create', function () {
    beforeEach(function () { sinon.restore(); });

    it('deve ser possível criar uma transação com sucesso', async function () {
      // Arrange
      sinon.stub(TransactionModel, 'create').resolves(TransactionModel.build(transactionMock.validTransactionFromDB));
      // Act
      const serviceResponse = await transactionService.create(transactionMock.validTransactionFromDB);
      // Assert
      expect(serviceResponse.status).to.eq('SUCCESSFUL');
      expect(serviceResponse.data).to.deep.eq(transactionMock.validTransactionFromDB);
    });

    it('deve retornar um erro quando um nome não é enviado', async function () {
      // Arrange

      // Act
      const serviceResponse = await transactionService.create(transactionMock.emptyNameTransaction);
      // Assert
      expect(serviceResponse.status).to.eq('INVALID_DATA');
      expect(serviceResponse.data).to.deep.eq({ message: 'Name is required' });
    });
  });
});