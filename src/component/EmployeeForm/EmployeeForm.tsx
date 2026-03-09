import classes from "./EmployeeForm.module.scss";

import { useState } from "react";
import { createEmployeeSchema, type EmployeeDto } from "../../utils/schema";
import FormItem from "./FormItem";
import {
  EMPTY_EMPLOYEE_FORM,
  type FormFields,
} from "../../services/employee/employee-services";

type FormFieldErrors = Partial<Record<keyof FormFields, string>>;

interface EmployeeFormProps {
  buttonText: string;
  onSubmit: (data: EmployeeDto) => void;
  defaultFields?: FormFields;
}

export default function EmployeeForm({
  buttonText,
  onSubmit,
  defaultFields = EMPTY_EMPLOYEE_FORM,
}: EmployeeFormProps) {
  const [form, setForm] = useState<FormFields>(defaultFields);
  const [errors, setErrors] = useState<FormFieldErrors>({});

  const setField = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // Deconstruct previous form fields and create
    // a new object with this field updated.
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const result = createEmployeeSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: FormFieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormFields;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onSubmit(result.data);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={classes.form}>
      <FormItem
        label="First name:"
        field="firstName"
        value={form.firstName}
        error={errors.firstName}
        setField={setField}
      />
      <FormItem
        label="Middle name:"
        field="middleName"
        value={form.middleName}
        error={errors.middleName}
        setField={setField}
      />
      <FormItem
        label="Last name:"
        field="lastName"
        value={form.lastName}
        error={errors.lastName}
        setField={setField}
      />
      <FormItem
        label="Email:"
        field="email"
        type="email"
        value={form.email}
        error={errors.email}
        setField={setField}
      />
      <FormItem
        label="Mobile:"
        field="mobile"
        type="tel"
        value={form.mobile}
        error={errors.mobile}
        setField={setField}
      />
      <FormItem
        label="Address:"
        field="address"
        value={form.address}
        error={errors.address}
        setField={setField}
      />
      <FormItem
        label="Contract ID:"
        field="contractId"
        type="number"
        value={form.contractId}
        error={errors.contractId}
        setField={setField}
      />
      <FormItem
        label="Hours per week:"
        field="hoursPerWeek"
        type="number"
        value={form.hoursPerWeek}
        error={errors.hoursPerWeek}
        setField={setField}
      />
      <FormItem
        label="Start date:"
        field="startDate"
        type="date"
        value={form.startDate}
        error={errors.startDate}
        setField={setField}
      />
      <FormItem
        label="End date:"
        field="endDate"
        type="date"
        value={form.endDate}
        error={errors.endDate}
        setField={setField}
      />

      <button className={classes.button} type="submit">
        {buttonText}
      </button>
    </form>
  );
}
