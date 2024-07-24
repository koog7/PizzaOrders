import {NavLink} from "react-router-dom";
import AdminDishes from "../components/AdminDishes.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/slice.ts";
import {useEffect} from "react";
import {getDish} from "./ThunkFetch/FetchSlice.ts";

const AdminHome = () => {

    const dispatch = useDispatch();
    const { dishes, loading, error } = useSelector((state: RootState) => state.dishes);

    useEffect(() => {
        dispatch(getDish())
    }, [dispatch]);


    console.log(dishes)
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
            {dishes.length > 0 ? (
                dishes.map(dish => (
                    <AdminDishes
                        key={dish.id}
                        id={dish.id}
                        title={dish.title}
                        price={dish.price}
                        img={dish.img}
                    />
                ))
            ) : (
                <div>No dishes available</div>
            )}
        </div>
    );
};

export default AdminHome;