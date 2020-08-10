const express = require("express")
const db = require("../data/db")
const router = express.Router()


router.get("/api/posts/:id/comments", (req, res) => {
    db.findPostComments(req.params.id)
    .then(comments => {
        res.status(200).json(comments)
    })
    .catch(error => { 
        res.status(500).json({message: "Aw snap, something ain't right."})
    })
})

// router.post("/api/posts/:id/comments", (req, res) => {
//     db.findById(req.params.id)
//     .then(comments => {
//         if (!req.body.text) {
//             return res.status(400).json({
//                 message: "Please add text to your comment",
//             })
//         }
//         db.insertComment(req.body.text)
//         res.status(200).json(req.body.text)
//     })
//     .catch(error => { 
//         res.status(500).json({message: "Aw snap, something ain't right."})
//     })
// })
router.post("/api/posts/:id/comments", (req, res) => {
    if (!req.body.text) {
        return res.status(400).json({
            message: "Please add text to your comment",
        })
    }
    db.insertComment({post_id: req.params.id, text: req.body.text})
    .then(comments => { 
        res.status(200).json(req.body.text)
    })
    .catch(error => { 
        res.status(500).json({message: "Aw snap, something ain't right."})
    })
})




module.exports = router