import { ApiError } from "@/types/http";

export function parseApiError(error: unknown): string {
  const err = error as {
    data?: { errors?: ApiError[]; message?: string };
    errors?: ApiError[];
    message?: string;
  };

  if (err?.data?.errors && Array.isArray(err.data.errors)) {
    const errors = err.data.errors;
    if (errors.length > 0) {
      return errors[0].message;
    }
  }

  if (err?.errors && Array.isArray(err.errors)) {
    const errors = err.errors;
    if (errors.length > 0) {
      return errors[0].message;
    }
  }

  if (err?.data?.message) {
    return err.data.message;
  }

  if (err?.message) {
    return err.message;
  }

  return "An unexpected error occurred. Please try again.";
}

export function getAllApiErrors(error: unknown): string[] {
  const err = error as {
    data?: { errors?: ApiError[]; message?: string };
    errors?: ApiError[];
    message?: string;
  };

  if (err?.data?.errors && Array.isArray(err.data.errors)) {
    const errors = err.data.errors;
    return errors.map((e) => e.message);
  }

  if (err?.errors && Array.isArray(err.errors)) {
    const errors = err.errors;
    return errors.map((e) => e.message);
  }

  if (err?.data?.message) {
    return [err.data.message];
  }

  if (err?.message) {
    return [err.message];
  }

  return ["An unexpected error occurred. Please try again."];
}

export function getFieldErrors(error: unknown): Record<string, string> {
  const err = error as {
    data?: { errors?: ApiError[] };
    errors?: ApiError[];
  };
  const fieldErrors: Record<string, string> = {};

  if (err?.data?.errors && Array.isArray(err.data.errors)) {
    const errors = err.data.errors;
    errors.forEach((e) => {
      if (e.field_name && e.field_name !== "non_field_errors") {
        fieldErrors[e.field_name] = e.message;
      }
    });
  }

  if (err?.errors && Array.isArray(err.errors)) {
    const errors = err.errors;
    errors.forEach((e) => {
      if (e.field_name && e.field_name !== "non_field_errors") {
        fieldErrors[e.field_name] = e.message;
      }
    });
  }

  return fieldErrors;
}
