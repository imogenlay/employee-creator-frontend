import classes from "./BadMarkdown.module.scss";

interface BadMarkdownProps {
  className?: string;
  value: string;
}

export default function BadMarkdown({ className, value }: BadMarkdownProps) {
  return (
    <p className={className}>
      {value.split("`").map((part: string, i: number) => {
        if (!part || i % 2 === 0)
          return <span className={classes.normal}>{part}</span>;
        return <span className={classes.quote}>{part}</span>;
      })}
    </p>
  );
}
