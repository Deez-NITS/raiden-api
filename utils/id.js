/**
 * @param {string} id
 * @returns {boolean} True if id is a number, False otherwise
 */
function validId(id) {
  // eslint-disable-next-line eqeqeq
  return id == parseInt(id);
}

export { validId };
