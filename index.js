const express = require("express")
const server = express()
const db = require("./data/db")
const postsRouter = require("./posts/posts-router")
const commentsRouter = require("./comments/comments-router")

server.use(express.json())
server.use(postsRouter)
server.use(commentsRouter)

// server.get("/", (req, res) => {
// 	res.json({ message: "Hello, World" })
// })


server.listen(5000, () => {
    console.log("Server on port 5000")
}) 