import React,{useEffect,useState,useContext} from 'react';
import './App.css';
import Card from './Component/Card';
import Header from './Component/Header';
import { FriendContext } from './context/friendsContext';

const App=()=> {
  const {friends,fetchFriends,AddFriend} = useContext(FriendContext);
  const [add,setAdd]=useState(false);
  const [input,setInput]  =useState({
    name:'',
    email:'',
    phone:'',
    id:''
  })
  useEffect(()=>{
    fetchFriends()
  },[]);

  const handleChange=(e)=>{
    const {value,name} = e.target;
    setInput({...input,[name]:value})
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const data ={
      ...input,
      id:(friends.friends.length || 10)+1
    }
    const rsp = await AddFriend(data)
      if(rsp){
        setAdd(false)
      }else{
        console.log('not added')
      }
  }
  return (
    <div className="">
      <Header/>
      <div  className = 'flex  flex-col justify-center items-center mt-5 ' >
        {
          add?(
            <div className = 'bg-gray-200 w-5/12 text-center p-10 m-4 rounded-lg drop-shadow-xl '>
              <form onSubmit={(e)=>handleSubmit(e)} className='space-y-2'>
                <input placeholder='Enter name' value={input.name} name='name' onChange={(e)=>handleChange(e)}/>
                <input placeholder='Enter email' value={input.email} name='email' onChange={(e)=>handleChange(e)}/>
                <input placeholder='Enter phone' value={input.phone} name='phone' onChange={(e)=>handleChange(e)}/>
                <button className='bg-green-600 px-10 py-1 mt-6 rounded-xl ' type='submit'>Add</button>
              </form>
            </div>
          ):(
            <div className = 'bg-gray-200 w-5/12 text-center p-10 m-4 rounded-lg drop-shadow-xl' >
              <button className='bg-green-600 px-6 py-1 m-2 rounded-xl' onClick={()=>setAdd(true)}>Add New friend</button>
            </div>
            
          )
        }
      </div>
      <div className='flex  flex-col justify-center items-center'>
        {friends.friends && friends.friends.map(friend=>(
        <Card key={friend.id} state={friend} />
         ))}
      </div>
      
    </div>
  );
}

export default App;
