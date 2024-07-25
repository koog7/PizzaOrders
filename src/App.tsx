import './App.css'
import {NavLink, Route, Routes, useParams} from "react-router-dom";
import AdminHome from "./containers/AdminHome.tsx";
import Home from "./containers/Home.tsx";
import AdminDishes from "./containers/AdminDishes.tsx";
import AdminOrders from "./containers/AdminOrders.tsx";
import CreateEditForm from "./components/CreateEditForm.tsx";
import NotFound from "./components/NotFound.tsx";

const App = () => {

    return(
        <>
            <div style={{
                backgroundColor: '#404040',
                width: '1000px',
                minHeight: '50px',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <h2 style={{marginLeft: '10px'}}><NavLink className="nav-link" to={location.pathname === '/admin' ?  '/admin': '/'}  style={{textDecoration: 'none', color: 'white'}}>Turtle Pizza {location.pathname === '/admin' && 'Admin'}</NavLink></h2>
                <div>
                    {location.pathname === '/admin' && (
                        <>
                            <NavLink to={'/admin/dishes'} style={{ marginRight: '20px' }}>Dishes</NavLink>
                            <NavLink to={'/admin/orders'}>Orders</NavLink>
                        </>
                    )}
                </div>
            </div>
            <hr/>

            <Routes>
                <Route path="/" element={(
                    <Home/>
                )}/>
                <Route path="*" element={(
                    <NotFound/>
                )}/>
                <Route path="/admin" element={(
                    <AdminHome/>
                )}/>
                <Route path="/admin/create" element={(
                    <CreateEditForm/>
                )}/>
                <Route path="/admin/dishes" element={(
                    <AdminDishes/>
                )}/>
                <Route path="/admin/orders" element={(
                    <AdminOrders/>
                )}/>
            </Routes>
        </>
    )

};

export default App
