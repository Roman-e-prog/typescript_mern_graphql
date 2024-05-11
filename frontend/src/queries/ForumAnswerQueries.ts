import { gql } from "@apollo/client";

const GET_FORUMANSWERS = gql`
    query getForumAnswers{
        forumAnswers{
            id,
            questionId,
            senderId,
            sendername,
            senderProfilePicture,
            answer,
            answererId,
            answererUsername,
            hasSolved,
        }
    }
`;
const GET_FORUMANSWER = gql`
    query getForumAnswer($id:ID!){
        forumAnswer(id:$id){
            id,
            questionId,
            senderId,
            sendername,
            senderProfilePicture,
            answer,
            answererId,
            answererUsername,
            hasSolved
        }
    }
`;
export {GET_FORUMANSWERS, GET_FORUMANSWER}