import express, {Application, Request, Response} from "express";
import {prisma} from "./app/lib/prisma";
import {specialityRoutes} from "./app/modules/speciality/speciality.routes";
import {indexRoutes} from "./app/routes";

const app: Application = express();
// Enable URL-encoded form data parsing
app.use(express.urlencoded({extended: true}));

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/v1", indexRoutes)


// Basic route
app.get('/', async (req: Request, res: Response) => {
    const speciality = await prisma.speciality.create({
        data: {
            title: "caridiology",
            id:"1"
        }
    })
    res.status(201).json({
        success: true,
        data: speciality,
        message: "Speciality created successfully"
    })
});


export default app;