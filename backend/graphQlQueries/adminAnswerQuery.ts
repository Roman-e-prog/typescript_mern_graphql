import {GraphQLID, GraphQLNonNull, GraphQLList} from 'graphql'
import AdminAnswer from '../models/AdminAnswer'
import AdminAnswerType from '../graphQlTypes/AdminAnswer'
const adminAnswers = {
    type:new GraphQLList(AdminAnswerType),
    resolve(parent:any,args:any){
            return AdminAnswer.find();
    }
}
const adminAnswer = {
    type:AdminAnswerType,
    args:{
        id:{type:new GraphQLNonNull(GraphQLID)}
    },
    async resolve(parent:any,args:any){
        try{
            return await AdminAnswer.findById(args.id);
        } catch(error){
            console.log(error)
            throw new Error('Nicht gefunden')
        }
    }
}
export {adminAnswers, adminAnswer}