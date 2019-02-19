"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var xdr = _interopRequire(require("../generated/stellar-xdr_generated"));

var Keypair = require("../keypair").Keypair;

var StrKey = require("../strkey").StrKey;

var padEnd = _interopRequire(require("lodash/padEnd"));

/**
 * Returns an XDR AllowTrustOp. An "allow trust" operation authorizes another
 * account to hold your account's credit for a given asset.
 * @function
 * @alias Operation.allowTrust
 * @param {object} opts
 * @param {string} opts.trustor - The trusting account (the one being authorized)
 * @param {string} opts.assetCode - The asset code being authorized.
 * @param {boolean} opts.authorize - True to authorize the line, false to deauthorize.
 * @param {string} [opts.source] - The source account (defaults to transaction source).
 * @returns {xdr.AllowTrustOp}
 */
var allowTrust = function allowTrust(opts) {
  if (!StrKey.isValidEd25519PublicKey(opts.trustor)) {
    throw new Error("trustor is invalid");
  }
  var attributes = {};
  attributes.trustor = Keypair.fromPublicKey(opts.trustor).xdrAccountId();
  if (opts.assetCode.length <= 4) {
    var code = padEnd(opts.assetCode, 4, "\u0000");
    attributes.asset = xdr.AllowTrustOpAsset.assetTypeCreditAlphanum4(code);
  } else if (opts.assetCode.length <= 12) {
    var code = padEnd(opts.assetCode, 12, "\u0000");
    attributes.asset = xdr.AllowTrustOpAsset.assetTypeCreditAlphanum12(code);
  } else {
    throw new Error("Asset code must be 12 characters at max.");
  }
  attributes.authorize = opts.authorize;
  var allowTrustOp = new xdr.AllowTrustOp(attributes);

  var opAttributes = {};
  opAttributes.body = xdr.OperationBody.allowTrust(allowTrustOp);
  this.setSourceAccount(opAttributes, opts);

  return new xdr.Operation(opAttributes);
};
exports.allowTrust = allowTrust;