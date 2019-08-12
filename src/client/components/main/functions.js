import { l } from "../../../utils";
import { req } from "../../services/request";

export default updateState => {
  const toggle = async () => {
    try {
      const { status } = await req.get("/esp", {
        params: { state: "toggle" }
      });
      if (status !== undefined) updateState({ led2: status ? "on" : "off" });
    } catch (e) {
      l(e);
    }
  };

  const init = () => {
    (async () => {
      try {
        const info = await req.get("/esp", {
          params: { init: true }
        });
        l(info);
      } catch (e) {
        l(e);
      }
    })();
  };

  const login = async (e, { value }) => {
    e.preventDefault();

    try {
      const { status } = await req.get("/esp", {
        params: { password: value }
      });

      if (status !== undefined)
        updateState({ isLogged: true, led2: status ? "on" : "off" });
    } catch (e) {
      l(e);
    }
  };

  return { toggle, init, login };
};
