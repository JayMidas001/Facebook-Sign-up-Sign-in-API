const { UserSignUp, UserlogIn } = require("../controller/userController")
const { validateSignUp, validateSignIn } = require("../middlewares/validator")

const router = require(`express`).Router()

router.post(`/sign-up`, validateSignUp, UserSignUp)
router.post(`/sign-in`, validateSignIn, UserlogIn)

module.exports = router