import { gql } from "@apollo/client";

const ADD_ADMINANSWER = gql`
    mutation addAdminAnswer($firstMessageId:ID!, $sendUserId:ID!, $sendUsername:String!, $adminId:ID!, $adminname:String!, $adminAnswer:String!){
        addAdminAnswer(firstMessageId:$firstMessageId, sendUserId:$sendUserId, sendUsername:$sendUsername, adminId:$adminId, adminname:$adminname, adminAnswer:$adminAnswer){
            firstMessageId,
            sendUserId,
            sendUsername,
            adminId,
            adminname,
            adminAnswer
        }
    }
`;
const UPDATE_ADMINANSWER = gql`
    mutation updateAdminAnswer($id:ID!, $adminAnswer:String!){
        updateAdminAnswer(id:$id, adminAnswer:$adminAnswer){
            id,
            firstMessageId,
            sendUserId,
            sendUsername,
            adminId,
            adminname,
            adminAnswer,
        }
    }
`;
const DELETE_ADMINANSWER = gql`
    mutation deleteAdminAnswer($id:ID!){
        deleteAdminAnswer(id:$id){
            id,
        }
    }
`;
export {ADD_ADMINANSWER, UPDATE_ADMINANSWER, DELETE_ADMINANSWER}