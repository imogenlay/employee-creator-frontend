import classes from "./EmployeeForm.module.scss";

interface FormItemProps {
  text: string;
  field: string;
  name?: string;
  type?: string;
  checked?: boolean;
  min?: string;
  max?: string;
  value: string | number;
  error: string | undefined;
  setField: (
    field: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  children?: React.ReactNode;
}

export default function FormItem({
  text,
  field,
  name,
  type,
  value,
  checked,
  min,
  max,
  error,
  setField,
  children,
}: FormItemProps) {
  const inputClass = `${classes.input} ${error ? "error" : ""}`;

  return (
    <div>
      <div className={classes.form_item}>
        <p className={classes.text}>{text}</p>
        <label>
          <input
            className={inputClass}
            name={name}
            type={type}
            value={value}
            checked={checked}
            min={min}
            max={max}
            onChange={(e) => setField(field, e)}
          />
          {children}
        </label>
      </div>
      {error && <p className={classes.form_error}>{error}</p>}
    </div>
  );
}
