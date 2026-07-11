import test from 'node:test';
import assert from 'node:assert/strict';
import { parseShoppingRequest } from '../services/productMatcher.js';

const products = [
  { id: 1, name: 'Apple', price: 180, stock: 20, unit: 'kg' },
  { id: 2, name: 'Milk', price: 70, stock: 10, unit: 'litre' },
  { id: 3, name: 'Banana', price: 60, stock: 15, unit: 'kg' },
  { id: 4, name: 'Eggs', price: 90, stock: 0, unit: 'dozen' },
];

test('parses product with quantity and computes subtotal', () => {
  const result = parseShoppingRequest('2kg apples', products);

  assert.equal(result.intent, 'PRODUCT_WITH_QUANTITY');
  assert.equal(result.products[0].name, 'Apple');
  assert.equal(result.products[0].quantity, 2);
  assert.equal(result.products[0].unit, 'kg');
  assert.equal(result.products[0].subtotal, 360);
  assert.equal(result.total, 360);
  assert.equal(result.needsConfirmation, true);
});

test('asks for quantity when the customer only names a product', () => {
  const result = parseShoppingRequest('milk', products);

  assert.equal(result.intent, 'PRODUCT_ONLY');
  assert.equal(result.needsQuantity, true);
  assert.equal(result.needsConfirmation, false);
  assert.deepEqual(result.products, []);
});

test('returns not found for a product that does not exist', () => {
  const result = parseShoppingRequest('blueberries', products);

  assert.equal(result.intent, 'PRODUCT_NOT_FOUND');
  assert.equal(result.needsConfirmation, false);
  assert.equal(result.products.length, 0);
});

test('flags out of stock products', () => {
  const result = parseShoppingRequest('eggs', products);

  assert.equal(result.intent, 'OUT_OF_STOCK');
  assert.equal(result.needsConfirmation, false);
  assert.equal(result.products.length, 0);
});
