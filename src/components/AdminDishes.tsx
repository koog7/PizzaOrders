import {DishProps} from "../containers/ThunkFetch/FetchSlice.ts";


const AdminDishes: React.FC<DishProps> = ({title , price , img}) => {

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
                        <button style={{ marginRight: '10px' }}>Edit</button>
                        <button>Delete</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDishes;