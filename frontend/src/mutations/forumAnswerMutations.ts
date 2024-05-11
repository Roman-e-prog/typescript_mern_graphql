import { gql } from "@apollo/client";

const ADD_ANSWER = gql`
    mutation addAnswer($questionId:ID!, $sendername:String!, $senderId:ID!, $senderProfilePicture:String, $answererUsername:String, $answererId:ID, $answer:String!){
        addAnswer(questionId:$questionId, sendername:$sendername, senderId:$senderId, senderProfilePicture:$senderProfilePicture, answererUsername:$answererUsername, answererId:$answererId answer:$answer){
            questionId,
            sendername,
            senderId,
            senderProfilePicture,
            answer,
        }
    }
`;
const DELETE_ANSWER = gql`
    mutation deleteAnswer($id:ID!){
        deleteAnswer(id:$id){
            id
        }
    }
`;
const UPDATE_ANSWER = gql`
    mutation updateAnswer($id:ID!, $answer:String!){
        updateAnswer(id:$id, answer:$answer){
            id,
            answer
        }
    }
`;
const UPDATE_ANSWERLIKES = gql`
    mutation updateAnswerlikes($id:ID!, $answerLikeUserId:ID!){
        updateAnswerlikes(id:$id, answerLikeUserId: $answerLikeUserId){
            id,
            answerLikeUserId
        }
    }
`;
const UPDATE_ANSWERDISLIKES = gql`
    mutation updateAnswerdislikes($id:ID!, $answerDislikeUserId:ID!){
        updateAnswerdislikes(id:$id, answerDislikeUserId: $answerDislikeUserId){
            id,
            answerDislikeUserId
        }
    }
`;
const HAS_SOLVED = gql`
    mutation hasSolved($id:ID!, $questionId:ID!){
        hasSolved(id:$id, questionId:$questionId){
            id,
            questionId
        }
    }
`;
export {ADD_ANSWER, DELETE_ANSWER, UPDATE_ANSWER, UPDATE_ANSWERLIKES, UPDATE_ANSWERDISLIKES, HAS_SOLVED}