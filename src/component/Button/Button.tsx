import classes from "./Button.module.scss";

export type ButtonMode = "DEFAULT" | "DELETE" | "DISABLED";

interface ButtonProps {
  className?: string;
  mode?: ButtonMode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function Button({
  className,
  mode = "DEFAULT",
  type,
  onClick,
  children,
}: ButtonProps) {
  const combinedClasses = `${classes.button} ${mode === "DELETE" ? classes.delete : ""} ${className}`;
  return (
    <button
      className={combinedClasses}
      disabled={mode === "DISABLED"}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
