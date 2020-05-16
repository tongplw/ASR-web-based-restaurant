const express = require('express')
const app = express()

const PORT = process.env.PORT || 8080

app.get('/', (req, res) => res.send('Hello World'))

app.get('/getMenu',(req, res)=> {
    console.log(req.data)
    res.send("I got that")
})

app.listen(PORT, () => {

    console.log(`Server is running on port : ${PORT}`)
})

module.exports = app