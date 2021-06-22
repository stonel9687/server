const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Contactlist = require('./collections/Contactlist')
const Todolist = require('./collections/Todolist')
const Userlog = require('./collections/Userlog')
const users = require('./collections/users')


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

app.use(express.json())
app.use(cors())

//CRUD Login

app.post('/post-userlog/', async (req, res) => {
    try {
        const userInfo = req.body
        const userlog = await users.findOne({ email: userInfo.email })
        if (userlog.email === userInfo.email) {
            res.send(userlog)
        } else {
            res.send({ status: 'error', mjs: 'Usuario no Registrado' })
        }
        res.send(userlog)
    } catch (error) {
        res.send(error)
    }
})

app.post('/register-post', async (req, res) => {
    try {
        const contact = req.body
        const newContact = await users.create(contact)
        res.send(newContact)
    } catch (error) {
        res.send(error)
    }
})
//CRUD Contact List
app.get('/get-contactlist', async (req, res) => {
    try {
        const contactList = await Contactlist.find({})
        res.send(contactList)
    } catch (error) {
        res.send(error)
    }
})
app.post('/post-contactlist', async (req, res) => {
    try {
        //en esta parte requerimos el body que es donde nos llega la info del front
        // y lo guardamos en una variable para poderla usar dentro del post
        //utilizamos el metodo create de express
        const contact = req.body
        const newContact = await Contactlist.create(contact)
        res.send(newContact)
    } catch (error) {
        res.send(error)
    }
})

app.put('/put-contactlist/:id', async (req, res) => {
    try {
        //utilizamos el metodo findById de express para buscar el elemento a modificar
        //buscar $set
        const dataToEdit = req.body
        const id = req.params.id
        const contactEdit = await Contactlist.findByIdAndUpdate({ _id: id }, { $set: dataToEdit }, { new: true })
        res.send(contactEdit)
    } catch (error) {
        res.send(error)
    }
})

app.delete('/delete-contactlist/:id', async (req, res) => {
    try {
        //utilizamos el metodo findbyiddelete de express, hacemos la busqueda por id
        const id = req.params.id
        const contactDeleted = await Contactlist.findByIdAndDelete({ _id: id })
        res.send(contactDeleted)
    } catch (error) {
        res.send(error)
    }
})
//CRUD To Do List

app.get('/get-todos', async (req, res) => {
    try {
        const todolist = await Todolist.find({})
        res.send(todolist)
    } catch (error) {
        res.send(error)
    }
})
app.post('/post-todo', async (req, res) => {
    try {
        //en esta parte requerimos el body que es donde nos llega la info del front
        // y lo guardamos en una variable para poderla usar dentro del post
        //utilizamos el metodo create de express
        const contact = req.body
        const newTask = await Todolist.create(contact)
        res.send(newTask)
    } catch (error) {
        res.send(error)
    }
})

app.put('/put-todo/:id', async (req, res) => {
    try {
        //utilizamos el metodo findById de express para buscar el elemento a modificar
        //buscar $set
        const dataToEdit = req.body
        const id = req.params.id
        const taskToEdit = await Todolist.findByIdAndUpdate({ _id: id }, { $set: dataToEdit }, { new: false })
        res.send(taskToEdit)
    } catch (error) {
        res.send(error)
    }
})

app.delete('/delete-todo/:id', async (req, res) => {
    try {
        //utilizamos el metodo findbyiddelete de express, hacemos la busqueda por id
        const id = req.params.id
        const taskDeleted = await Todolist.findByIdAndDelete({ _id: id })
        res.send(taskDeleted)
    } catch (error) {
        res.send(error)
    }
})

app.listen(5000, () => {
    console.log('servidor douglas')
})