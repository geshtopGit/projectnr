import { useState } from "react"
import Axios from "axios"
import { Dialog } from "primereact/dialog";
// import AllProductComp from "./AllProductComp"
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';

const DeletProduct = (props) => {
    const [visible, setVisible] = useState(false);
    const delet = async () => {

        console.log(props.id);
        const res = await Axios.delete(`http://localhost:1004/api/product/${props.id}`);
        console.log(res);
        props.onDelete(props.id)
        const { data: allSC } = await Axios.get("http://localhost:1004/api/shoppingCard",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userNow")}`
                }
            }
        )
        for (let i = 0; i < allSC.length; i++) {
            if (allSC[i].codeProduct === props.id)
                await Axios.delete(`http://localhost:1004/api/shoppingCard/${allSC[i]._id}`);
        }
    }
    const footerContent = (
        <div>
            <Button label="ביטול" icon="pi pi-times" onClick={() => { setVisible(false); update(false); }} className="p-button-text" />
            <Button label="אישור" icon="pi pi-check" onClick={() => { setVisible(false); update(true); }} autoFocus />
        </div>
    );
    const update = async (result) => {
        if (result === true) {
            setVisible(true)
        }
    }
    return (
        <>
            <Dialog header="עדכון מוצר" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }} footer={footerContent}>
                <h1 style={{ direction: "rtl" }}>המוצר קיים</h1>
                <p style={{ direction: "rtl" }} className="m-0">
                    האם ברצונך לערוך שינויים
                </p>
            </Dialog>
            <Button onClick={delet} icon="pi pi-trash" className="p-button-rounded" style={{ backgroundColor: '#C89A42', color: "white", borderColor: 'white' }} />
            
        </>
    )
}
export default DeletProduct