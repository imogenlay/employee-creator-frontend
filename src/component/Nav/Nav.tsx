import { Link, useLocation } from "react-router";
import classes from "./Nav.module.scss";
import { PAGE_CREATE, PAGE_HOME } from "../../services/const";

interface LinkDefinition {
  to: string;
  text: string;
}

export default function Nav() {
  const location = useLocation();

  const links: LinkDefinition[] = [
    { to: PAGE_HOME, text: "Home" },
    { to: PAGE_CREATE, text: "Create" },
    /* { to: PAGE_CALENDAR, text: "Calendar" },*/
  ];

  return (
    <nav className={classes.nav}>
      {links.map((l: LinkDefinition) => {
        if (l.to === location.pathname)
          return (
            <p key={l.text} className={classes.current_link}>
              {l.text}
            </p>
          );

        return (
          <Link key={l.text} to={l.to} className={classes.link}>
            {l.text}
          </Link>
        );
      })}
    </nav>
  );
}
