import React from 'react'
import useAuth from '../../hook/useAuth'
import { useNavigate } from 'react-router-dom'
import useToast from '../../hook/useToast'
import { Link } from 'react-router-dom';
const Profile = () => {
    const toast=useToast()
    const {logout}=useAuth()
    const navigate=useNavigate()
    const handdleLogOut = () => {
        logout(); 
        navigate("/");
        toast.success("Logout successful!");
      };
      
  return (
    <div>
<Link to={"/wishlist"}>
<button>Wishlist</button>
</Link>
<button onClick={()=>handdleLogOut()}>Logout</button>

    </div>
  )
}

export default Profile