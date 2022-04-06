/**
 * @description Gives back a JSON
 * Object to send as response.
 *
 * @param {string} errorMessage
 * @returns
 */

/**
 * @description Gives back a JSON
 * Object to send as response.
 *
 * @param {any} data
 * @returns
 */
function success(data) {
  return {
    success: true,
    message: data,
  };
}

export { success };
