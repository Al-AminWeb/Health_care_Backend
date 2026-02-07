import {Router} from "express";
import {specialityRoutes} from "../modules/speciality/speciality.routes";
import {authRoutes} from "../modules/auth/auth.route";


const router = Router();

router.use("/specialities", specialityRoutes)
router.use('/auth',authRoutes)

export const indexRoutes = router;