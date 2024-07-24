import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {DishProps, getDish, postDish} from "../containers/ThunkFetch/FetchSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RootState} from "../app/slice.ts";

const CreateEditForm = () => {

    const [DishData, setDishData] = useState<DishProps>({
        title: '',
        price: 0,
        img: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const DishFollow = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDishData((prevData) => ({...prevData, [name]: value}));
    };

    const FormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await dispatch(postDish(DishData));
        await navigate('/admin');
    }

    return (
        <div className="form-container">
            <form onSubmit={FormSubmit}>
                <div className={"input-group"}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" placeholder="Enter the title" value={DishData.title} onChange={DishFollow}/>
                </div>
                <div className={"input-group"}>
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" placeholder="Enter the price" value={DishData.price} onChange={DishFollow}/>
                </div>
                <div className={"input-group"}>
                    <label htmlFor="image">Image</label>
                    <input type="url" name="img" placeholder="Enter the url" value={DishData.img} onChange={DishFollow}/>
                </div>
                <div className={"input-group"}>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default CreateEditForm;