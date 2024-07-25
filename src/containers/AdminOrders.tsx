import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import axiosAPI from "../axios/AxiosAPI.ts";
import {deleteDish, deleteOrder} from "./ThunkFetch/FetchSlice.ts";

interface Order {
    id: string;
    items: Record<string, number>;
}

const AdminOrders = () => {

    const dispatch = useDispatch();
    const [orders, setOrders] = useState<Order[]>([]);
    const [dishes, setDishes] = useState({});
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        const fetchOrdersAndDishes = async () => {
            setLoading(true);

            try {
                const responseOrders = await axiosAPI.get('/pizzaturtle/orders.json');
                const ordersData = responseOrders.data;
                setOrders(Object.keys(ordersData).map(id => ({
                    id,
                    items: ordersData[id],
                })));

                const responseDishes = await axiosAPI.get('/pizzaturtle/dishes.json');
                setDishes(responseDishes.data);

            } catch (err) {
                console.error('Error :', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrdersAndDishes();
    }, []);

    const handleCompleteOrder = async (orderId: string) => {
        setLoading(true);
        try {
            await dispatch(deleteOrder(orderId));
            await setOrders(orders.filter(order => order.id !== orderId))
        } catch (error) {
            console.error('Error removing order:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-orders">
            <div id="loader-container" style={{display: loading ? 'block' : 'none'}}>
                <div className="loader"></div>
            </div>
            <h2>Orders</h2>
            <ul className="order-list">
                {orders.map(order => {
                    const totalPrice = Object.entries(order.items).reduce((total, [id, amount]) => {
                        const dish = dishes[id];
                        if (!dish) {
                            console.error(`Dish with ID ${id} not found`);
                            return total;
                        }
                        return total + (Number(dish.price) * amount);
                    }, 0);

                    return (
                        <li key={order.id} className="order-item">
                            <div className="order-header">
                                <strong>Order ID: {order.id}</strong>
                            </div>
                            <ul className="pizza-list">
                                {Object.entries(order.items).map(([id, amount]) => {
                                    const dish = dishes[id];
                                    return dish ? (
                                        <li key={id} className="pizza-item">
                                            <img src={dish.img} alt={dish.title} className="pizza-img"/>
                                            <div className="pizza-details">
                                                <p>{amount}x {dish.title} - {Number(dish.price) * amount} KGS</p>
                                            </div>
                                        </li>
                                    ) : (
                                        <li key={id} className="pizza-item">
                                            <p>Corrupted id: {id}</p>
                                            <p>Order are not more available , please re-order.</p>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="order-footer">
                                <p>Delivery: 150 KGS</p>
                                <strong>Total Price: {totalPrice + 150} KGS</strong>
                                <button className="complete-order-button" onClick={() => handleCompleteOrder(order.id)}>Complete order</button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default AdminOrders;