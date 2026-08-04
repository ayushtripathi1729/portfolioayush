import { z } from "zod";

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
