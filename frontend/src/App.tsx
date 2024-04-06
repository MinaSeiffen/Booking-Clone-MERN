import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/layout"
import Register from "./Pages/Register"
import SignIn from "./Pages/SignIn"
import AddHotel from "./Pages/AddHotel"
import { useAppContext } from "./Context/AppContext"


function App() {

  const {isLoggedIn} = useAppContext()

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
          {isLoggedIn && (
            <>
              <Route path="/add-hotel" element={
                <Layout>
                  <AddHotel/>
                </Layout>
              }/>
            </>
          )}
          <Route path="*" element={<Navigate to={"/"}/>} />
        </Routes>
      </BrowserRouter>
      
  )
}

export default App
