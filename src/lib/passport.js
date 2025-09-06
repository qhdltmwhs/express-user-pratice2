import passport from "passport";

import localStrategy from "../middlewares/passport/localStrategy.js";
import { accessTokenStragety } from "../middlewares/passport/jwtStrategy.js";

passport.use('local', localStrategy);
passport.use('access-token', accessTokenStragety);

export default passport;