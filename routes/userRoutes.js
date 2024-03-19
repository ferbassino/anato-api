const router = require("express").Router();

const {
  createUser,
  signIn,
  getProfile,
} = require("../controllers/userControllers");

const {
  validateUserSignUp,
  userValidation,
  validateUserSignIn,
} = require("../middlewares/validations/user");
const { isAuth } = require("../middlewares/auth");

const multer = require("multer");
const { isResetTokenValid } = require("../middlewares/user");

const storage = multer.diskStorage({});

const fileFilter = (request, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file!", false);
  }
};
const uploads = multer({ storage, fileFilter });

router.post("/api/user", validateUserSignUp, userValidation, createUser);
router.post("/api/user/sign-in", validateUserSignIn, userValidation, signIn);
// router.get("/sign-out", isAuth, signOut);

// router.get("/users", getAllUsers);
router.get("/api/user/profile", isAuth, getProfile);
module.exports = router;
