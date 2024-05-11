import { gql } from "@apollo/client";

const GET_BIBLIOTHEKS = gql`
    query getBibliotheks{
        bibliotheks{
            id,
            videoTheme,
            videoContent,
            url,
            ressort,
        }
    }
`;
const GET_BIBLIOTHEK = gql`
    query getBibliothek($id:ID!){
        bibliothek(id:$id){
            id,
            videoTheme,
            videoContent,
            url,
            ressort,
        }
    }
`;
export {GET_BIBLIOTHEKS, GET_BIBLIOTHEK}