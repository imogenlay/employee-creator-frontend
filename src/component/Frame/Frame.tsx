import Nav from "../Nav/Nav";
import classes from "./Frame.module.scss";

interface FrameProps {
  children: React.ReactNode;
}

export default function Frame({ children }: FrameProps) {
  return (
    <>
      <hgroup className={classes.hgroup}>
        <h1>Employee Creator</h1>
        <Nav />
      </hgroup>
      <main className={classes.frame}>{children}</main>
    </>
  );
}
