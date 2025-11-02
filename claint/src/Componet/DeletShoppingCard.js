import Axios from "axios"
import { Button } from 'primereact/button';
import { useDispatch } from "react-redux";


const DeleteShoppingCard = (props) => {
    const dispatch=useDispatch()
    const delet = async () => {
        const token = localStorage.getItem("userNow")
       
        dispatch({type:"Subtract",payload:props.price})
        const res1 = await Axios.delete(`http://localhost:1004/api/shoppingCard/${props.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        props.onDelete(props.id)

    }

    return (
        <>
            <Button
                onClick={delet}
                icon="pi pi-times-circle"
                className="p-button-text p-button-plain p-button-sm icon-only"
                style={{
                    borderRadius: "50%",
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0
                }}
            />
        </>
    )
}
export default DeleteShoppingCard