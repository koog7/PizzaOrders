import {ChangeEvent, useState} from "react";
import {DishProps} from "../containers/ThunkFetch/FetchSlice.ts";

const CreateEditForm = () => {

    const [DishData, setDishData] = useState<DishProps>({
        title: '',
        price: 0,
        img: '',
    });

    const DishFollow = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDishData((prevData) => ({...prevData, [name]: value}));
    };

    return (
        <div className="form-container">
            <form>
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
                    <input type="url" name="image" placeholder="Enter the url" value={DishData.img} onChange={DishFollow}/>
                </div>
                <div className={"input-group"}>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default CreateEditForm;