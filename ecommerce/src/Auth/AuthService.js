import axios from "axios";
import authHeader from './AuthHeader';

const API_URL = "http://localhost:8100/api/profile/login"

class AuthService {
    login(username,password){
        return axios
        .post(API_URL,{
            "userEmail":username,
            "userPassword":password
        })
        .then(response=>{
            // console.log("Here");
            localStorage.setItem("user",JSON.stringify(response.data.token));
            localStorage.setItem("profileId",JSON.stringify(response.data.profile.profileId))
            // console.log(JSON.stringify(response.data.profile.profileId))
            return "Success";
        })
    }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("profileId");
  }
}

export default new AuthService();
