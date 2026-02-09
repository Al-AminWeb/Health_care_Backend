import {Router} from "express";
import {specialityRoutes} from "../modules/speciality/speciality.routes";
import {authRoutes} from "../modules/auth/auth.route";
import {userRoutes} from "../modules/user/user.route";
import {doctorRoutes} from "../modules/doctor/doctor.route";


const router = Router();

router.use("/specialities", specialityRoutes)
router.use('/auth',authRoutes)
router.use("/users",userRoutes)
router.use("/doctors",doctorRoutes)

export const indexRoutes = router;