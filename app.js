const express = require('express');
const app = express();
const path = require('node:path');
const userModel = require('./models/users');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");


app.get('/', function (req, res) {
    res.render("index");
})


app.get('/read', async function (req, res) {
   const alluser = await userModel.find();
    res.render("read", {users: alluser});
})

app.post('/create', async function (req, res) {
    let { name, email, Image } = req.body;

    const createUser = await userModel.create(
        {
            name,
            email,
            Image
        }
    )

    res.redirect('/read')
})


app.get('/delete/:id', async (req, res)=>{
    const deleteUser = await userModel.findOneAndDelete({_id: req.params.id})
    res.redirect('/read');
})


app.get('/edit/:id', async (req, res)=>{
    const user = await userModel.findOne({_id: req.params.id})
    res.render('edit', {user});
})


app.post('/update/:id', async (req, res)=>{
    let {name, email, Image} = req.body;
    let user = await userModel.findOneAndUpdate({_id: req.params.id}, {name, email, Image}, {new:true});
    res.redirect('/read');
})


app.listen(3000);