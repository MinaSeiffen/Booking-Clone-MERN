import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/layout"
import Register from "./Pages/Register"
import SignIn from "./Pages/SignIn"
import AddHotel from "./Pages/AddHotel"
import { useAppContext } from "./Context/AppContext"
import MyHotels from "./Pages/MyHotels"
import EditHotel from "./Pages/EditHotel"
import Search from "./Pages/Search"
import Details from "./Pages/Details"


function App() {

  const {isLoggedIn} = useAppContext()

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout>
            <p>home page</p>
          </Layout>}/> 
          <Route path="/search" element={<Layout>
            <Search/>
          </Layout>}/> 
          <Route path="/detail/:hotelId" element={<Layout>
            <Details/>
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
              <Route path="/my-hotels" element={
                <Layout>
                  <MyHotels/>
                </Layout>
              }/>
              <Route path="/edit-hotel/:hotelId" element={
                <Layout>
                  <EditHotel/>
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
