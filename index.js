const express = require("express")
const bodyParser = require("body-parser")
const ffprobe = require('fluent-ffmpeg').ffprobe
let { GraphQLClient, gql } = require('graphql-request');

const app = express()
const PORT = process.env.PORT || 3333;

app.use(bodyParser.json())
app.post("/", async (req, res) => {
    let id = req.body.id;
    let url = req.body.url;
    res.status(200);
    ffprobe(url, async (err, metadata) => {
        if (err) {
            console.log(err)
            return err
        }

        let payload = { duration: metadata.format.duration, id };
        let resp = await send(payload);
        console.log(resp);
        // res.status(200).end()
        return true

    });


})




// Start express on the defined port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

let send = async (payload) => {
    const endpoint = process.env.BEND_POINT || 'https://islamvibes.herokuapp.com';

    const graphQLClient = new GraphQLClient(endpoint)

    const mutation = gql`

    mutation ( $duration: Float!, $id: ID! ) {
        SudoUpdateLecture( duration: $duration, id: $id )
    }
        
  `

    const data = await graphQLClient.request(mutation, payload);
    return data

}
