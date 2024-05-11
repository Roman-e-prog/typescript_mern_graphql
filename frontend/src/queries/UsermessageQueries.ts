import { gql } from "@apollo/client";

const GET_USERMESSAGES = gql`
    query getUserMessages{
        usermessages{
            id,
            userId,
            message,
            username,
            isAnswered,
            createdAt,
            updatedAt,
        }
    }
`;
const GET_USERMESSAGE = gql`
    query getUserMessage($id:Id!){
        usermessages(id:$id){
            id,
            userId,
            message,
            username,
            isAnswered,
            createdAt,
            updatedAt,
        }
    }
`;
export {GET_USERMESSAGES, GET_USERMESSAGE}