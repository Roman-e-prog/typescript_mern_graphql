import { gql } from "@apollo/client";

const ADD_BIBLIOTHEK = gql`
    mutation addBibliothek($videoTheme:String!, $videoContent:String!, $url:String!, $ressort:String!){
        addBibliothek(videoTheme:$videoTheme, videoContent:$videoContent, url:$url, ressort:$ressort){
            videoTheme,
            videoContent,
            url,
            ressort,
        }
    }
`;
const UPDATE_BIBLIOTHEK = gql`
    mutation updateBibliothek($id:ID!, $videoTheme:String!, $videoContent:String!, $url:String!, $ressort:String!){
        updateBibliothek(id:$id, videoTheme:$videoTheme, videoContent:$videoContent, url:$url, ressort:$ressort){
            id,
            videoTheme,
            videoContent,
            url,
            ressort,
        }
    }
`;
const DELETE_BIBLIOTHEK = gql`
    mutation deleteBibliothek($id:ID!){
        deleteBibliothek(id:$id){
            id,
        }
    }
`;
export {ADD_BIBLIOTHEK, UPDATE_BIBLIOTHEK, DELETE_BIBLIOTHEK}