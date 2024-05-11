import {GraphQLObjectType, GraphQLString, GraphQLID} from 'graphql';
import DateType from './Date';
const BibliothekType = new GraphQLObjectType({
    name:"Bibliothek",
    fields:()=>({
        id:{type:GraphQLID},
        videoTheme:{type:GraphQLString},
        videoContent:{type:GraphQLString},
        url:{type:GraphQLString},
        ressort:{type:GraphQLString},
        createdAt:{type:DateType},
        updatedAt:{type:DateType},
    })
})
export default BibliothekType