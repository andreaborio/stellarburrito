"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var xdr = _interopRequire(require("../generated/stellar-xdr_generated"));

var isUndefined = _interopRequire(require("lodash/isUndefined"));

var UnsignedHyper = require("js-xdr").UnsignedHyper;

/**
 * Returns a XDR ManageOfferOp. A "manage offer" operation creates, updates, or
 * deletes an offer.
 * @function
 * @alias Operation.manageOffer
 * @param {object} opts
 * @param {Asset} opts.selling - What you're selling.
 * @param {Asset} opts.buying - What you're buying.
 * @param {string} opts.amount - The total amount you're selling. If 0, deletes the offer.
 * @param {number|string|BigNumber|Object} opts.price - Price of 1 unit of `selling` in terms of `buying`.
 * @param {number} opts.price.n - If `opts.price` is an object: the price numerator
 * @param {number} opts.price.d - If `opts.price` is an object: the price denominator
 * @param {number|string} [opts.offerId ] - If `0`, will create a new offer (default). Otherwise, edits an exisiting offer.
 * @param {string} [opts.source] - The source account (defaults to transaction source).
 * @throws {Error} Throws `Error` when the best rational approximation of `price` cannot be found.
 * @returns {xdr.ManageOfferOp}
 */
var manageOffer = function manageOffer(opts) {
  var attributes = {};
  attributes.selling = opts.selling.toXDRObject();
  attributes.buying = opts.buying.toXDRObject();
  if (!this.isValidAmount(opts.amount, true)) {
    throw new TypeError(this.constructAmountRequirementsError("amount"));
  }
  attributes.amount = this._toXDRAmount(opts.amount);
  if (isUndefined(opts.price)) {
    throw new TypeError("price argument is required");
  }
  attributes.price = this._toXDRPrice(opts.price);

  if (!isUndefined(opts.offerId)) {
    opts.offerId = opts.offerId.toString();
  } else {
    opts.offerId = "0";
  }
  attributes.offerId = UnsignedHyper.fromString(opts.offerId);
  var manageOfferOp = new xdr.ManageOfferOp(attributes);

  var opAttributes = {};
  opAttributes.body = xdr.OperationBody.manageOffer(manageOfferOp);
  this.setSourceAccount(opAttributes, opts);

  return new xdr.Operation(opAttributes);
};
exports.manageOffer = manageOffer;