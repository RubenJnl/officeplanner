const express = require('express')
const fs = require('fs')
const cors = require('cors')
const app = express()

const registeredDatesUrl = './registeredEmployees.json';
// const gamesUrl = './games.json';


let registeredDates;
setRegisteredEmployeesDate();
// setGameData();

function setRegisteredEmployeesDate() {
    fs.readFile(registeredDatesUrl, (err, data) => {
        registeredDates = JSON.parse(data);
        // console.log(registeredDates)
    });
}

function getRegisteredDates() {
    console.log('GET /registered');
    setRegisteredEmployeesDate();
    return registeredDates;
}

function save(file, data) {
    fs.writeFile(file, JSON.stringify(data), (err) => {
        if (err) {
            console.log('Error writing file', err);
        }
    })
    
    console.log('get registered dates again')
    getRegisteredDates();
}

function addEmployee(employee, date) {
    let newRegisteredDate = {'date' :date, 'employee': employee};
    // Object.assign(registeredDates.savedDates, newRegisteredDate);
    // console.log(newRegisteredDate);
    registeredDates.savedDates.push(newRegisteredDate);
    console.log(registeredDates);
    save(registeredDatesUrl, registeredDates)
    
}

function removeEmployee(employee, date) {
    // console.log(employee, date);
    // console.log(registeredDates.savedDates)
    Array.prototype.forEach.call(registeredDates.savedDates, function(saved, i){
        if (saved.employee == employee && saved.date == date){
            console.log('index', i);
            
            registeredDates.savedDates.splice(i, 1);
        }
    })
    // console.log('new registered dates', registeredDates)
    save(registeredDatesUrl, registeredDates)
 
}


app.use(express.json());
app.use(cors());
app.use(express.static('./../front-end/build'));

app.post('/addEmployee', (req, res) => res.send(
    addEmployee(req.body.employee, req.body.date)
));

app.post('/removeEmployee', (req, res) => res.send(
    removeEmployee(req.body.employee, req.body.date)
));

// app.post('/addgame', (req, res) => res.send(
//     updateRankings(req.body.playerOne, req.body.playerTwo, req.body.playerOneSets, req.body.playerTwoSets)
// ));

app.get('/registered', (req, res) => res.send(
    getRegisteredDates()
));

// app.get('/games', (req, res) => res.send(
//     getGames()
// ));

app.listen(9000, () => console.log('officeplanner app listening on port 9000!'))