import { Route, Routes } from "react-router-dom"
import Testing from "../src/pages/Testing"
import Chat from "./pages/Chat"
import Dashboard from "./pages/Dashboard"


function App(){

  
  return(
    <div>

      <Routes>
        
        <Route path="/" element={<Dashboard/>}  />
        <Route path="/chatapp" element={<Chat />}  />

      </Routes>

    </div>
  )

}

export default App