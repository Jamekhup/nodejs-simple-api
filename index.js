require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoute = require('./routes/product.route.js');
const categoryRoute = require('./routes/category.route.js');
const userRoute = require('./routes/user.route.js');

const PORT = 5000 || process.env.PORT;
const API = process.env.API_URL;


//middleware
app.use(morgan('tiny'));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended:false }));


//db connection
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Database connection established');
    
}).catch(err => {
    console.log(err.message);
    
});

app.use(`${API}/`, userRoute);
app.use(`${API}/product`, productRoute);
app.use(`${API}/category`, categoryRoute);



app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});






