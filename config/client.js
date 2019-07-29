const isProdMode = PROD_MODE;

const baseURL = isProdMode
  ? "https://esp8266-test-app.herokuapp.com"
  : "http://localhost:3000";

export { baseURL };
