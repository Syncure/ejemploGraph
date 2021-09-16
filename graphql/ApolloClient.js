import { ApolloClient, ApolloLink, InMemoryCache }  from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const middlewareUpdate =  createUploadLink({ uri : `http://localhost:4000/graphql` });



const client = new ApolloClient({   
    link : middlewareUpdate,
    cache: new InMemoryCache(),
})

export default client