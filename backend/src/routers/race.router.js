import { Router } from "express";
import { raceController } from "../controllers/race.controller.js";

const raceRouter = Router();

raceRouter.get("/getListOfRaces", raceController.getAll);
raceRouter.get("/getRace", raceController.getOne);
raceRouter.post("/addNewRace", raceController.addNew);
raceRouter.put("/updateRace", raceController.update);
raceRouter.delete('/deleteRace', raceController.delete);

export { raceRouter };
