import React, { useEffect } from "react";
import fns from "./functions";
import styles from "./index.scss";
import cnInit from "jcm-classnames";
const cn = cnInit(styles);

const Main = props => {
  const {
      store: { led2 },
      updateState
    } = props,
    { toggle, init } = fns(led2, updateState);

  useEffect(init, []);

  return (
    <div className={cn("root")}>
      <button className={cn(led2)} onClick={toggle}>
        LED2
      </button>
    </div>
  );
};

export default Main;
