import { l } from "../../../utils";
import { req } from "../../services/request";

export default (led, updateState) => {
  const toggle = async () => {
    const status = await req.get("/esp", {
      params: { state: "toggle" }
    });

    updateState({ led2: status ? "on" : "off" });
  };

  const init = () => {
    (async () => {
      const status = await req.get("/esp", {});
      updateState({ led2: status ? "on" : "off" });
    })();
  };

  return { toggle, init };
};
