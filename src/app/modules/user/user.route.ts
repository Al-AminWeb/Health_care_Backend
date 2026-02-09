import {userController} from "./user.controller";
import {Router} from "express";


const router = Router();

router.post("/create-doctor", userController.createDoctor)

export const userRoutes = router;