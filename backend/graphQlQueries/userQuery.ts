import User from "../models/User";
import UserType from "../graphQlTypes/User";
import {GraphQLID, GraphQLList, GraphQLString } from "graphql";
const users = {
    type: new GraphQLList(UserType),
    resolve(parent:any, args:any){
        return User.find();
    },
}
const user = {
    type:UserType,
    args:{id:{type:GraphQLID}},
    resolve(parent:any, args:any){
        return User.findById(args.id)
    }
}
export {users, user};