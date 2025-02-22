import express from "express";
import cors from "cors";
import RideController from "./controllers/RideController.js";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.get("/rides", RideController.List);
app.get("/rides/drivers/:driver_user_id", RideController.ListForDriver);
app.get("/rides/:ride_id", RideController.ListDetail);

app.post("/rides", RideController.Insert);

app.delete("/rides/:ride_id", RideController.Delete);

app.put("/rides/:ride_id/finish", RideController.Finish);
app.put("/rides/:ride_id/accept", RideController.Accept);
app.put("/rides/:ride_id/cancel", RideController.Cancel);


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
