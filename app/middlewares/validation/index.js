// const validateUserSignUpProfile = async(req, res, next) => {
//   try {
//     await createUserSchema.validateAsync(req.body);
//     next();
//   } catch (e) {
//     const apiError = new ApiError({
//       message: e.details[0].message,
//       status: 400,
//     });
//     errorResponse(req, res, apiError);
//   }
// };
