import { Transaction } from "../../src/types/Transaction";

const validTransactionBody = {
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

const emptyNameTransaction = {
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