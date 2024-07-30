import App from "../app";
import AuthControllers from "../modules/auth/auth.controller";
import HouseContollers from "../modules/house/house.controller";
import TenatsControllers from "../modules/tenant/tenant.controller";

const app = new App([new AuthControllers(), new TenatsControllers(), new HouseContollers()])

app.listen()

