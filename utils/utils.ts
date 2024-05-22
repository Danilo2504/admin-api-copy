import {
  ContactType,
  TransactionGroup,
  TransactionStatus,
  TransactionType,
} from "@prisma/client";
import { validateOrReject, ValidatorOptions } from "class-validator";

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function validateOrRejectClass(
  inputDto: Record<any, any>,
  classToValidate: any,
  validatorOptions?: ValidatorOptions
) {
  // because classes are just objects;
  const guard = new classToValidate() as Record<string, any>;

  for (const key in inputDto) {
    guard[key] = inputDto[key];
  }

  return validateOrReject(guard, validatorOptions);
}

export const validateTransactionType = (
  value: string
): TransactionType | null => {
  if (Object.values(TransactionType).includes(value as any)) {
    return value as TransactionType;
  }
  return null;
};

export const validateTransactionStatus = (
  value: string
): TransactionStatus | null => {
  if (Object.values(TransactionStatus).includes(value as any)) {
    return value as TransactionStatus;
  }
  return null;
};

export const validateTransactionGroup = (
  value: string
): TransactionGroup | null => {
  if (Object.values(TransactionGroup).includes(value as any)) {
    return value as TransactionGroup;
  }
  return null;
};

export const validateContactType = (value: string): ContactType | null => {
  if (Object.values(ContactType).includes(value as any)) {
    return value as ContactType;
  }
  return null;
};

export const validateTake = (value?: string): number | undefined => {
  return value ? parseInt(value) : undefined;
};
