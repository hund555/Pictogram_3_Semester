import './App.css'
import ViewCreatePictogram from './CA/UI/CreatePictogram';
import logo from "./assets/pictoplanner_logo.svg"
let currentView = <ViewCreatePictogram></ViewCreatePictogram>
window.addEventListener("resize", function () { 
    const test = document.getElementById("test");
    if (test) {
        test.style.width = window.innerWidth + "px";
    }
})//check for window resize
function App() {
    



  return (
      <>
         
          <div style={{marginBottom: 15} }><Navbar></Navbar></div>
          {currentView}
          
    </>
  )
}

export default App
function Navbar() {
    
    return (

        <nav className="navbar" id="test">
            
                <img src={logo} className="logo"></img>
            <button onClick={function () { currentView = null; } }>home</button>
                <button onClick={function () { currentView = <ViewCreatePictogram></ViewCreatePictogram> }}  >Oprett Piktogramm</button>
            <button>test</button>

        </nav>

    )
}
