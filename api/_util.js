export const isRateLimitError = (error) =>
  [error?.statusCode, error?.lastError?.statusCode, error?.errors?.[0]?.statusCode].includes(
    429,
  );
