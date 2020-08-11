const express = require("express")
const db = require("../data/db")
const router = express.Router()

router.get("/api/posts", (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(error => { 
        res.status(500).json({message: "Aw snap, something ain't right."})
    })
})

router.get("/api/posts/:id", (req, res) => {
	db.findById(req.params.id)
		.then((posts) => {
			res.status(200).json(posts)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the posts",
			})
		})
})

router.post("/api/posts", (req, res) => {
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			message: "Please add a title and contents",
		})
	}
	db.insert(req.body)
		.then((posts) => {
			res.status(201).json(posts)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error adding the post",
			})
		})
})

router.put("/api/posts/:id", (req, res) => {
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			message: "Missing the meat of the post. Try again with a title and contents",
		})
	}

	db.update(req.params.id, req.body)
		.then((posts) => {
			if (posts) {
				res.status(200).json(posts)
			} else {
				res.status(404).json({
					message: "The posts could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error updating the posts",
			})
		})
})

router.delete("/api/posts/:id", (req, res) => {
	db.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The post has been nuked",
				})
			} else {
				res.status(404).json({
					message: "The posts could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error removing the posts",
			})
		})
})


module.exports = router