import { gql } from "@apollo/client";
const GET_UEBERMICHS = gql`
    query getUebermichs{
        uebermichs{
            myPerson,
            id,
        }
    }
`;
const GET_UEBERMICH = gql`
    query getUebermich($id:ID!){
        uebermich(id:$id){
            myPerson,
            id,
        }
    }
`;
export {GET_UEBERMICHS, GET_UEBERMICH}