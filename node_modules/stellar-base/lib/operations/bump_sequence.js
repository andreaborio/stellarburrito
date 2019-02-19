"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var xdr = _interopRequire(require("../generated/stellar-xdr_generated"));

var Hyper = require("js-xdr").Hyper;

var BigNumber = _interopRequire(require("bignumber.js"));

var isString = _interopRequire(require("lodash/isString"));

/**
 * This operation bumps sequence number.
 * @function
 * @alias Operation.bumpSequence
 * @param {object} opts
 * @param {string} opts.bumpTo - Sequence number to bump to.
 * @param {string} [opts.source] - The optional source account.
 * @returns {xdr.BumpSequenceOp}
 */
var bumpSequence = function bumpSequence(opts) {
  var attributes = {};

  if (!isString(opts.bumpTo)) {
    throw new Error("bumpTo must be a string");
  }

  try {
    new BigNumber(opts.bumpTo);
  } catch (e) {
    throw new Error("bumpTo must be a stringified number");
  }

  attributes.bumpTo = Hyper.fromString(opts.bumpTo);

  var bumpSequenceOp = new xdr.BumpSequenceOp(attributes);

  var opAttributes = {};
  opAttributes.body = xdr.OperationBody.bumpSequence(bumpSequenceOp);
  this.setSourceAccount(opAttributes, opts);

  return new xdr.Operation(opAttributes);
};
exports.bumpSequence = bumpSequence;