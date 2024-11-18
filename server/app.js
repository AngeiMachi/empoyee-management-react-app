const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const PORT = 3001;
const app = express();

app.use(cors()); // Use cors middleware
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(bodyParser.json());

const employees = [
  {
    id: 1,
    name: 'John',
    status: 'Working',
    img: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    id: 2,
    name: 'Jack',
    status: 'Working',
    img: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    id: 3,
    name: 'Sheli',
    status: 'Working',
    img: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: 4,
    name: 'Eitan',
    status: 'Working',
    img: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 5,
    name: 'Johana Levi',
    status: 'Working',
    img: 'https://randomuser.me/api/portraits/women/5.jpg'
  },
  {
    id: 6,
    name: 'Nicci Troiani',
    status: 'Working',
    img: 'https://randomuser.me/api/portraits/women/6.jpg'
  },
]

app.get('/users', (req, res) => {
    res.send(employees);
})

app.post('/users/:id', (req, res) => {
  const index = employees.findIndex((obj => obj.id === +req.params.id));
  employees[index].status = req.body.status
    res.send(employees);
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})