const express = require("express");

const app = express();

const mongoose = require('mongoose');

// const swaggerJsDoc = require('swagger-jsdoc');

// const swaggerUI = require('swagger-ui-express');

const User  = require("./models/user");

const cors = require("cors");
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


let port = process.env.PORT || 3000;


mongoose.connect(
    'mongodb+srv://oladeji_1993:Olanipekun1@cluster0.brtx8.mongodb.net/TestDB?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }
    )
    .then(res => {
        console.log('Mongoose DB Connection successful');
    })
    .catch(err => {
        console.log('Mongoose DB connection failed', err);
    }
);


// const swaggerOptions = {
//     swaggerDefinition:{
//         info: {
//             title: 'Login Api',
//             version: '1.0.0'
//         }
//     },

//     apis: ['index.js']
// };


// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// console.log(swaggerDocs)
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));



//  /**
//  *@swagger
//  * /users:
//  *  get:
//  *      description: Get all Users
//  *      responses:
//  *          200:
//  *            description: success
//  */ 

app.get('/', (req, res) => {
    res.send("hello world")
});

//   /**
//  *@swagger
//  * /users:
//  *  post:
//  *      description: Validate Details
//  *      requestBody:
//  *       content:
//  *        application/json
//  *      responses:
//  *          201:
//  *            description: created
//  */ 



app.post("/users", (req, res) =>{
    // res.status(201).send();
    console.log(req.body)

    if (!req.body.username || !req.body.password) return res.status(404).send('Invalid username or password');

    User.findOne({ username: req.body.username })
        .exec()
        .then(async (user) => {

            console.log(user)
            if (!user) return res.status(400).send('Invalid Username/Password');

            if (req.body.password !== user.password) return res.status(400).send('Invalid username or password.');
            
            return res
            .status(200)
            .json({message: "user login was successful"});
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send('Server Error, Please Retry Again');
        });
})

app.listen(port, () => {
    console.log(`My app is listening to port http://localhost:${port}`)
});



