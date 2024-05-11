import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from 'path'
const maxSize = 100 * 1024 *1024;
type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

 const storage = multer.diskStorage({
        destination:(req:Request,file:Express.Multer.File, callback:DestinationCallback)=>{
            callback(null, path.resolve(process.cwd(), '../frontend/public/uploads'));
        },
    
        filename: (req:Request, file:Express.Multer.File, callback:FileNameCallback)=>{
            callback(null, Date.now()+ "--" + path.extname(file.originalname))
        },    
    })

const upload = multer({
    storage:storage,
    fileFilter:(req:Request,file:Express.Multer.File,callback:FileFilterCallback)=>{
        if(
            file.mimetype == "image/png"||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "video/mp4"
        ){
            callback(null, true);
        } else{
            callback(null,false)
            return callback(new Error("Only .png, .jpg, .jpeg, .mp3, .mp4 allowed"))
        }
    },
    limits:{fileSize: maxSize}
});

export default upload;
    
    