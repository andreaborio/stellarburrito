"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var xdr = _interopRequire(require("../generated/stellar-xdr_generated"));

var Keypair = require("../keypair").Keypair;

var StrKey = require("../strkey").StrKey;

/**
 * Create and fund a non existent account.
 * @function
 * @alias Operation.createAccount
 * @param {object} opts
 * @param {string} opts.destination - Destination account ID to create an account for.
 * @param {string} opts.startingBalance - Amount in XLM the account should be funded for. Must be greater
 *                                   than the [reserve balance amount](https://www.stellar.org/developers/learn/concepts/fees.html).
 * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
 * @returns {xdr.CreateAccountOp}
 */
var createAccount = (function (_createAccount) {
  var _createAccountWrapper = function createAccount(_x) {
    return _createAccount.apply(this, arguments);
  };

  _createAccountWrapper.toString = function () {
    return _createAccount.toString();
  };

  return _createAccountWrapper;
})(function (opts) {
  if (!StrKey.isValidEd25519PublicKey(opts.destination)) {
    throw new Error("destination is invalid");
  }
  if (!this.isValidAmount(opts.startingBalance)) {
    throw new TypeError(this.constructAmountRequirementsError("startingBalance"));
  }
  var attributes = {};
  attributes.destination = Keypair.fromPublicKey(opts.destination).xdrAccountId();
  attributes.startingBalance = this._toXDRAmount(opts.startingBalance);
  var createAccount = new xdr.CreateAccountOp(attributes);

  var opAttributes = {};
  opAttributes.body = xdr.OperationBody.createAccount(createAccount);
  this.setSourceAccount(opAttributes, opts);

  return new xdr.Operation(opAttributes);
});
exports.createAccount = createAccount;