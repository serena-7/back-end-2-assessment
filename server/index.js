const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

const {getCompliment, getFortune, getActivities, createActivity, deleteActivity, updateActivity} = require('./controller.js');

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);

app.get("/api/activities", getActivities);
app.post("/api/activities", createActivity);
app.put("/api/activities/:id", updateActivity);
app.delete("/api/activities/:id", deleteActivity)

app.listen(4000, () => console.log("Server running on 4000"));
