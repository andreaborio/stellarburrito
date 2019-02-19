"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var xdr = _interopRequire(require("../generated/stellar-xdr_generated"));

var Keypair = require("../keypair").Keypair;

var StrKey = require("../strkey").StrKey;

/**
 * Create a payment operation.
 * @function
 * @alias Operation.payment
 * @param {object} opts
 * @param {string} opts.destination - The destination account ID.
 * @param {Asset} opts.asset - The asset to send.
 * @param {string} opts.amount - The amount to send.
 * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
 * @returns {xdr.PaymentOp}
 */
var payment = (function (_payment) {
  var _paymentWrapper = function payment(_x) {
    return _payment.apply(this, arguments);
  };

  _paymentWrapper.toString = function () {
    return _payment.toString();
  };

  return _paymentWrapper;
})(function (opts) {
  if (!StrKey.isValidEd25519PublicKey(opts.destination)) {
    throw new Error("destination is invalid");
  }
  if (!opts.asset) {
    throw new Error("Must provide an asset for a payment operation");
  }
  if (!this.isValidAmount(opts.amount)) {
    throw new TypeError(this.constructAmountRequirementsError("amount"));
  }

  var attributes = {};
  attributes.destination = Keypair.fromPublicKey(opts.destination).xdrAccountId();
  attributes.asset = opts.asset.toXDRObject();
  attributes.amount = this._toXDRAmount(opts.amount);
  var payment = new xdr.PaymentOp(attributes);

  var opAttributes = {};
  opAttributes.body = xdr.OperationBody.payment(payment);
  this.setSourceAccount(opAttributes, opts);

  return new xdr.Operation(opAttributes);
});
exports.payment = payment;