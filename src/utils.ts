const ISO_STRING_REGEX =
  /^([0-9]{4})-(1[0-2]|0[1-9])-(0[1-9]|[12][0-9]|3[01])$/;

export function isObject(struct: unknown): struct is Record<string, unknown> {
  return !!struct && typeof struct === "object" && !Array.isArray(struct);
}

export function isValidISOString(item: unknown) {
  return typeof item === "string" && ISO_STRING_REGEX.test(item);
}
