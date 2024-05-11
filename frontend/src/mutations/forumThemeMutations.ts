import { gql } from "@apollo/client";

const ADD_FORUMTHEME = gql`
    mutation addForumTheme($forumtheme:String!, $forumressort:String!, $forumcontent:String!){
        addForumTheme(forumtheme:$forumtheme, forumressort:$forumressort, forumcontent: $forumcontent){
            forumtheme,
            forumressort,
            forumcontent,
        }
    }
`;
const UPDATE_FORUMTHEME = gql`
mutation updateForumTheme($id:ID!, $forumtheme:String!, $forumressort:String!, $forumcontent:String!){
    updateForumTheme(id:$id,forumtheme:$forumtheme, forumressort:$forumressort, forumcontent: $forumcontent){
        id,
        forumtheme,
        forumressort,
        forumcontent,
    }
}
`;
const DELETE_FORUMTHEME = gql`
mutation deleteForumTheme($id:ID!){
    deleteForumTheme(id:$id){
        id,
    }
}
`;
export {ADD_FORUMTHEME, UPDATE_FORUMTHEME, DELETE_FORUMTHEME}