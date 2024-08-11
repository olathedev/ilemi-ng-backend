import App from "../app";
import AuthControllers from "../modules/auth/auth.controller";
import HouseContollers from "../modules/house/house.controller";
import { InviteControllers } from "../modules/invite/invite.controller";
import LandlordControllers from "../modules/landlord/landlord.controller";
import TenatsControllers from "../modules/tenant/tenant.controller";

const app = new App([
    new AuthControllers(),
    new TenatsControllers(),
    new HouseContollers(),
    new LandlordControllers(),
    new InviteControllers()
])

app.listen()

