import Axios from "axios"
import DeleteShoppingCard from "./DeletShoppingCard"
import { useState, useEffect } from "react"
import 'primeicons/primeicons.css';

import { jwtDecode } from "jwt-decode"
import {  useSelector } from "react-redux";

const SingelShoppingCard = (props) => {
    const sum=useSelector(x=>x.sum.sum)
    console.log(sum+" sum singel");
    const [products, setProducts] = useState([])

    const fetchData = async () => {
        try {
            const { data } = await Axios.get("http://localhost:1004/api/shoppingCard/singel",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userNow")}`
                    }
                }
            )
            setProducts(data)
        } catch (error) {
            console.error("שגיאה בקבלת נתונים מהשרת", error)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (id) => {
        setProducts(prev => prev.filter(product => product._id !== id));
    }
    let roles
    const token = jwtDecode(localStorage.getItem("userNow"))
    if (token.roles === "מנהל")
        roles = true
    else
        roles = false
    return(
<div style={{ position: 'relative', minHeight: '100vh' }}>
    {sum > 0 ? <h1 style={{ color: "#C89A42", paddingLeft:props.visible ? "15%" :"40%"}}>:המוצרים שלי</h1> : <p>לא נמצאו מוצרים בעגלת הקניות</p>}
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center",
            width: '90%',
            margin: '0 auto'
        }}
    >
        {products.map((product) => (
            <div key={product._id} style={{ width: '100%' }}>
                <div
                    style={{
                        display: "flex",
                        gap:props.visible ?"2%":"100px",
                        flexDirection: "row-reverse",
                        alignItems: "center",
                        width: "100%"
                    }}
                >
                    <img
                        src={`http://localhost:1004/uploads/${product.image}`}
                        alt={product.name}
                        style={{
                            width: props.visible ? '60%' : '20%',
                            aspectRatio: '1',
                            objectFit: 'cover',
                            borderRadius: '4px',
                            flexShrink: 0
                        }}
                    />
                    <div style={{ width: '75%' }}>
                        <p
                            style={{
                                fontSize: props.visible ?"100%":"200%",
                                direction:"rtl",
                                paddingTop:props.visible ?"30px":"0px",
                                margin: 0,
                                wordBreak: 'break-word',
                                whiteSpace: 'normal',
                            }}
                            className="scroll-text"
                        >
                            {product.name}
                        </p>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: '100%'
                    }}
                >
                   
                    <DeleteShoppingCard id={product._id} onDelete={handleDelete} price={product.price * product.count} />
                    <p style={{ fontSize:props.visible ? "90%":"150%" }}>{product.count}×{product.price}₪</p>
                </div>
                <hr style={{ lineHeight: 0, borderTop: '1px solid black', marginTop: '2%', paddingRight: "0px" }} />
            </div>
        ))}
        {sum > 0 ? <h3 style={{ width: '100%', textAlign:props.visible ?'right':"center" ,paddingRight:props.visible ?'0px':"20%"}}>סכום ביניים: ₪{sum}</h3> : null}
        <hr style={{ lineHeight: 0, borderTop: '1px solid black', marginTop: '2%', paddingRight: "0px", width: '100%' }} />
    </div>
</div>
)
}
export default SingelShoppingCard
