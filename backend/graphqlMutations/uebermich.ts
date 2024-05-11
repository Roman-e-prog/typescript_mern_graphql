import UebermichType from "../graphQlTypes/Uebermich";
import Uebermich from "../models/Uebermich";
import { GraphQLNonNull, GraphQLString, GraphQLID } from "graphql";
const addUebermich = {
    type:UebermichType,
    args:{
        myPerson:{type:new GraphQLNonNull(GraphQLString)}
    },
    resolve(parent:any,args:any){
        const newUebermich = new Uebermich({
            myPerson:args.myPerson
        })
        return newUebermich.save();
    }
}
const deleteUebermich = {
    type:UebermichType,
    args:{
        id:{type:new GraphQLNonNull(GraphQLID)}
    },
    resolve(parent:any,args:any){
       return Uebermich.findByIdAndDelete(args.id) ;
    }
}
 const updateUebermich = {
    type:UebermichType,
    args:{
        id:{type:new GraphQLNonNull(GraphQLID)},
        myPerson:{type:new GraphQLNonNull(GraphQLString)}
    },
    resolve(parent:any,args:any){
       return Uebermich.findByIdAndUpdate(args.id,
        {$set:{myPerson:args.myPerson}}
        ,{new:true}) ;
    }
}
export {addUebermich, deleteUebermich, updateUebermich};