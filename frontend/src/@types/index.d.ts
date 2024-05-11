import React from 'react';


 export interface User {
    id?:string,
    _id?:string,
    username:string,
    vorname:string,
    nachname:string,
    profilePicture:string,
    email:string,
    isAdmin:boolean,
  }
