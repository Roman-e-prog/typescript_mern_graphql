import Bibliothek from "../models/Bibliothek";
import BibliothekType from "../graphQlTypes/Bibliothek";
import {GraphQLID, GraphQLString, GraphQLNonNull} from 'graphql';

const addBibliothek = {
    type:BibliothekType,
    args:{
        videoTheme:{type:GraphQLString},
        videoContent:{type:GraphQLString},
        url:{type:GraphQLString},
        ressort:{type:GraphQLString},
    },
    async resolve(parent:any, args:any){
        const newBibliothek = new Bibliothek({
            videoTheme:args.videoTheme,
            videoContent:args.videoContent,
            url:args.url,
            ressort:args.ressort,
        })
        try{
            return await newBibliothek.save();
        } catch(error){
            throw new Error('Keine Eingabe möglich')
        }
    }
}
const updateBibliothek = {
    type:BibliothekType,
    args:{
        id:{type:new GraphQLNonNull(GraphQLID)},
        videoTheme:{type:GraphQLString},
        videoContent:{type:GraphQLString},
        url:{type:GraphQLString},
        ressort:{type:GraphQLString},
    },
    async resolve(parent:any, args:any){
        const updateData = {
            videoTheme:args.videoTheme,
            videoContent:args.videoContent,
            url:args.url,
            ressort:args.ressort,
        }
        try{
            return await Bibliothek.findByIdAndUpdate(args.id, updateData,{new:true});
        } catch(error){
            throw new Error('Nicht gefunden')
        }
    }
}
const deleteBibliothek = {
    type:BibliothekType,
    args:{id:{type:new GraphQLNonNull(GraphQLID)}},
    async resolve(parent:any, args:any){
        try{
            return await Bibliothek.findByIdAndDelete(args.id)
        } catch(error){
            throw new Error('Nicht gefunden')
        }
    }
}
export {addBibliothek, updateBibliothek, deleteBibliothek}