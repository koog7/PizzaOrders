const AdminDishes = () => {
    return (
        <div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <div>
                    <img width={'100px'} src={'https://www.hearthandfirepizza.com/cdn/shop/products/product-beauty-the-margherita.png?v=1656423819'} alt={'Dish'}/>
                </div>
                <div>
                    <h4>Margarita</h4>
                </div>
                <div>
                    450 KGS
                </div>
                <div>
                    <button style={{marginRight:'10px'}}>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default AdminDishes;