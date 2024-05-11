import { gql } from "@apollo/client";

const REGISTER_USER = gql`
mutation registerUser($vorname:String!, $nachname:String!, $username:String!, $email:String!, $password:String!){
    registerUser(vorname:$vorname, nachname:$nachname, username:$username, email:$email, password:$password){
        id,
        vorname,
        nachname,
        username,
        email,
        isAdmin,
    }
}
`
const UNIQUE_USERNAME = gql`
    mutation uniqueUsername($username:String!){
        uniqueUsername(username:$username){
            username
        }
    }
`
const UNIQUE_EMAIL = gql`
    mutation uniqueEmail($email:String!){
        uniqueEmail(email:$email){
            email
        }
    }
`
const LOGIN_USER = gql`
    mutation loginUser($username:String!, $email:String!, $password:String!){
        loginUser(username:$username, email:$email, password:$password){
            id,
            username,
            vorname,
            nachname
            email,
            isAdmin,
            accessToken,
            profilePicture
        }
    }
`
const UPDATE_USER = gql`
    mutation updateUser($id:ID!, $vorname:String, $nachname:String, $profilePicture:String, $cloudinaryId:String){
        updateUser(id:$id, vorname:$vorname, nachname:$nachname, profilePicture:$profilePicture, cloudinaryId:$cloudinaryId){
            id,
            vorname,
            nachname,
            username,
            profilePicture,
        }
    }
`
const DELETE_USER = gql`
    mutation deleteUser($id:ID!){
        deleteUser(id:$id){
            id,
        }
    }
`;
export {REGISTER_USER, UNIQUE_USERNAME, UNIQUE_EMAIL, LOGIN_USER, UPDATE_USER, DELETE_USER}