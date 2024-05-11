import { gql } from "@apollo/client";

const GET_USERS = gql`
    query getUsers{
        users{
            id,
            vorname,
            nachname,
            username,
            email,
            isAdmin,
            profilePicture,
        }
    }
`
const GET_USER = gql`
query getUser($id:ID!){
    user(id:$id){
        id,
        vorname,
        nachname,
        username,
        email,
        isAdmin,
        profilePicture
    }
}`
export {GET_USERS, GET_USER}