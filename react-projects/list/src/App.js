import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';
import { useEffect,useState } from 'react';

// Тут список пользователей: https://reqres.in/api/users

function App() {

  const [users,setUsers]= useState([]);
  const [isLoading,setLoading] = useState(true);
  const [searchValue,setSearchValue]= useState('');
  const [success,setSuccess]= useState(false);
  const [invites,setInvites]= useState([]);

  useEffect(()=> {
    fetch('https://reqres.in/api/users')
    .then(res=> res.json())
    .then(json=>{
      setUsers(json.data)
    }).catch(err =>  
     { console.warn(err);
      alert('Ошибка при получении юзеров');
     }
    )
    .finally( ()=>setLoading(false))
  },[]);

  const onChangeSearchValue = (event)=> {
    setSearchValue(event.target.value)
  }
  const onClickInvite = (id) => {
    if(invites.includes(id))
    {
      setInvites(prev=> prev.filter((_id)=>_id!= id ))
    } else {
      setInvites(prev => [...prev,id])
    }
  }
  const onClickSendInvites =()=>{
     setSuccess(true);
  }
  return (
    <div className="App">
      {
        success? <Success count={invites.length}/> :
        <Users
      onChangeSearchValue= {onChangeSearchValue} 
      searchValue={searchValue} 
      items={users} 
      isLoading={isLoading}
      invites = {invites}
      onClickInvite= {onClickInvite}
      onClickSendInvites={onClickSendInvites}
      />
      }
    </div>
  );
}

export default App;
