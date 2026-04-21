import "./github.scss"
import Macwindow from "./Macwindow"
import githubData from "../../assets/github.json"



const GitCard = ({data})=>{
    const {id,image,title,description,tags,repoLink,demoLink} = data;
    return(
      <div className="card">
        <img src={image} alt="" />
        <h1>{title}</h1>
        <p className="description">{description}</p>


        <div className="tags">
          {tags.map((tag,index)=><p className="tag" key={index}>{tag}</p>)}
        </div>
      
        <div className="urls">
          <a href={repoLink} target="_blank" rel="noopener noreferrer">Repo Link</a>
          {demoLink && <a href={demoLink} target="_blank" rel="noopener noreferrer">Demo Link</a> }
        </div>


      </div>
    )
}




const Github = () => {
  return (
    <Macwindow>
          <div className="cards">
            {githubData.map(item=><GitCard key={item.id} data={item}/>)}
          </div>
    </Macwindow>
  )
}

export default Github
