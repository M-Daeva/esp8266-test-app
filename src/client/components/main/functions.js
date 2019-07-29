import { l } from "../../../utils";
import { req } from "../../services/request";

export default (led, updateState) => {
  const toggle = async () => {
    try {
      const status = await req.get("/esp", {
        params: { state: "toggle" }
      });
      l(status);
    } catch (e) {
      l(e);
    }

    updateState({ led2: status ? "on" : "off" });
  };

  const init = () => {
    (async () => {
      try {
        const status = await req.get("/esp", {});
        l(status);
      } catch (e) {
        l(e);
      }
      updateState({ led2: status ? "on" : "off" });
    })();
  };

  return { toggle, init };
};
