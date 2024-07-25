import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/slice.ts";
import {getDish} from "./ThunkFetch/FetchSlice.ts";
import AdminDishes from "../components/AdminDishes.tsx";

const Home = () => {

    const dispatch = useDispatch();
    const { dishes, loading, error } = useSelector((state: RootState) => state.dishes);
    const [cart, setCart] = useState<{ [key: string]: number }>({});
    const [overlay, setOverlay] = useState(false);

    const addToCart = (id: string) => {
        setCart(prevCart => ({...prevCart, [id]: (prevCart[id] || 0) + 1}));
        console.log('cart' , cart)
    };

    const getTotal = () => {
        return Object.keys(cart).reduce((acc, key) => {
            const dish = dishes.find(dish => dish.id === key);
            return dish ? acc + (dish.price * cart[key]) : acc;
        }, 150);
    };

    useEffect(() => {
        dispatch(getDish())
    }, [dispatch]);

    const deleteDataFromOverlay = (id: string) => {
        setCart(prevCart => {
            const newCart = { ...prevCart };
            if (newCart[id]) {
                delete newCart[id];
            }
            return newCart;
        });
    }

    return (
        <div>
            <div style={{marginBottom: '20px'}}>Order total: {getTotal()} KGS
                <button onClick={() => setOverlay(true)} style={{marginLeft:'20px'}}>Checkout</button>
            </div>

            {dishes.length > 0 ? (
                dishes.map(dish => (
                    <div key={dish.id} onClick={() => addToCart(dish.id)}>
                        <AdminDishes
                            id={dish.id}
                            title={dish.title}
                            price={dish.price}
                            img={dish.img}
                        />
                    </div>
                ))
            ) : (
                <div>No dishes available</div>
            )}

            {overlay && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Order Preview</h2>
                        <div>
                            {Object.keys(cart).map(key => {
                                const dish = dishes.find(dish => dish.id === key);
                                return (
                                    <div key={key}>
                                        {`${dish.title} x ${cart[key]}`}
                                        <button onClick={() => deleteDataFromOverlay(key)} style={{marginLeft:'10px'}}>X</button>
                                    </div>
                                );
                            })}
                        </div>
                        <div>Delivery: <strong> 150 KGS</strong></div>
                        <div>Total: <strong>{getTotal()} KGS</strong></div>
                        <button onClick={() => setOverlay(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;