import Bibliothek from "../models/Bibliothek";
import BibliothekType from "../graphQlTypes/Bibliothek";
import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";

const bibliotheks = {
    type:new GraphQLList(BibliothekType),
    async resolve(parent:any, args:any){
        return await Bibliothek.find();
    }
}
const bibliothek = {
    type:BibliothekType,
    args:{id:{type:new GraphQLNonNull(GraphQLID)}},
    async resolve(parent:any, args:any){
        return await Bibliothek.findById(args.id)
    }
}
export {bibliotheks, bibliothek}