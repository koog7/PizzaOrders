import {DishProps} from "../containers/ThunkFetch/FetchSlice.ts";
import {NavLink} from "react-router-dom";


const AdminDishes: React.FC<DishProps> = ({title , price , img, id}) => {

    return (
        <div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <div>
                    <img width={'100px'} src={`${img}`} alt={'Dish'}/>
                </div>
                <div>
                    <h4>{title}</h4>
                </div>
                <div>
                    {price} KGS
                </div>
                {location.pathname === '/admin' && (
                    <div>
                        <button style={{ marginRight: '10px' }}><NavLink to={`/admin/${id}/edit`} style={{ textDecoration: 'none', color: 'inherit' }}>Edit</NavLink></button>
                        <button>Delete</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDishes;