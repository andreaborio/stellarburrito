"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var xdr = _interopRequire(require("../generated/stellar-xdr_generated"));

var Keypair = require("../keypair").Keypair;

var StrKey = require("../strkey").StrKey;

/**
 * Transfers native balance to destination account.
 * @function
 * @alias Operation.accountMerge
 * @param {object} opts
 * @param {string} opts.destination - Destination to merge the source account into.
 * @param {string} [opts.source] - The source account (defaults to transaction source).
 * @returns {xdr.AccountMergeOp}
 */
var accountMerge = function accountMerge(opts) {
  var opAttributes = {};
  if (!StrKey.isValidEd25519PublicKey(opts.destination)) {
    throw new Error("destination is invalid");
  }
  opAttributes.body = xdr.OperationBody.accountMerge(Keypair.fromPublicKey(opts.destination).xdrAccountId());
  this.setSourceAccount(opAttributes, opts);

  return new xdr.Operation(opAttributes);
};
exports.accountMerge = accountMerge;