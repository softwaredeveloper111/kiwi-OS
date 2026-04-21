import './App.scss'
import Dock from './components/Dock'
import Nav from './components/Nav'
import 'remixicon/fonts/remixicon.css'
import Github from './components/Windows/Github'

const App = () => {
  return (
    <main>
      

      <Nav/>
      <Dock/>
      
      <Github/>
      
    </main>
  )
}

export default App
