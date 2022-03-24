const fs = require("fs");

let toys = require("../data/toy.json");

module.exports = {
    query,
    getById,
    remove,
    add,
    update
}

function query(filterBy) {
    if (!filterBy) return toys;
    const filteredToys = _getFilteredToys(filterBy);
    return (filteredToys);
}

function _getFilteredToys(filterBy) {
    let filteredToys = [...toys];
    filteredToys = _filterProperty("name", filterBy, filteredToys);
    filteredToys = _filterProperty("inStock", filterBy, filteredToys);
    filteredToys = _filterProperty("labels", filterBy, filteredToys);
    return filteredToys;
}

function _filterProperty(property, filterBy, filteredToys) {
    if (!filterBy[property]) return filteredToys;
    switch (property) {
        case "name":
            filteredToys = filteredToys.filter(toy => {
                return toy.name.toLowerCase().includes(filterBy.name.toLowerCase())
            });
            break;
        case "inStock":
            if (filterBy.inStock === "all") return filteredToys;
            filteredToys = filteredToys.filter(toy => toy.inStock === filterBy.inStock);
            break;
        case "labels":
            if (!filterBy.labels.length) return filteredToys;
            if ((filterBy.labels.length === 1) && (filterBy.labels[0] === "")) return filteredToys;
            filteredToys = filteredToys.filter(toy => {
                return filterBy.labels.every(label => toy.labels.includes(label))
            })
            break;
        default: return;
    } return filteredToys;
}

function getById(toyId) {
    const toy = toys.find(toy => toy._id === toyId);
    return ((toy) ? toy : `No such toy ${toyId}`);
}

function remove(toyId) {
    toys = toys.filter(toy => toy._id !== toyId);
    return _saveToysToFile();
}


function save(newToy) {
    if (newToy._id) {
        toys = toys.map(toy => (toy._id === newToy._id) ? newToy : toy)
    } else {
        newToy._id = _makeId();
        newToy.createdAt = Date.now();
        toys.push(newToy);
    } return _saveToysToFile();
}

function update(newToy) {
    toys = toys.map(toy => (toy._id === newToy._id) ? newToy : toy);
    _saveToysToFile();
}

function add(newToy) {
    toys.push(newToy);
    _saveToysToFile();
}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile("data/toy.json", JSON.stringify(toys, null, 2), (err) => {
            if (err) {
                reject("Cannot write to file");
            } else {
                resolve(toys);
            }
        })
    })
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
