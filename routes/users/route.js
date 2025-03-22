import {Router} from "express"
const userRouter= Router()
import { verifyToken, verifyAdmin } from "./verify.js"
import {register, login,getAllUsers,editUser, getUser, loginWithtoken} from "./controllers.js"



userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.post("/allUsers",verifyAdmin,getAllUsers)
userRouter.get("/getUser/:id",getUser)
userRouter.post("/editUser/:id",verifyAdmin,editUser)
userRouter.post("/loginwithtoken",verifyToken, loginWithtoken)
userRouter.get("/", async(req, res)=>{return res.status(200).send("hello")})







export default  userRouter