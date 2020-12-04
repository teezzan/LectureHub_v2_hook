let { GraphQLClient, gql } = require('graphql-request');

let send = async () => {
    const endpoint = 'http://localhost:3000'

    const graphQLClient = new GraphQLClient(endpoint)

    const mutation = gql`

    mutation ($key: String!, $duration: Float!, $id: ID! ) {
        SudoUpdateLecture( key: $key, duration: $duration, id: $id )
    }
        
  `

    const data = await graphQLClient.request(mutation, {
        key: "lecturesv1/uploads/5fc8fc660a2eea27a0e0e1a4.mp3",
        id: "5fc8fc660a2eea27a0e0e1a4", duration: 555
    });
    return data

}
send().then(x => console.log(x)).catch(err => console.log(err))