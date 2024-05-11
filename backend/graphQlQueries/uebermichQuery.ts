import Uebermich from "../models/Uebermich";
import UebermichType from "../graphQlTypes/Uebermich";
import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
const uebermichs = {
    type: new GraphQLList(UebermichType),
    resolve(parent:any, args:any){
        return Uebermich.find();
    }
}
 const uebermich = {
    type:UebermichType,
    args:{
        id:{type:new GraphQLNonNull(GraphQLID)}},
    async resolve(parent:any, args:any){
        try{
        return await Uebermich.findById(args.id);
        } catch(error){
            console.log(error)
        } 
    }
}
export {uebermichs, uebermich}