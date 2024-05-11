import { gql } from "@apollo/client";

const ADD_USERMESSAGE = gql`
    mutation addUsermessage($userId:ID!, $message:String!, $username:String!){
        addUsermessage(userId:$userId, message:$message, username:$username){
            id,
            userId,
            message,
            username,
        }
    }
`;
const DELETE_USERMESSAGE = gql`
    mutation deleteUsermessage($id:ID!){
        deleteUsermessage(id:$id){
            id
        }
    }
`;
export {ADD_USERMESSAGE, DELETE_USERMESSAGE};