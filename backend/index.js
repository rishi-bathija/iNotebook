const connectToMongo = require('./db');
var cors = require('cors');
connectToMongo();

const express = require('express')
const app = express()
const port = 5000

// const corsOptions = {
//   origin: 'http://localhost:3002',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));

app.use(cors());

app.use(express.json()); // acts as middleware for abstracting the data sent in request body

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on http://localhost:${port}`);
})