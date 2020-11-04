import React,{useState} from 'react';
import axios from 'axios';

function App() {
  const [newsState,setNewsState] = useState([]);
  const submitHandler = e =>{
    e.preventDefault();
    const searchStringArray  = (e.target.search.value).split(" ");
    e.target.search.value = "";
    let searchString = "";
    if(searchStringArray.length === 0){
      alert('Please write something in the search box')
    }else if(searchStringArray.length === 1){
      searchString += searchStringArray[0];
    }else{
      for(let i = 0;i<searchStringArray.length;i++){
        if(i === searchStringArray.length - 1){
          searchString = searchString + searchStringArray[i];
          break;
        }
        searchString = searchString + searchStringArray[i] + "%20";
      }
    }
    console.log(searchString);
    const endPoint = "https://newsapi.org/v2/everything?q=" + 
    searchString + "&from=2020-11-01&sortBy=popularity&apiKey=3373e35ea37143c6b478c8fb5e90ce43";

    axios.get(endPoint)
        .then(response => {
          // console.log(response.data);
          if(response.data.articles.length === 0){
            setNewsState(response.data.articles);
            alert('No Result found. Search again differently');
          }else{
            setNewsState(response.data.articles)
          }
        })
        .catch(err => console.log(err));
  }

  const newsList = newsState.map(eachNews =>{
    return(
    <div className="eachNews" key={Math.random()}>
      <img src={eachNews.urlToImage} alt={"no image found"}/>
      <h3>{eachNews.title}</h3>
      <h4>{eachNews.description}</h4>
      <a href={eachNews.url} rel="noreferrer" target="_blank" >Click here to read more about this...</a>
    </div>
    )
  })
  return (
    <div className="App">
      <h2 className="AppHeader">Nimki News and Article Finder</h2>
      <h4 className="AppHeader">Search for the latest news and articles</h4>
      <form onSubmit={e => submitHandler(e)}>
        <input type="text" id="search" name="search" placeholder="Search...."/>
        <button type="submit">Search</button>
      </form>
      <div className="newsContents">
        {newsList}
      </div>
    </div>
  );
}

export default App;
