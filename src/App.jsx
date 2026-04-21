import './App.scss'
import Dock from './components/Dock'
import Nav from './components/Nav'
import 'remixicon/fonts/remixicon.css'
import Macwindow from './components/Windows/Macwindow'

const App = () => {
  return (
    <main>
      

      <Nav/>
      <Dock/>


      <Macwindow/>
      
    </main>
  )
}

export default App
