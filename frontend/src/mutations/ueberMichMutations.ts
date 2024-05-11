import { gql } from "@apollo/client";
const ADD_UEBERMICH = gql`
    mutation addUebermich($myPerson:String!){
        addUebermich(myPerson:$myPerson){
            myPerson
        }
    }
`
const DELETE_UEBERMICH = gql`
    mutation deleteUebermich($id:ID!){
        deleteUebermich(id:$id){
            id
        }
    }
`
const UPDATE_UEBERMICH = gql`
    mutation updateUebermich($id:ID!, $myPerson:String!){
        updateUebermich(id:$id, myPerson:$myPerson){
            id,
            myPerson,
        }
    }
`
export {ADD_UEBERMICH, DELETE_UEBERMICH, UPDATE_UEBERMICH}