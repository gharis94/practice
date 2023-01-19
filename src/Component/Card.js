import React,{useEffect,useContext,useState} from 'react'
import { FriendContext } from '../context/friendsContext';

const Card = ({state}) => {
    const {name,email,phone,id} =state;
    const {delFriend,updateFriendInfo} =useContext(FriendContext);
    const [input,setInput] = useState({
        name,
        email,
        phone,
        id,
        ...state
    })
    const [edit,setEdit] =useState(false);    
    
    const handleChange=(e)=>{
        const {name,value} = e.target;
        setInput({...input,[name]:value})
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(input)
        const x=await updateFriendInfo(input)
        if(x){
            setEdit(false)
        }else{
            console.log('not updated')
        }
        
        
        
    }
  return (
    <div className='bg-gray-100 p-10 w-4/12 my-4 rounded-lg drop-shadow-xl'>
        {edit?(
            <form className='flex flex-col space-y-2' onSubmit={(e)=>handleSubmit(e)}>
                <input type='text' value={input.name} onChange={(e)=>handleChange(e)} name='name'/>
                <input type='text' value={input.email} onChange={(e)=>handleChange(e)} name='email'/>
                <input type='text' value={input.phone} onChange={(e)=>handleChange(e)} name='phone'/>
                <button  className='bg-green-700 rounded-xl'>Update</button>
                <button className='bg-red-700 rounded-xl' type='button' onClick={()=>setEdit(false)}>Cancel</button>
            </form>
        ):(
        <>
            <p>{name}</p>
            <p>{email}</p>
            <p>{phone}</p>
            <div className='flex justify-between mt-2'>
                <button className='px-6 py-1 bg-green-700 rounded-xl' onClick={()=>setEdit(true)}>Edit</button>
                <button className='px-4 py-1 bg-red-700 rounded-xl' onClick={()=>delFriend(id)}>Delete</button>
            </div>
        </>
        )}
    </div>
  )
}

export default Card