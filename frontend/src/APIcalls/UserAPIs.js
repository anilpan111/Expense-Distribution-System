// import axios from "axios";
// const baseURL = import.meta.env.VITE_BASE_URL;


// export class UserAPIs{
//     async signUp(userData){
//         try {
//             // extract credentials from user
//             const credentials = {
//                 mobileNo : userData.mobileNo,
//                 password : userData.password
//             }

//             //handling form data
//             const formData = new FormData();
//             formData.append('fullName',userData.fullName)
//             formData.append('email',userData.email)
//             formData.append('password',userData.password)
//             formData.append('reEnteredPassword',userData.reEnteredPassword)
//             if(userData.avatar[0]){
//                 formData.append('avatar',userData.avatar[0])
//             }
//             if(userData.coverImage[0]){
//                 formData.append('coverImage',userData.coverImage[0])
//             }

//             //api call using axios
//             const response = await axios.post(`${baseURL}/user/register`,
//                 formData,
//                 {
//                     withCredentials: true
//                 }
//             );

//             //login after register
//             if(response){
//                 return await this.login(credentials)
//             }
//         } catch (error) {
//             // console.log("Error while register api call",error)
//             throw error;
//         }
//     }

//     async login(userData){
//         try {
//             const response = await axios.post(`${baseURL}/user/login`,
//                 {
//                     mobileNo: userData.mobileNo,
//                     password: userData.password
//                 },
//                 {
//                     withCredentials: true
//                 }
//             )

//             return response;
//         } catch (error) {
//             throw error;
//         }
//     }

//     async getCurrentUser(){
//         try {
//             const response = await axios.get(`${baseURL}/user/getCurrentUser`,
//                 {
//                     withCredentials: true
//                 }
//             )

//             return response;
//         } catch (error) {
//             throw error
//         }
//     }
// }

// const userAPI = new UserAPIs();
// export default userAPI;


import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

export class UserAPIs {
    async signUp(userData) {
        try {
            // Handling form data
            const formData = new FormData();
            formData.append('mobileNo',userData.mobileNo)
            formData.append('fullName', userData.fullName);
            formData.append('email', userData.email);
            formData.append('password', userData.password);
            formData.append('reEnteredPassword', userData.reEnteredPassword);
            
            if (userData.avatar[0]) {
                formData.append('avatar', userData.avatar[0]);
            }
            if (userData.coverImage[0]) {
                formData.append('coverImage', userData.coverImage[0]);
            }

            // API call using axios
            const response = await axios.post(`${baseURL}/user/register`,
                formData,
                {
                    withCredentials: true
                }
            );
            // console.log("Logged in user:",response)

            // If registration is successful, log in
            if (response && response.data.success === true) {
                const credentials = {
                    mobileNo: userData.mobileNo,
                    password: userData.password
                };
                return await this.login(credentials);
            }
        } catch (error) {
            console.error("Error while register API call:", error);
            throw error;
        }
    }

    async login(userData) {
        try {
            console.log("user data for login api call:",userData)
            const response = await axios.post(`${baseURL}/user/login`,
                {
                    mobileNo: userData.mobileNo,
                    password: userData.password
                },
                {
                    withCredentials: true
                }
            );
            return response.data; // return the API response data
        } catch (error) {
            console.error("Error while login API call:", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const response = await axios.get(`${baseURL}/user/getCurrentUser`,
                {
                    withCredentials: true
                }
            );
            return response.data; // return the API response data
        } catch (error) {
            console.error("Error while getting current user:", error);
            throw error;
        }
    }
}

const userAPI = new UserAPIs();
export default userAPI;
