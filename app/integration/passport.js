// import passport from 'passport';
// import GoogleStrategy from 'passport-google-oauth';
// import config from '../../config';
// import db from '../db';
// import { fechUserByEmail } from '../services/user';
// import query from '../db/queries/users'
// import {errorResponse, generateId, successResponse} from '../utils/helpers';
// import { genericErrors } from '../utils';

// passport.use(
//   new GoogleStrategy({
//       //options for the google strat
//       callbackURL: "/auth/google/redirect",
//       clientID: config.E_WALLET_GOOGLE_OAUTH_CLIENT_ID,
//       clientSecret: config.E_WALLET_GOOGLE_OAUTH_SECRET,
//     },
//     async (_accessToken, _refreshToken, profile, done) => {
//       try {
//         const user = await fechUserByEmail(req.body.email);
//         if (user) {
//           done(null, user);
//         } else {
//           const id = generateId();
//           const salt = process.env.SALT;
//           const password = process.env.PASSWORD;
//           const is_active = true;
//           const { familyName, givenName } = profile.name
//           const payload = [id, familyName, givenName, profile.emails[0].value, password, salt, is_active,];
//           await db.any(query.create_users, payload);
//           return successResponse(res, {
//             message: CREATE_USER_SUCCESSFULLY,
//             data: { id, first_name, last_name, email, role },
//             code: 201,
//           });
//         }
//       }
//          catch (e) {
//           next(errorResponse(req, res, genericErrors.errorCreatingStaff));
//         }
      
// }));