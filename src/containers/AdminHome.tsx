import AdminDishes from "./AdminDishes.tsx";
import {NavLink} from "react-router-dom";

const AdminHome = () => {
    return (
        <div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                    <h2>Dishes</h2>
                </div>
                <div>
                    <NavLink to={'/admin/create'}>Add new dish</NavLink>
                </div>
            </div>

            <AdminDishes />
        </div>
    );
};

export default AdminHome;