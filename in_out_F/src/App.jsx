import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(false)
    const [btn, setbtn] = useState(false)
    const[loading,setloading]=useState(false)
    const[changeui,setchangeui]=useState(false)
    const [logs, setLogs] = useState(null)
  const[IP,setIP]=useState(null)
  const handledata=async()=>{
    if(IP){
console.log(IP)
setloading(true)
try{
  const response=await fetch(`http://localhost:5000/logout?IP=${IP}`)
  const res=await response.json()
  if(response.status!=200){
    setCount(true)
    setchangeui(false)
    setTimeout(() => {
      setCount(false)
    }, 5000);
  }else if(response.status==200){
    setchangeui(true)
   
     setLogs(res)
  }
  
}catch(e){
  console.log(e)
}finally{
  setloading(false)
}
}
  }
  useEffect(()=>{
    if(IP==null){
      setbtn(false)
    }else{
setbtn(true)

    }
  },[IP])

  return (
   <>
   <div id={changeui?"head1":"head"}><input placeholder='IP Address' onChange={(e)=>setIP(e.target.value)}></input>
   {btn?<button id='search' onClick={handledata}>
    {loading?<div className="loading">
  <svg width="64px" height="48px">
      <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
    <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
  </svg>
</div>:"Search"}
    </button>:""}
   
   </div>
   {count?<p>IP Not Found😥</p>:""}
    {logs && (
        <div className="log-section">
          <h2>Log Date: {logs.date}</h2>
          <ul>
            {logs.logs.map((log, index) => (
              <li key={index}>
                <strong>{log.status.toUpperCase()}</strong> at {log.time}
              </li>
            ))}
          </ul>
        </div>
      )}
   </>
  )
}

export default App
