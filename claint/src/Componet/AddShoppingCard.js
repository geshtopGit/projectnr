import Axios from 'axios';
import { Button } from 'primereact/button';
import { useState } from 'react';
import 'primeicons/primeicons.css';
import '../App.css';
import { InputNumber } from 'primereact/inputnumber';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
const AddShoppingCard = (props) => {
    const dispatch=useDispatch()
    const [degel, setDegel] = useState(false);
    const [value, setValue] = useState(1);
    const tokenStr = localStorage.getItem("userNow");
let token = null;

if (typeof tokenStr === "string") {
    try {
        token = jwtDecode(tokenStr);
    } catch (e) {
        console.error("שגיאת פענוח טוקן:", e.message)
    }
}


    const add = async () => {
        try {
           
            const { data } = await Axios.get("http://localhost:1004/api/shoppingCard",
                {
                    headers: {
                        Authorization: `Bearer ${tokenStr}`
                    }
                }
            )
            const filtered = data.filter((prod) => prod.user === token._id);
            console.log(filtered);
            const find = filtered.find((prod) => prod.codeProduct === props.product._id)
            console.log(find)
            console.log(value)
            if (!find) {
                const res = await Axios.post("http://localhost:1004/api/shoppingCard",
                    {
                        name: props.product.name,
                        codeProduct: props.product._id,
                        price: props.product.price,
                        image: props.product.image,
                        count: value
                        // user:
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${tokenStr}`
                        }
                    }
                )
                dispatch({type:"Add",payload:value*props.product.price})
                props.setDegel(true)
                setValue(1)
            }
            else {
                console.log("aaa");
                const res = await Axios.put("http://localhost:1004/api/shoppingCard",
                    {
                        codeProduct: props.product._id,
                        count: value
                        // user:
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${tokenStr}`
                        }
                    }
                )
                dispatch({type:"Add",payload:value*props.product.price})
                props.setDegel(true)
                setValue(1)
            }
        }
        catch (error) {
            if (error.response?.status === 400)
                setDegel(true)
        }
    }
    return (
        <>
           
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.7rem' }}>

           <InputNumber
        value={value}
        onValueChange={(e) => setValue(e.value)}
        showButtons
        buttonLayout="vertical"
        step={1}
        incrementButtonClassName="my-increment"
        decrementButtonClassName="my-decrement"
        incrementButtonIcon="pi pi-plus"
        decrementButtonIcon="pi pi-minus"
        mode="decimal"
        inputStyle={{
            width: '100%',
            textAlign: 'center',
            height: '1.5rem',
            fontSize: '0.75rem', 
            padding: '0.1rem'
        }}
        style={{
            width: '1.5rem',
           marginLeftLeft:"10px",
           backgroundColor: '#f0f0f0',
           color:"#C89A42",
            borderColor: '#C89A42' 
        }}
    />
     <div  style={{paddingBottom:"6px"}}>
    <Button onClick={add} icon="pi pi-shopping-cart" className="p-button-rounded" style={{ backgroundColor: '#f0f0f0',color:"#C89A42", borderColor: '#C89A42' }}  />
    </div>
</div>
          


        </>
    )
}
export default AddShoppingCard