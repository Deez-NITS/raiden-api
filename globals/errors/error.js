/**
 * @description Gives back a JSON
 * Object to send as response.
 *
 * @param {string} errorMessage
 * @returns
 */
function error(errorMessage) {
  return {
    success: false,
    error: errorMessage,
  };
}

export { error };
