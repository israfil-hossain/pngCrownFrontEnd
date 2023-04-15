import { API } from "@/config/axiosConfig";

const addUser = (values)=>{
    return API.post('/users/adduser', values)
  }

  const UserService = {
    addUser,
  };
  
export default UserService;