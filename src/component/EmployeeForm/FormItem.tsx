import classes from "./EmployeeForm.module.scss";

interface FormItemProps {
  label: string;
  field: string;
  type?: string;
  value: string;
  error: string | undefined;
  setField: (
    field: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export default function FormItem({
  label,
  field,
  type,
  value,
  error,
  setField,
}: FormItemProps) {
  const inputClass = `${classes.input} ${error ? "error" : ""}`;

  return (
    <div>
      <div className={classes.form_item}>
        <label className={classes.label}>{label}</label>
        <input
          className={inputClass}
          type={type}
          value={value}
          onChange={(e) => setField(field, e)}
        />
      </div>
      {error && <p className={classes.form_error}>{error}</p>}
    </div>
  );
}
