module.exports = {
  normalizeErrors(errors) {
    const normalizeErrors = [{ title: 'Server error', detail: 'Server error' }];
    // eslint-disable-next-line no-restricted-syntax
    for (const property in errors) {
      // eslint-disable-next-line no-prototype-builtins
      if (errors.hasOwnProperty(property)) {
        normalizeErrors.push({
          title: property,
          detail: errors[property].message,
        });
      }
    }

    return normalizeErrors;
  },
};
