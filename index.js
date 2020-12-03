// Require express and body-parser
const express = require("express")
const bodyParser = require("body-parser")
const ffprobe = require('fluent-ffmpeg').ffprobe
const MINIO_ENDPOINT = "localhost";
// Initialize express and define a port
const app = express()
const PORT = process.env.PORT || 3333;

// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json())
app.post("/*", async (req, res) => {
    let key = req.body.Key;
    let aud_url = `http://${process.env.MINIO_ENDPOINT || MINIO_ENDPOINT}:9000/${key}`;
    ffprobe(aud_url, (err, metadata) => {
        if (err)
            console.log(err)
        id = key.replace(".mp3", "");
        let payload = { duration: metadata.format.duration, key, id: id.substr(key.indexOf("uploads/") + 8) }
        console.log(payload);
        res.status(200).end() // Responding is important

    });


})

// Start express on the defined port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))