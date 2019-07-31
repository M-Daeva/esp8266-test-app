import { l } from "../../../utils";
import { req } from "../../services/request";

export default updateState => {
  const toggle = async () => {
    try {
      const status = await req.get("/esp", {
        params: { state: "toggle" }
      });
      updateState({ led2: status ? "on" : "off" });
    } catch (e) {
      l(e);
    }
  };

  const init = () => {
    (async () => {
      try {
        const status = await req.get("/esp", {});
        updateState({ led2: status ? "on" : "off" });
      } catch (e) {
        l(e);
      }
    })();
  };

  return { toggle, init };
};
