import {userController} from "./user.controller";
import {NextFunction, Router, Response, Request} from "express";
import z from "zod";
import {Gender} from "../../../generated/prisma/enums";


const createDoctorZodSchema = z.object({
    password: z.string("Password is required").min(6, "Password must be at least 6 characters long").max(20, "Password must be less than 20 characters long"),
    doctor: z.object({
        name: z.string("Name is required").min(2, "Name must be at least 2 characters long").max(20, "Name must be less than 20 characters long"),
        email: z.email("Invalid email address"),
        contactNumber: z.string("Contact number is required").min(11, "Contact number must be 11 digits long").max(14, "contact number must be 14 digits long"),
        address: z.string("Address is required").min(2, "Address must be at least 5 characters long").max(100, "Address must be less than 100 characters long").optional(),
        registrationNumber: z.string("Registration number is required"),
        experience: z.int("Experience is required").nonnegative("experience must be a non-negative integer").optional(),

        gender: z.enum([Gender.MALE, Gender.FEMALE], "Gender must be male or female"),
        appointmentFee: z.number("Appointment fee is required").nonnegative("Appointment fee must be a positive number"),
        qualification: z.string("Qualification is required").min(3, "Qualification must be at least 4 characters long").max(100, "Qualification must be less than 100 characters long"),
        currentWorkingPlace: z.string("Current working place is required").min(3, "Current working place must be at least 4 characters long").max(100, "Current working place must be less than 100 characters long"),
        designation: z.string("Designation is required").min(3, "Designation must be at least 4 characters long").max(100, "Designation must be less than 100 characters long"),
    }),
    specialties: z.array(z.uuid(), "specialties must be an array of uuids").min(1, "At least one specialty is required")
})

const router = Router();

router.post("/create-doctor",
    (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body, "Before Zod validation")
        const parsedResult = createDoctorZodSchema.safeParse(req.body);

        if (!parsedResult.success) {
            console.error("Validation failed:", parsedResult.error.issues);
            return next(parsedResult.error);

        }

        //sanitizing the data
        req.body = parsedResult.data

        console.log(req.body, "After Zod validation")
        next();
    },


    userController.createDoctor)

export const userRoutes = router;