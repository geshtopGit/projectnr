import Axios  from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DeletProduct from "./DeletProduct";
import AddShoppingCard from "./AddShoppingCard";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import SingelShoppingCard from "./SingelShoppingCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const SingleCategory=()=>{
    const location = useLocation();
    const title = location.state?.title
    console.log(title);
    const [products,setProducts]=useState([])
    const [visible, setVisible] = useState(false);
    const navigate=useNavigate()
const fetchData=async()=>{
    const {data}=await Axios.get("http://localhost:1004/api/product")
    const filtered=data.filter((product)=>{
        return product.category===title
    })
    setProducts(filtered)
}
useEffect(()=>{
    fetchData()
},[title])

const roles = useSelector(state => state.sum.roles);
const [visible1, setVisible1] = useState(false);
const enter = (res) => {
    if (res){
        setVisible1(false);
        navigate("/Register"); }
    else{
        setVisible1(false);
        navigate("/")}
};

const footerContent = (
    <div>
        <Button label="ביטול" icon="pi pi-times" onClick={() => enter(false)} autoFocus  className="p-button-text mt-2 custom-transparent-button"  />
        <Button label="התחברות" icon="pi pi-user" onClick={() => enter(true)} autoFocus />
    </div>
)

const goToCart = () => {
    try {
        const token = localStorage.getItem("userNow");
        if (!token) throw new Error("יש להתחבר לפני שניתן לצפות בעגלה");
        navigate("/allSCard");
    } catch (err) {
        console.log("פתיחת דיאלוג שגיאה");  
        setVisible1(true);
    }
}


    return (
        <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '20px',
                    padding: '20px'
                }}
            >
                {products.map((product) => (
                    <div
                        key={product._id}
                        style={{
                            flex: '0 0 calc(25% - 20px)',
                            maxWidth: 'calc(25% - 20px)',
                            minWidth: '250px'
                        }}
                    >
                        <Card
                            header={
                                <Link to={`/all/${product._id}`}>
                                    <img
                                        src={`http://localhost:1004/uploads/${product.image}`}
                                        alt={product.name}
                                        style={{
                                            width: '100%',
                                            height: '150px',
                                            objectFit: 'cover',
                                            borderTopLeftRadius: '6px',
                                            borderTopRightRadius: '6px'
                                        }}
                                    />
                                </Link>
                            }
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                backgroundColor: '#ffffff',
                                color: '#333',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                height: '50vh',
                                padding: '0',
                                overflow: 'hidden'
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: '#f0f0f0' }}>
                                <div style={{ padding: '10px', flexGrow: 1, }}>
                                    <p style={{ fontSize: "11px", color: "#999", margin: 0 }}>מק"ט: {product.code}</p>
                                    <h3 style={{ margin: '5px 0', fontSize: '1.1rem', color: '#222' }}>{product.name}</h3>
                                    <p style={{ fontSize: '1rem', margin: '0 0 5px', color: '#C89A42' }}>{product.price}₪</p>
                                    <div style={{ fontSize: '0.9rem', color: '#555' }}>
                                        <i className="pi pi-tag" style={{ marginInlineEnd: '5px', color: '#888' }}></i>
                                        <span>{product.category}</span>
                                    </div>
                                </div>
                                <div style={{ paddingTop: "5px" }}>
                                    <AddShoppingCard product={product} price={product.price * product.count} degel={visible} setDegel={setVisible} />
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>

            <Button
                onClick={() => {
                    const token = localStorage.getItem("userNow");
                    if (!token) {
                        setVisible1(true);
                    } else {
                        setVisible(true);
                    }
                }}
                icon="pi pi-shopping-cart"
                className="p-button-rounded"
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '20px',
                    backgroundColor: 'white',
                    borderColor: '#C89A42',
                    color: '#C89A42',
                    zIndex: 999,
                    height: '40px',
                    width: '40px',
                    border: '2px solid #C89A42',
                }}
            />

            <Dialog
                dismissableMask
                position="left"
                visible={visible}
                style={{ width: '30vw', height: "100vh" }}
                onHide={() => setVisible(false)}
            >
                <SingelShoppingCard visible={visible} />
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                    <Button
                        label="למעבר לעגלה"
                        icon="pi pi-arrow-right"
                        className="p-button-text"
                        onClick={goToCart}
                    />
                </div>
            </Dialog>


            <Dialog
                header="שגיאה בגישה לעגלה"
                visible={visible1}
                modal={true}
                style={{ width: '40vw', zIndex: 1000 }}
                onHide={() => setVisible1(false)}
                footer={footerContent}
            >
                <p>כדי לצפות בעגלת הקניות יש להתחבר למערכת.</p>
            </Dialog>

            {roles && (
                <Button
                    icon="pi pi-cog"
                    onClick={() => navigate('/maneger')}
                    className="p-button-rounded"
                    style={{
                        position: 'fixed',
                        bottom: 20,
                        right: 20,
                        backgroundColor: 'white',
                        borderColor: '#C89A42',
                        color: '#C89A42',
                        zIndex: 1001,
                        height: '40px',
                        width: '40px',
                        border: '2px solid #C89A42',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                    }}
                />
            )}
        </div>
    );
}
export default SingleCategory