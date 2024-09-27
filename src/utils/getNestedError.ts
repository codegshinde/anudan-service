// Get a nested error by path
export const getNestedErrorByPath = (errors: any, propertyPath: string): any => {
  // Split the property path into an array of property names
  const propertyNames = propertyPath.split(".");

  // Reduce the array of property names to get the nested error
  const nestedError = propertyNames.reduce((currentErrors, propName) => currentErrors?.[propName], errors);

  return nestedError;
};
