const express = require('express');
const router = require("express").Router();
const fileUpload = require('express-fileupload');
const path = require('path');
const error400 = require("./middleware/error400");
const error413 = require("./middleware/error413");
const error422 = require("./middleware/error422");
const { spawn, exec } = require("child_process");
const PORT = process.env.PORT || 3001;
const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../clientVanilla/index.html"))
})

app.post("/audiofile",
    fileUpload({ createParentPath: true }),
    error400,
    error422([".wav", ".mp3"]),
    error413,
    (req, res) => {
        const files = req.files
        Object.keys(files).forEach(key => {
            const filepath = path.join(__dirname, 'files', files[key].name)
            files[key].mv(filepath, (err) => {
                if (err) return res.status(500).json({ status: "error", message: err})
            })
            exec(`gst-launch-1.0 filesrc location="${filepath.replaceAll("\\", "/")}" ! wavparse ! audioconvert ! audioresample ! directsoundsink`, (error, stdout, stderr) => {
                console.log("error: ", error)
                console.log("stdout: ", stdout)
                console.log("stderr: ", stderr)
            })
        })
        return res.json({ status: 'success', message: Object.keys(files).toString()})
    }
)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

