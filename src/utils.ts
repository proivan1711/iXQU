const ISO_STRING_REGEX =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

export function isObject(struct: unknown): struct is Record<string, unknown> {
  return !!struct && typeof struct === "object" && !Array.isArray(struct);
}

export function isValidISOString(item: unknown) {
  return typeof item === "string" && ISO_STRING_REGEX.test(item);
}
