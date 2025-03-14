import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
const SignUp = () => {
    const navigate = useNavigate();
    const backend_url = import.meta.env.VITE_BACKEND_URL
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
        Image:"null",
    });
    
    // input change handle karna 
    
    const handleInputChange = (e)=>{
      const {name, value, type } = e.target;
      setFormData({...formData, [name]: value });
      if( type === "file"){
        setFormData({...formData, Image: e.target.files[0]});
      } else{
        setFormData({...formData, [name]: value});
      }
    };
    
    // // File change handle karna (Image upload)
    
    // const handleFileChange =(e) =>{
    //   setFormData({...formData, image:e.target.file[0]});
    // };
    
    
    // Form submit karna 
    const handleSubmit = async(e)=>{
      e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);
if (formData.Image){
  formDataToSend.append("Image", formData.Image);
}        
 try {
const response = await axios.post(`${backend_url}/signup`, formDataToSend, {
  headers: {"Content-Type": "multipart/form-data"},
});
if(response.status === 201){
  navigate("/Login");
  Swal.fire({
    title:"Success!",
    text:"User saved successfully",
    icon:"success",
    confirmButtonText:"OK",
  });
}   
      } catch (err) {
        console.log("Error saving user:", err)
        Swal.fire({
          title:"Error",
          text:"Failed to save user",
          icon:"error",
          confirmButtonText:"Try Again",
        });
      }
    };
    
    
  return (
<div className="bg-gray-100 flex items-center justify-center min-h-screen">
  <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Signup Form</h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleInputChange} 
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none" 
          placeholder="Enter your name" 
          required 
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleInputChange} 
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none" 
          placeholder="Enter your email" 
          required 
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleInputChange} 
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none" 
          placeholder="Enter your password" 
          required 
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
        <input 
          type="file" 
          name="Image"
          // value={formData.Image} 
          onChange={handleInputChange} 
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
          accept="image/*" 
        />
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sign Up
        </button>
      </div>
      <p className="mt-4 text-center text-gray-700">
          You have an account?{" "}
            <Link to="/Login" className="text-blue-500 underline">
              Login
            </Link>
          </p>
    </form>
  </div>
</div>




  )
}

export default SignUp