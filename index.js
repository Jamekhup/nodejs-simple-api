require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose');

const PORT = 5000 || process.env.PORT;

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Database connection established');
    
}).catch(err => {
    console.log(err.message);
    
});


app.use(express.json());
app.use(express.urlencoded({ extended:false }));

const productRoute = require('./routes/product.route.js');

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});

app.use('/api/products', productRoute);

app.get('/', (req, res) => {
    return res.send('Hello World!')
});



