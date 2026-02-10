import {userController} from "./user.controller";
import {NextFunction, Router, Response, Request} from "express";
import z from "zod";
import {Gender} from "../../../generated/prisma/enums";
import {validateRequest} from "../../middleware/validateRequest";
import {createDoctorZodSchema} from "./user.validation";



const router = Router();


router.post("/create-doctor", validateRequest(createDoctorZodSchema), userController.createDoctor)

export const userRoutes = router;