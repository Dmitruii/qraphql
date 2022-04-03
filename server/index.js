const express = require('express')
require('dotenv').config()
const cors = require('cors')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema')

// conditional database)
const users = [
    {id: 1, username: `dima`, age: 16},
    {id: 2, username: `stas`, age: 16},
    {id: 3, username: `artem`, age: 15},
    {id: 4, username: `vita`, age: 32},
    {id: 5, username: `kolya`, age: 12},
]

const app = express()
app.use(cors())

const createUser = (input) => {
    const id = Date.now()
    return {id, ...input}
}
const root = {
    getAllUsers: () => {
        return users
    },
    getUser: ({id}) => {
        return users.find(user => user.id == id)
    },
    createUser: ({input}) => {
        const user = createUser(input)
        users.push(user)
        return user
    }
}

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))

app.listen(process.env.PORT, () => console.log(`Server was started on ${process.env.PORT} PORT`))