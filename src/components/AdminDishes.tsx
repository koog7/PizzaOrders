import {deleteDish, DishProps} from "../containers/ThunkFetch/FetchSlice.ts";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/slice.ts";


const AdminDishes: React.FC<DishProps> = ({title , price , img, id}) => {
    const dispatch = useDispatch();

    const { loading, error } = useSelector((state: RootState) => state.dishes);
    const DeleteContact = async () => {
        try {
            await dispatch(deleteDish(id));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {error && <div className="error">Something gone wrong...</div>}
            <div id="loader-container" style={{display: loading ? 'block' : 'none'}}>
                <div className="loader"></div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
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
                        <button style={{marginRight: '10px'}}><NavLink to={`/admin/${id}/edit`} style={{
                            textDecoration: 'none',
                            color: 'inherit'
                        }}>Edit</NavLink></button>
                        <button onClick={DeleteContact}>Delete</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDishes;