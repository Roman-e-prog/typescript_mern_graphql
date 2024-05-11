import UserType from "../graphQlTypes/User";
import User from "../models/User";
import {GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLID} from 'graphql';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
const registerUser = {
    type:UserType,
    args:{
        vorname:{type:new GraphQLNonNull(GraphQLString)},
        nachname:{type:new GraphQLNonNull(GraphQLString)},
        username:{type:new GraphQLNonNull(GraphQLString)},
        email:{type:new GraphQLNonNull(GraphQLString)},
        password:{type:new GraphQLNonNull(GraphQLString)},
        isAdmin:{type:GraphQLBoolean},
    },
    resolve(parent:any,args:any){
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(args.password, salt);
            const newUser = new User({
                vorname:args.vorname,
                nachname:args.nachname,
                username:args.username,
                email:args.email,
                password:hash,
            })
            return newUser.save();
        } catch (error) {
            console.error('Error registering user:', error);
        }
    }
}
const uniqueUsername = {
    type:UserType,
    args:{
        username:{type:GraphQLString},
    },
    resolve(parent:any, args:any){
        return User.findOne({username:args.username})
    }
}
const uniqueEmail = {
    type:UserType,
    args:{
        email:{type:GraphQLString},
    },
    resolve(parent:any, args:any){
        return User.findOne({email:args.email})
    }
}
const loginUser = {
    type:UserType,
    args:{
        username:{type:new GraphQLNonNull(GraphQLString)},
        email:{type:new GraphQLNonNull(GraphQLString)},
        password:{type:new GraphQLNonNull(GraphQLString)},
    },
   async resolve(parent:any,args:any){
        const sec = process.env.JWT_SEC as string;
        const user = await User.findOne({username:args.username});
        console.log(user, 'here in the backend')
        if(user){
            const isPasswordCorrect = await bcrypt.compare(
                args.password,
                user.password
            )
            if(args.email !== user.email){
                throw new Error('Falche Email Adresse')
            }
            if(isPasswordCorrect){
                const accessToken = jwt.sign(
                    {id: user._id,
                     isAdmin:user.isAdmin,
                    },
                    sec,
                    {expiresIn:"30d"}
                )
                const {password, ...others} = user._doc
                console.log(user._doc, 'here user_doc')
                return {...others, accessToken}
            } 
            else{
                throw new Error('Falsche Eingabedaten')
            }
        }
    }
}
const updateUser = {
    type:UserType,
    args:{
        id:{type:new GraphQLNonNull(GraphQLID)},
        vorname:{type:GraphQLString},
        nachname:{type:GraphQLString},
        profilePicture:{type:GraphQLString},
        cloudinaryId:{type:GraphQLString},
    },
       async resolve(parent:any, args:any){
        const updateData = {
            vorname:args.vorname,
            nachname:args.nachname,
            profilePicture:args.profilePicture,
            cloudinaryId:args.cloudinaryId,
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(args.id, updateData,{new:true})
            return updatedUser;
        } catch(error){
            console.log(error)
            return "Ein update ist nicht möglich"
        }
    }
}
export {registerUser, uniqueUsername, uniqueEmail, loginUser, updateUser};
;