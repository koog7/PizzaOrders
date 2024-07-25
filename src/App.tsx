import './App.css'
import {NavLink, Route, Routes} from "react-router-dom";
import AdminHome from "./containers/AdminHome.tsx";
import Home from "./containers/Home.tsx";
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
                {location.pathname === '/admin' && (<h2 style={{marginLeft: '10px'}}><NavLink className="nav-link" to={'/admin'} style={{textDecoration: 'none', color: 'white'}}>Turtle Pizza Admin</NavLink></h2>)}
                {location.pathname === '/' && (<h2 style={{marginLeft: '10px'}}><NavLink className="nav-link" to={'/'} style={{textDecoration: 'none', color: 'white'}}>Turtle Pizza</NavLink></h2>)}
                <div>
                    {location.pathname === '/admin' && (
                        <>
                            <NavLink to={'/admin'} style={{marginRight: '20px', color:'white', textDecoration:'none'}}>Dishes</NavLink>
                            <NavLink to={'/admin/orders'} style={{marginRight: '20px', color:'white', textDecoration:'none'}}>Orders</NavLink>
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
                <Route path="/admin/:id/edit" element={(
                    <CreateEditForm/>
                )}/>
                <Route path="/admin/create" element={(
                    <CreateEditForm/>
                )}/>
                <Route path="/admin/orders" element={(
                    <AdminOrders/>
                )}/>
            </Routes>
        </>
    )

};

export default App
