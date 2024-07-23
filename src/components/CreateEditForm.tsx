const CreateEditForm = () => {
    return (
        <div className="form-container">
            <form>
                <div className={"input-group"}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" placeholder="Enter the title"/>
                </div>
                <div className={"input-group"}>
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" placeholder="Enter the price"/>
                </div>
                <div className={"input-group"}>
                    <label htmlFor="image">Image</label>
                    <input type="url" name="image" placeholder="Enter the url"/>
                </div>
                <div className={"input-group"}>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default CreateEditForm;