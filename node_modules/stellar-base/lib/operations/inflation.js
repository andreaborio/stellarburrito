"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var xdr = _interopRequire(require("../generated/stellar-xdr_generated"));

/**
  * This operation generates the inflation.
  * @function
  * @alias Operation.inflation
  * @param {object} [opts]
  * @param {string} [opts.source] - The optional source account.
  * @returns {xdr.InflationOp}
  */
var inflation = function inflation() {
  var opts = arguments[0] === undefined ? {} : arguments[0];

  var opAttributes = {};
  opAttributes.body = xdr.OperationBody.inflation();
  this.setSourceAccount(opAttributes, opts);
  return new xdr.Operation(opAttributes);
};
exports.inflation = inflation;