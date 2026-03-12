import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "../components/Navbar"
import PrivateRoute from "../components/PrivateRoute"
import AdminRoute from "../components/AdminRoute"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Movies from "../pages/Movies"
import MovieDetail from "../pages/MovieDetail" 
import MyRentals from "../pages/MyRentals"
import Profile from "../pages/Profile"
import PanelAdmin from "../pages/PanelAdmin"
import Unauthorized from "../pages/Unauthorized"
import Page404 from "../pages/Page404"

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="container-custom py-8">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/movies" element={<Movies />} />
                        <Route path="/movie/:id" element={<MovieDetail />} /> 
                        <Route path="/my-rentals" element={<MyRentals />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route element={<AdminRoute />}>
                        <Route path="/panel-admin" element={<PanelAdmin />} />
                    </Route>                   
                    <Route path="/unauthorized" element={<Unauthorized />} />
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </main>
        </BrowserRouter>
    )
}