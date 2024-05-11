import {Router, Request, Response} from 'express';
import upload from '../utils/multer';
import cloudinary from '../utils/cloudinary';
import Blogpost, { BlogpostDocument } from '../models/Blogpost';
const fs = require('fs');
const uploadRouter = Router();

uploadRouter.post('/', upload.array('images'), async (req:Request, res:Response)=>{
    const files = req.files as Express.Multer.File[];
    
    try{
        const secureUrls:string[] = [];
        const cloudinaryIds:string[] = [];
        for(let file of files){
            let fileUrl = file?.path.replace(/\\/g, "/");
            const uploadResult = await cloudinary.uploader.upload(fileUrl,{
                folder:"graphql_practice",
                resource_type:"auto",
            })
            secureUrls.push(uploadResult.secure_url)
            cloudinaryIds.push(uploadResult.public_id)
            try{
                fs.unlinkSync(file.path);
            } catch(error){
                console.log(error)
            }
        }
    const imageData = {
        images:secureUrls,
        cloudinaryIds:cloudinaryIds,
    }
        res.status(200).json(imageData);
    }catch(error){
        console.log(error)
        res.status(403).json('upload auf cloudinary ncht möglich')
    }
})
uploadRouter.put('/:id', upload.array('images'), async (req:Request, res:Response)=>{
    const storedBlogpost = await Blogpost.findById(req.params.id);
    const files = req.files as Express.Multer.File[];
    console.log(files)
    const index = req.body.imageIndex;
    const key:any= [];
    if(index !== undefined){
        Object.keys(index).forEach((ind:any)=>{
            key.push(parseInt(ind))
        })
    }
 
    try{
        for(let i = 0; i < files.length; i++){
            const file = files[i];
            const fileIndex = key[i]
            await cloudinary.uploader.destroy(storedBlogpost!.cloudinaryIds[fileIndex])
            const fileUrl = file.path.replace(/\\/g, '/')
            const updateResult = await cloudinary.uploader.upload(fileUrl,{
                folder:'graphql_practice',
                resource_type:'auto',
            })
            storedBlogpost!.images[fileIndex] = updateResult.secure_url;
            storedBlogpost!.cloudinaryIds[fileIndex] = updateResult.public_id
            try{
                fs.unlinkSync(file.path);
            } catch(error){
                console.log(error)
            }  
        }
        const newImageData ={
            images: storedBlogpost!.images,
            cloudinaryIds: storedBlogpost!.cloudinaryIds,
        }
        res.status(200).json(newImageData)
    } catch(error){
        console.log(error, 'deshalb')
        res.status(404).json('Nicht gefunden')
    }
})
// uploadRouter.delete('/delete/:id', async (req:Request, res:Response)=>{
//     const storedBlogpost = await Blogpost.findById(req.params.id)
//     console.log(storedBlogpost);
//     try{
//         for(let i = 0; storedBlogpost?.cloudinaryIds.length; i++){
//             const file = storedBlogpost.cloudinaryIds[i];
//             console.log(file);
//             await cloudinary.uploader.destroy(file);
//         }
//         res.status(200).json('Alle nicht benötigten Daten wurden gelöscht')

//     } catch(error){
//         console.log(error)
//         res.status(404).json("Nicht gefunden")
//     }
// })
uploadRouter.post('/profilePicture', upload.single("profilePicture"), async (req,res)=>{
    const file = req.file as any;
    try{
        const fileUrl = file?.path.replace(/\\/g, '/');
       const result =  await cloudinary.uploader.upload(fileUrl, {
            folder:'graphql_practice',
            resource_type:'auto',
        })
        const profilePictureData = {
            secure_url: result.secure_url,
            public_id:result.public_id,
        }
        console.log(profilePictureData, "here data")
        res.status(200).json(profilePictureData)
    } catch(error){
        res.status(403).json('Upload nicht möglich')
    }
})
export default uploadRouter;