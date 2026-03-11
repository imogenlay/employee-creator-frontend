import classes from "./EmployeeForm.module.scss";

interface FormItemProps {
  text: string;
  field: string;
  name?: string;
  type?: string;
  value: string | number;
  checked?: boolean;
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
            onChange={(e) => setField(field, e)}
          />
          {children}
        </label>
      </div>
      {error && <p className={classes.form_error}>{error}</p>}
    </div>
  );
}
