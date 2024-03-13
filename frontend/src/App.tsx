import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layouts/layout"
import Register from "./Pages/Register"
import SignIn from "./Pages/SignIn"


function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout>
            <p>home page</p>
          </Layout>}/> 
          <Route path="/search" element={<Layout>
            <p>search page</p>
          </Layout>}/> 
          <Route path="/signup" element={<Layout><Register/></Layout>}/> 
          <Route path="/signin" element={<Layout><SignIn/></Layout>}/> 
        </Routes>
      </BrowserRouter>
      
  )
}

export default App
