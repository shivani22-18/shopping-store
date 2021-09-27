require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
const bodyParser = require('body-parser');
const morgan = require('morgan');

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const { summary } = require('./controllers/orders');
const { adminAuth } = require('./middleware/check-auth');
const http = require('http');


const app = express()

app.use(morgan('dev'));

// Setup static files path
app.use('/uploads', express.static('uploads'));
app.use('/', express.static('public'));

// Use body parser middleware to parse body of incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: 'http://localhost:4200'}))
// app.use(fileUpload({
//     useTempFiles: true
// }))

// Setup CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use((req, res, next) => {
    console.log({ body: req.body });
    console.log({ query: req.query });
    console.log({ params: req.params });

    next();
});


app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/summary', adminAuth, summary);


app.use('/api/uploads*', (req, res, next) => {
    try {
        res.sendFile(__dirname + '/uploads' + req.params[0])
    } catch (error) {
        next();
    }
})

app.use('/*', (req, res, next) => {
    try {
        res.sendFile(__dirname + '/public/index.html')
    } catch (error) {
        next();
    }
})

// Handle Error Requests
app.use((req, res, next) => {
    const error = new Error();
    error.message = 'Not Found';
    error.status = 404;

    next(error);
});

app.use((error, req, res, next) => {
    console.log(error);

    res.status(error.status || 500).json({
        error
    });
});

module.exports = app;



const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})