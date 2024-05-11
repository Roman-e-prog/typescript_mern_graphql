import {GraphQLObjectType, GraphQLString, GraphQLID} from 'graphql'
const UebermichType = new GraphQLObjectType({
    name:"Uebermich",
    fields: ()=>({
        id:{type:GraphQLID},
        myPerson:{type:GraphQLString},
    })
 })
 export default UebermichType;