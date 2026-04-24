import Macwindow from "./Macwindow"
import "./spotify.scss"

const Spotify = () => {
  return (
    <Macwindow width='35vw'>

      <div className="spotify-window">
   <iframe data-testid="embed-iframe" style={{"borderRadius":"12px"}} src="https://open.spotify.com/embed/album/0Rkv5iqjF2uenfL0OVB8hg?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div>
      
    </Macwindow>
  )
}

export default Spotify
