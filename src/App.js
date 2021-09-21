
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
import RepoDetails from './RepoDetails';



function App() {
  const [username,setUsername]=useState("");
  const[loading,setLoading]=useState(false);
  const[repos, setRepos]=useState([])
  const[details,setDetails]=useState({})
  const[detailsLoading, setDetailsLoading]=useState(false)

  let [displayMessage,setDisplayMessage]=useState(false)

  function handleSubmit(e){
    e.preventDefault();
    setDisplayMessage(false);
    searchRepos();
  }
  useEffect(()=>{
    setRepos([])
    setDetails({})
  },[username]
  )
 function searchRepos()
  {
    setLoading(true);
    
     axios({
      method:"get",
      url:`https://api.github.com/users/${username}/repos`,

    }).then(res=>{
      
     
      setLoading(false);
      setRepos(res.data);
      
      
      
    }).catch(err=>{
      setDisplayMessage(true)
    })}

   
  

  function renderRepo(repo){
    return(
      <div className="row"onClick={()=>getDetails(repo.name)} key={repo.id}>
        <h2 className="repo-name">
          {repo.name}
        </h2>
      </div>

    )
  }
  function getDetails(reponame)
  {
    setDetailsLoading(true)
    axios({
      method:"get",
      url:`https://api.github.com/repos/${username}/${reponame}`
    }).then(res=>{
      
      
      setDetailsLoading(false);
      setDetails(res.data);
    })
    // return (window.open(`https://github.com/${username}/${reponame}`))

  }
  return (
    <div className="page">
      <div className="landing-page-container">
        <div className="left-side">
          <form className="form">
            <input className="input"
            value={username}
            placeholder="Enter Value"
            onChange={e=>setUsername(e.target.value)}/>
            <button className="button" onClick={handleSubmit}>{loading&&!displayMessage?"Searching":"Search"}</button>
          </form>
          <div className="result-container">
            
            {displayMessage?<h1 className="loader">Invalid Username</h1>:repos.map(renderRepo)}
          </div>
        </div>
        <RepoDetails details={details} loading={detailsLoading}/>
      </div>
    </div>
  );
}

export default App;
