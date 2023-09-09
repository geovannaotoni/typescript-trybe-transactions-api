import { TransactionInputtableFields } from "../../src/database/models/transaction.model";
import { Transaction } from "../../src/types/Transaction";

const validTransactionBody: TransactionInputtableFields = {
  name: "Conta de Luz",
  price: 100,
  type: "Saque",
  userId: 1
};

const validTransactionFromDB: Transaction = {
  id: 1,
  name: 'Conta de Luz',
  price: 100,
  type: 'Saque',
  userId: 1
}

const emptyNameTransaction: TransactionInputtableFields = {
  name: '',
  price: 0,
  type: 'Saque',
  userId: 2
}

export default {
  validTransactionBody,
  validTransactionFromDB,
  emptyNameTransaction,
};