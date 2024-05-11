import {gql} from '@apollo/client';

const GET_ADMINANSWERS = gql`
    query getAdminAnswers{
        adminAnswers{
            id,
            firstMessageId,
            sendUserId,
            sendUsername,
            adminId,
            adminname,
            adminAnswer,
            createdAt,
        }
    }
`;
const GET_ADMINANSWER = gql`
    query getAdminAnswer($id:ID!){
        adminAnswer(id:$id){
            id,
            firstMessageId,
            sendUserId,
            sendUsername,
            adminId,
            adminname,
            adminAnswer,
            createdAt,
        }
    }
`;
export {GET_ADMINANSWERS, GET_ADMINANSWER}