import './App.scss'
import Dock from './components/Dock'
import Nav from './components/Nav'
import 'remixicon/fonts/remixicon.css'
import Github from './components/Windows/Github'
import Note from './components/Windows/Note'

const App = () => {
  return (
    <main>
      

      <Nav/>
      <Dock/>
      
      {/* <Github/> */}
      <Note/>
      
    </main>
  )
}

export default App
