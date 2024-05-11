import {GraphQLObjectType, GraphQLSchema} from 'graphql';
//mutations
import {registerUser, loginUser, uniqueUsername, uniqueEmail, updateUser} from '../graphqlMutations/user';
import {addUebermich, deleteUebermich, updateUebermich} from '../graphqlMutations/uebermich';
import {addBlogpost, deleteBlogpost, updateBlogpost} from '../graphqlMutations/blogpost';
import {addForumTheme, deleteForumTheme, updateForumTheme} from '../graphqlMutations/forumTheme';
import {addForum, deleteForum, updateForum, updateViews, updateLikes, updateDislikes} from '../graphqlMutations/forum';
import {addAnswer, deleteAnswer, updateAnswer, updateAnswerlikes, updateAnswerdislikes, hasSolved} from '../graphqlMutations/forumAnswers';
import { addUsermessage, deleteUsermessage } from '../graphqlMutations/usermessages';
import { addAdminAnswer,updateAdminAnswer, deleteAdminAnswer } from '../graphqlMutations/adminAnswer';
import {addBibliothek, updateBibliothek, deleteBibliothek} from '../graphqlMutations/bibliothek'
//queries
import {users, user} from '../graphQlQueries/userQuery';
import {uebermichs, uebermich} from '../graphQlQueries/uebermichQuery';
import {blogposts, blogpost} from '../graphQlQueries/blogpostQuery';
import {forumThemes, forumTheme} from '../graphQlQueries/forumThemeQuery';
import {forums, forum} from '../graphQlQueries/forumQuery';
import {forumAnswers, forumAnswer} from '../graphQlQueries/forumAnswerQuery';
import { usermessages, usermessage } from '../graphQlQueries/usermessageQuery';
import { adminAnswers, adminAnswer } from '../graphQlQueries/adminAnswerQuery';
import {bibliotheks, bibliothek} from '../graphQlQueries/bibliothekQuery';
const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        //login
        registerUser,
        uniqueUsername,
        uniqueEmail,
        loginUser,
        updateUser,
        //ueberMich
        addUebermich,
        deleteUebermich,
        updateUebermich,
        //blogpost
        addBlogpost,
        deleteBlogpost,
        updateBlogpost,
        //forumtheme
        addForumTheme,
        deleteForumTheme,
        updateForumTheme,
        //forums
        addForum,
        deleteForum,
        updateForum,
        updateViews,
        updateLikes,
        updateDislikes,
        //forumAnswers
        addAnswer,
        deleteAnswer,
        updateAnswer,
        updateAnswerlikes,
        updateAnswerdislikes,
        hasSolved,
        //usermessages
        addUsermessage,
        deleteUsermessage,
        //adminAnswers
        addAdminAnswer,
        updateAdminAnswer,
        deleteAdminAnswer,
        //Bibliothek
        addBibliothek,
        updateBibliothek,
        deleteBibliothek,
    }
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        users,
        user,
        uebermichs,
        uebermich,
        blogposts,
        blogpost,
        forumThemes,
        forumTheme,
        forums,
        forum,
        forumAnswers,
        forumAnswer,
        usermessages,
        usermessage,
        adminAnswers,
        adminAnswer,
        bibliotheks,
        bibliothek,
    }
})
 export default new GraphQLSchema({
    query: RootQuery,
    mutation,
  });