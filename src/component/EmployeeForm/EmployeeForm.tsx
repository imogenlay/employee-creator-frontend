import classes from "./EmployeeForm.module.scss";
import { useEffect, useState } from "react";
import { createEmployeeSchema, type EmployeeDto } from "../../utils/schema";
import FormItem from "./FormItem";
import {
  EMPTY_EMPLOYEE_FORM,
  type FormFields,
} from "../../services/employee-services";
import {
  getContracts,
  type ContractResponse,
} from "../../services/contract-services";
import Button from "../Button/Button";

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
  const [contracts, setContracts] = useState<ContractResponse[] | null>(null);

  useEffect(() => {
    getContracts("ASC").then((response: ContractResponse[]) => {
      setContracts(response);
      if (!form.contractId)
        setForm((prev) => ({ ...prev, contractId: String(response[0].id) }));
    });
  }, []);

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
        text="First name:"
        field="firstName"
        value={form.firstName}
        error={errors.firstName}
        setField={setField}
      />
      <FormItem
        text="Middle name:"
        field="middleName"
        value={form.middleName}
        error={errors.middleName}
        setField={setField}
      />
      <FormItem
        text="Last name:"
        field="lastName"
        value={form.lastName}
        error={errors.lastName}
        setField={setField}
      />
      <FormItem
        text="Email:"
        field="email"
        type="email"
        value={form.email}
        error={errors.email}
        setField={setField}
      />
      <FormItem
        text="Mobile:"
        field="mobile"
        type="tel"
        value={form.mobile}
        error={errors.mobile}
        setField={setField}
      />
      <FormItem
        text="Address:"
        field="address"
        value={form.address}
        error={errors.address}
        setField={setField}
      />
      {contracts &&
        contracts.map((contract, i) => (
          <FormItem
            key={contract.id}
            text={i === 0 ? "Contract:" : " "}
            field="contractId"
            name="contract"
            type="radio"
            value={contract.id}
            checked={parseInt(form.contractId) === contract.id}
            error={errors.contractId}
            setField={setField}
          >
            {contract.name}
          </FormItem>
        ))}

      <FormItem
        text="Hours per week:"
        field="hoursPerWeek"
        type="number"
        min="1"
        max="40"
        value={form.hoursPerWeek}
        error={errors.hoursPerWeek}
        setField={setField}
      />
      <FormItem
        text="Start date:"
        field="startDate"
        type="date"
        value={form.startDate}
        error={errors.startDate}
        setField={setField}
      />
      <FormItem
        text="End date:"
        field="endDate"
        type="date"
        value={form.endDate}
        error={errors.endDate}
        setField={setField}
      />

      <Button className={classes.button} type="submit">
        {buttonText}
      </Button>
    </form>
  );
}
