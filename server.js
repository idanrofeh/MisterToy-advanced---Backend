const express = require("express");
const app = express();
let cors = require("cors");
const toyService = require("./services/toy.service.js");

app.use(express.json());
app.use(cors());

app.get("/api/toy", (req, res) => {
    let filterBy = req.query;
    if (filterBy?.labels?.length) {
        filterBy.labels = filterBy.labels.split("_");
    }
    const filteredToys = toyService.query(filterBy);
    res.send(filteredToys);
});

app.get("/api/toy/:toyId", (req, res) => {
    const { toyId } = req.params;
    const toy = toyService.getById(toyId);
    res.send(toy);
})

app.delete("/api/toy/:toyId", (req, res) => {
    const { toyId } = req.params;
    toyService.remove(toyId);
    res.send(`${toyId} removed`)
})

app.post("/api/toy", (req, res) => {
    let newToy = req.body;
    toyService.add(newToy);
    res.send("Toy added");
});

app.put("/api/toy", (req, res) => {
    const newToy = req.body;
    toyService.update(newToy);
    res.send(`${newToy.name} updated`);
})

app.listen(3030, () => console.log("server listening on port 3030!"));