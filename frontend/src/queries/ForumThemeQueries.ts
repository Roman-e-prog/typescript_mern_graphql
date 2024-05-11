import { gql } from "@apollo/client";

const GET_FORUMTHEMES = gql`
query getForumThemes{
    forumThemes{
        id,
        forumtheme,
        forumressort,
        forumcontent,
    }
}
`;
const GET_FORUMTHEME = gql`
query getForumTheme($id:ID!){
    forumTheme(id:$id){
        id,
        forumtheme,
        forumressort,
        forumcontent,
    }
}
`;
export {GET_FORUMTHEMES, GET_FORUMTHEME}
