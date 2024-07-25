import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {DishProps, postDish, putDish} from "../containers/ThunkFetch/FetchSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import axiosAPI from "../axios/AxiosAPI.ts";
import {RootState} from "../app/slice.ts";

const CreateEditForm = () => {

    const [DishData, setDishData] = useState<DishProps>({
        title: '',
        price: 0,
        img: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const { loading, error } = useSelector((state: RootState) => state.dishes);

    useEffect(  () => {
        if(id){
            const getData = async () => {
                const response = await axiosAPI<DishProps>.get(`/pizzaturtle/dishes/${id}.json`);
                setDishData(response.data);
            }
            getData();
        }
    }, [id]);
    const DishFollow = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDishData((prevData) => ({...prevData, [name]: value}));
    };

    const FormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(id){
            await dispatch(putDish({ id, updatedContact: DishData }));
            await navigate('/admin');
        }else{
            await dispatch(postDish(DishData));
            await navigate('/admin');
        }

    }

    return (
        <div className="form-container">
            {error && <div className="error">Something gone wrong...</div>}
            <div id="loader-container" style={{display: loading ? 'block' : 'none'}}>
                <div className="loader"></div>
            </div>
            <form onSubmit={FormSubmit}>
                <div className={"input-group"}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" placeholder="Enter the title" value={DishData.title}
                           onChange={DishFollow}/>
                </div>
                <div className={"input-group"}>
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" placeholder="Enter the price" value={DishData.price}
                           onChange={DishFollow}/>
                </div>
                <div className={"input-group"}>
                    <label htmlFor="image">Image</label>
                    <input type="url" name="img" placeholder="Enter the url" value={DishData.img}
                           onChange={DishFollow}/>
                </div>
                <div className={"input-group"}>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default CreateEditForm;