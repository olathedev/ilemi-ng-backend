import App from "../app";
import AuthControllers from "../modules/auth/auth.controller";

const app = new App([new AuthControllers()])

app.listen()

