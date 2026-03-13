import classes from "./LoadingTriangle.module.scss";

export default function LoadingTriangle() {
  return <img className={classes.triangle} src="/triangle.svg" />;
}
