// import passport from 'passport';
// import GoogleStrategy from 'passport-google-oauth';
// import config from '../../config';
// import app from '../../config/app';

// passport.use(
//   new GoogleStrategy(
//     {
//       //options for the google strat
//       callbackURL: "/auth/google/redirect",
//       clientID: config.E_WALLET_GOOGLE_OAUTH_CLIENT_ID,
//       clientSecret: config.E_WALLET_GOOGLE_OAUTH_SECRET,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const user = await userService.checkIfUserExist(
//           profile.emails[0].value
//         );
//         if (user) {
//           done(null, user);
//         } else {
//           const id = uuidv4();
//           const salt = process.env.SALT;
//           const password = process.env.PASSWORD;
//           const is_active = true;
//           const payload = [
//             id,
//             profile.name.familyName,
//             profile.name.givenName,
//             profile.emails[0].value,
//             password,
//             salt,
//             is_active,
//           ];
//           const newUser = await db.any(userQuery.createFaceBookUser, payload);
//           return done(null, newUser[0]);
//         }
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );
 