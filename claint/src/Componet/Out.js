import { Dialog } from 'primereact/dialog';
import { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Out = () => {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const dispatch=useDispatch()

    useEffect(() => {
        setVisible(true);
    }, []);

    const out = (confirm) => {
        if (confirm) {
            localStorage.clear()
            dispatch({type:"Clear",payload:0})
            navigate('/login'); 
        }
        setVisible(false);
    };

    const footerContent = (
        <div>
            <Button label="בטול"  icon="pi pi-times" onClick={() => out(false)} className="p-button-text" />
            <Button label="אישור" icon="pi pi-check" onClick={() => out(true)} autoFocus />
        </div>
    );

    return (
        <Dialog
            header="יציאה מהמערכת"
            visible={visible}
            style={{ width: '40vw' }}
            onHide={() => setVisible(false)}
            footer={footerContent}
        >
            <p>האם את/ה בטוח/ה שברצונך לצאת מהמערכת?</p>
        </Dialog>
    );
};

export default Out;