// @ts-check

/**
 * @typedef {import("../generated/api").InputQuery} InputQuery
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
 * @typedef {import("../generated/api").Merchandise} Merchandise
 * @typedef {import("../generated/api").ProductVariant} ProductVariant
 * @typedef {import("../generated/api").Product} Product
 */

export default /**
 * @param {InputQuery} input
 * @returns {FunctionResult}
 */
(input) => {
  const combinableLines = input.cart.lines.filter(({ merchandise }) => merchandise.product.tagged === true);
  const uncombinableLines = input.cart.lines.filter(({ merchandise }) => merchandise.product.tagged === false);
  const combinationErrors = (combinableLines.length > 0 && uncombinableLines.length > 0) ? {
    localizedMessage: "Not possible to combine tagged and untagged products",
    target: "cart",
  } : null;

  const errors = input.cart.lines
    .filter(({ merchandise, quantity }) => (merchandise.product.tagged === true && quantity > 1))
    .map(({merchandise}) => ({
      localizedMessage: `Not possible to order more than one of ${merchandise.product.title}`,
      target: "cart",
    }));

  if (combinationErrors !== null) errors.push(combinationErrors);

  return {
    errors
  }
};
