import { z } from "zod";

export const createEmployeeSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(100, "First name must be ≤ 100 characters"),

    middleName: z
      .string()
      .max(100, "Middle name must be ≤ 100 characters")
      .optional()
      .or(z.literal("")),

    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(100, "Last name must be ≤ 100 characters"),

    email: z.string().min(1, "Email is required").email("Email must be valid"),

    mobile: z
      .string()
      .regex(/^[0-9+\-() ]{7,20}$/, "Mobile number is invalid")
      .optional()
      .or(z.literal("")),

    address: z
      .string()
      .min(1, "Address is required")
      .max(255, "Address must be ≤ 255 characters"),

    contractId: z
      .string()
      .min(1, "Contract ID is required")
      .transform(Number)
      .pipe(z.number().int().min(1, "Contract ID must be at least 1")),

    hoursPerWeek: z
      .string()
      .min(1, "Hours per week is required")
      .transform(Number)
      .pipe(
        z
          .number()
          .int()
          .min(1, "Hours per week must be at least 1")
          .max(40, "Hours per week must be ≤ 40"),
      ),

    startDate: z
      .string()
      .min(1, "Start date is required")
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Start date must be YYYY-MM-DD"),

    endDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "End date must be YYYY-MM-DD")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.endDate && data.startDate) {
        return data.endDate > data.startDate;
      }
      return true;
    },
    { message: "End date must be after start date", path: ["endDate"] },
  );

export type EmployeeDto = z.infer<typeof createEmployeeSchema>;
