// @ts-check

// Use JSDoc annotations for type safety
/**
* @typedef {import("../generated/api").InputQuery} InputQuery
* @typedef {import("../generated/api").FunctionResult} FunctionResult
* @typedef {import("../generated/api").Operation} Operation
*/

// The @shopify/shopify_function package will use the default export as your function entrypoint
export default
/**
* @param {InputQuery} input
* @returns {FunctionResult}
*/
  (input) => {
    // The message to be added to the delivery option
    const message = "You get this delivery option because your zip code has the number 3";

    console.log(input.cart.deliveryGroups[0]);

    let toRename = input.cart.deliveryGroups
      // Filter for delivery groups with a shipping address containing the affected state or province
      .filter(group => group.deliveryAddress?.zip &&
        group.deliveryAddress.zip.indexOf("3") !== -1)
      // Collect the delivery options from these groups
      .flatMap(group => group.deliveryOptions)
      // Construct a rename operation for each, adding the message to the option title
      .map(option => /** @type {Operation} */{
        const output = (option.title === 'Standard') ? {
          rename: {
            deliveryOptionHandle: option.handle,
            title: option.title ? `${option.title} - ${message}` : message
          }
        } : {
          hide: {
            deliveryOptionHandle: option.handle
          }
        }
        return output;
      });

    // The @shopify/shopify_function package applies JSON.stringify() to your function result
    // and writes it to STDOUT
    return {
      operations: toRename
    };
  };
