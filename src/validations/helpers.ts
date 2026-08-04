import { z } from "zod";

export function httpUrl(max: number, message = "Please enter a valid URL.") {
  return z
    .string()
    .trim()
    .url(message)
    .max(max, `URL cannot exceed ${max} characters.`)
    .refine(
      (value) => {
        const protocol = new URL(value).protocol;
        return protocol === "https:" || protocol === "http:";
      },
      "URL must use HTTP or HTTPS."
    );
}

export function optionalHttpUrl(max: number) {
  return httpUrl(max)
    .optional()
    .or(z.literal(""))
    .transform((value) => (value === "" ? undefined : value));
}

export const optionalDate = z.preprocess(
  (value) => {
    if (
      value === "" ||
      value === null ||
      value === undefined
    ) {
      return undefined;
    }

    if (
      value instanceof Date &&
      Number.isNaN(value.getTime())
    ) {
      return undefined;
    }

    return value;
  },
  z.coerce.date().optional()
);

export const nullableDate = z.preprocess(
  (value) => {
    if (
      value === "" ||
      value === null ||
      value === undefined
    ) {
      return null;
    }

    if (
      value instanceof Date &&
      Number.isNaN(value.getTime())
    ) {
      return null;
    }

    return value;
  },
  z.coerce.date().nullable()
);

export function optionalTrimmedString(
  max?: number,
  message?: string
) {
  let schema = z.string().trim();

  if (max !== undefined) {
    schema = schema.max(
      max,
      message ?? `Must be at most ${max} characters.`
    );
  }

  return schema
    .optional()
    .or(z.literal(""))
    .transform((value) =>
      value === ""
        ? undefined
        : value
    );
}

export function nullableTrimmedString(
  max?: number,
  message?: string
) {
  let schema = z.string().trim();

  if (max !== undefined) {
    schema = schema.max(
      max,
      message ?? `Must be at most ${max} characters.`
    );
  }

  return schema
    .nullable()
    .optional()
    .or(z.literal(""))
    .transform((value) =>
      value === ""
        ? null
        : value
    );
}
