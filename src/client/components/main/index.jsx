import React, { useEffect } from "react";
import fns from "./functions";
import styles from "./index.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const Main = props => {
  let el;
  const getRef = node => (el = node),
    {
      store: { led2, isLogged },
      updateState
    } = props,
    { toggle, init, login } = fns(updateState);

  useEffect(init, []);

  console.log("led2", led2);

  const btn = (
    <button className={cn("led", led2)} onClick={toggle}>
      LED2
    </button>
  );

  const form = (
    <form onSubmit={e => login(e, el)}>
      <input ref={getRef} type="password" />
      <button className={cn("send")}>Login</button>
    </form>
  );

  return <div className={cn("root")}>{isLogged ? btn : form}</div>;
};

export default Main;
