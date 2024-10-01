// import {v2 as cloudinary} from "cloudinary"
// import fs from "fs";

// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
// });

// const uploadOnCloudinary = async(fileLocalPath)=>{
//     try {
//         //check if file is on local server or not
//         if(!fileLocalPath) return null;
//         //file upload
//         const response = await cloudinary.uploader.upload(fileLocalPath , {
//             resource_type:"auto",
//         });
//         console.log("cloudinary file:",response)

//         //delete file from local storage
//         fs.unlinkSync(fileLocalPath);

//         return response;
//     } catch (error) {
//         fs.unlinkSync(fileLocalPath)
//         return null
//     }
// }

// export {uploadOnCloudinary}

import {v2 as cloudinary} from "cloudinary"
import fs from "fs"



// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
// });

cloudinary.config({ 
    cloud_name: "anilpancloud123", 
    api_key:"114122869467291", 
    api_secret:"syTrTyL3oEmiS-DwemqwUcoGWrU"  // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary= async (localFilePath) =>{
    try {
        if(!localFilePath) return null;
        //uploading file
        const response= await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        } )
        //file has been uploaded successfully

        // console.log("File has been uploaded successfully in clodinary",response.url);
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved file as upload process got failed
        console.error("Cloudinary upload error",error )
        return null;
    }
}


export {uploadOnCloudinary}