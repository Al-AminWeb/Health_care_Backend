import express, {Application, Request, Response} from "express";
import {prisma} from "./lib/prisma";

const app: Application = express();
// Enable URL-encoded form data parsing
app.use(express.urlencoded({extended: true}));

// Middleware to parse JSON bodies
app.use(express.json());

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