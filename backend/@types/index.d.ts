import * as express from "express";
export interface User {
    id:string;
    vorname:string;
    nachname:string;
    username:string;
    email:string;
    street:string;
    number:string;
    plz:string;
    city:string;
    password:string;
    isAdmin:boolean;
    createdAt: Date;
    updatedAt: Date;
    accessToken:String;
  }
declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}
// declare module '*.graphql' {
//     import { DocumentNode } from 'graphql';
//     const Schema: DocumentNode;
//     export default Schema;
//   }