import {Router} from "express";
import {specialityController} from "./speciality.controller";
import {ROLE} from "../../../generated/prisma/enums";
import {checkAuth} from "../../middleware/checkAuth";

const router = Router();

router.post('/', checkAuth(ROLE.ADMIN, ROLE.SUPER_ADMIN), specialityController.createSpeciality);
router.get('/', specialityController.getAllSpecialities);
router.delete('/:id', checkAuth(ROLE.ADMIN, ROLE.SUPER_ADMIN), specialityController.deleteSpeciality);

export const specialityRoutes = router;


