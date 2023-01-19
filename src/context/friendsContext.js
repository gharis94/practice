import { createContext,useState,useReducer } from "react";

const initialState={
    friends:[]
};

const reducer=(state,action)=>{
    const {type,payload} = action;

    switch(type){
        case 'GET':
            return{
                ...state,
                friends:payload
            }
        
        case 'DELETE':
            return{
                ...state,
                friends: state.friends.filter(({id})=> id !== payload)
            }
        case 'UPDATE':
            return{
                ...state,
                friends:state.friends
                .map(item=>item.id===payload.id?payload:item)
            }
        case 'ADD':
            return{
                ...state,
                friends:[...state.friends,payload]
            }
        default:
            return state;
    }
}

export const FriendContext = createContext(initialState);
    //3130417903551 03013830785

export const FriendsProvider =({children})=>{
    //const [friends, setFriends] = useState(initialState);
    const [friends, dispatch] = useReducer(reducer, initialState);

    const fetchFriends=async()=>{
        try{
            const rsp = await fetch('https://jsonplaceholder.typicode.com/users',{method:'GET'});
            const data = await rsp.json();
            dispatch({type:'GET',payload:data})
        }catch(error){
            console.log(error)
        }
    }
    const delFriend =async(id)=>{
        console.log(id)
        try{
            const rsp = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{method:'DELETE'})
            console.log(rsp)
            if(rsp.status ===200){
                dispatch({type:'DELETE',payload:id})
            }
            
        }catch(error){
            console.log(error)
        }
    }
    const updateFriendInfo = async(data)=>{
        console.log(data)
        try{
            const rsp = await fetch(`https://jsonplaceholder.typicode.com/users/${data.id}`,{method:'PUT',
            body:JSON.stringify({
                name:data.name,
                email:data.email,
                phone:data.phone,
                ...data
            }),
            headers:{
                'Content-type':'application/json; charset=UTF-8'
            }

        })
        const x = await rsp.json()
        console.log(rsp,x)
            if( rsp.status===200){
                dispatch({type:'UPDATE',payload:x})
                return true
            }
            else{
                return false;
            }
        }catch(error){
            console.log(error)
            return false
        }
    }
    const AddFriend =async(data)=>{
        try{
            const rsp =await fetch(`https://jsonplaceholder.typicode.com/users`,{
                method:"POST",
                body:JSON.stringify({
                ...data
                }),
                headers:{
                    'Content-type':'application/json; charset=UTF-8'
                }
            })
            const d = await rsp.json()
            console.log(d, rsp)
            if (rsp.status === 201){
                dispatch({type:"ADD",payload:d})
                return true
            }else{
                return false
            }
        }catch(error){
            console.log(error)
        }
    }
    return(
        <FriendContext.Provider value = {
            {
                friends,
                fetchFriends,
                delFriend,
                updateFriendInfo,
                AddFriend
            }
        } >
        {children}
        </FriendContext.Provider>
    )
    
}