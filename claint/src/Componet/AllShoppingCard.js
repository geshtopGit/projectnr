import Axios from "axios"
import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode";
import DeleteShoppingCard from "./DeletShoppingCard";

const AllShoppingCard = () => {
    const [products, setProducts] = useState([])
    const [sum, setSum] = useState(0)

    const shoppingCard = async () => {
        let res;
        const token = jwtDecode(localStorage.getItem("userNow"));
        try {
            res = await Axios.get("http://localhost:1004/api/shoppingCard", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userNow")}`
                }
            })
            const filtered = res.data.filter((prod) => prod.user === token._id);
            setProducts(filtered);

            let total = 0;
            for (let i = 0; i < filtered.length; i++) {
                total += filtered[i].price * filtered[i].count;
            }
            setSum(total)
        } catch (error) {
            console.error("שגיאה בקבלת נתונים מהשרת", error)
        }
    }

    useEffect(() => {
        shoppingCard();
    }, []);

    const handleDelete = (id) => {
        setProducts(prev => prev.filter(product => product._id !== id));
    }


return(
        <>
           <div className="to-right flex justify-content-center">
        </div>
            <div>
                {products.map((prod) => (
                    <div>
                        <h4>{prod.name}</h4>
                        <p>מחיר: {prod.price}</p>
                        <p>כמות:{prod.count}</p>
                        <img src={`http://localhost:1004/uploads/${prod.image}`} alt={prod.name} width="100" />
                        <DeleteShoppingCard id={prod._id} onDelete={handleDelete}/>
                    </div>
                ))}
            </div>
            <p>סה"כ לתשלום:{sum}</p>   
        </>
)
            }
export default AllShoppingCard
