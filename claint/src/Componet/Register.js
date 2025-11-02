import Axios from "axios"
import { useNavigate } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { Messages } from 'primereact/messages';
import { ToggleButton } from 'primereact/togglebutton';
import { Tooltip } from "primereact/tooltip";
import 'primeflex/primeflex.css';
import { FloatLabel } from "primereact/floatlabel";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../App.css';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import React, { useState, useRef } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [degelPassword, setDegelPassword] = useState(false)
    const [active, setActive] = useState(true)
    const [err, setErr] = useState()
    const navigate = useNavigate();
    const msgs = useRef(null);
    const dispatch=useDispatch()


    const sendForm = async (e) => {
        e.preventDefault();
        try {
            const res = await Axios.post("http://localhost:1004/api/auth/register", { username, password, name, email, phone, active })
            if (res.status === 201 || res.status === 200) {
                setVisible(false);
                setUsername('');
                setPassword('');
                setName('');
                setPhone('');
                setEmail('');
                navigate("/login");
            }
            dispatch({ type: "Set", payload: 0})
        }
        catch (error) {

            if (error.response?.status === 409)
                if (msgs.current) {
                    msgs.current.clear();
                    msgs.current.show([
                        {
                            severity: 'error',
                            summary: 'שגיאה',
                            detail: error.response?.data?.message || "שגיאה כללית בשליחת הטופס",
                            life: 3000
                        }
                    ])
                }

            if (error.response?.status === 400)
                setErr("משתמש לא חוקי")
        }
    }
    const [visible, setVisible] = useState(false);
    const zover = (e) => {

        if (e.target.value.length > 0 && e.target.value.length < 4)
            setDegelPassword(true)
        else
            setDegelPassword(false)
        setPassword(e.target.value)
    }
    return (
        <div className=" flex justify-content-center" style={{ borderRadius: '20px' }}>
            <Tooltip target="#addUserBtn" content="משתמש חדש" position="top" className="custom-tooltip" />
            <Button id="addUserBtn" icon="pi pi-user-plus" text onClick={() => setVisible(true)} style={{
                boxShadow: 'none',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                padding: 0
            }} />
            <div className="dialog">
                <Dialog
                    visible={visible}
                    modal
                    onHide={() => { if (!visible) return; setVisible(false); }}
                    content={({ hide }) => (
                        <div className="flex flex-column px-5 py-4 gap-12" style={{ borderRadius: '20px', backgroundImage: 'linear-gradient(135deg, #C89A42 3%, white 20%, white 80%, #C89A42 100%)' }}>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                                <img width="150" height="35" src="http://localhost:1004/uploads/logo.png"></img>
                                <Button
                                    onClick={() => setVisible(false)}
                                    icon="pi pi-times"
                                    className="p-button-text p-button-sm"
                                    style={{
                                        border: 'none',
                                        background: 'transparent',
                                        boxShadow: 'none',
                                        outline: 'none',
                                        borderRadius: '50%',
                                        width: '30px',
                                        height: '30px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 0,
                                        color: '#C89A42'
                                    }}
                                />
                            </div>
                            <form onSubmit={sendForm}>
                                <div className=" ">
                                    <div className=" flex flex-column p-3 w-12">
                                        <FloatLabel>
                                            <InputText required tooltip="הכנס קוד משתמש" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                            <label htmlFor="username">קוד משתמש</label>
                                        </FloatLabel>
                                    </div>
                                    <Messages ref={msgs} />
                                    <div className="flex flex-column p-3 w-2rem">

                                        <FloatLabel>
                                            {/* <div style={{ width: '30%' }}> */}
                                            <Password inputId="password" style={{width:"30%"}} tooltip="הכנס סיסמה" value={password} onChange={(e) => { zover(e) }} toggleMask feedback={degelPassword} />
                                            <label htmlFor="password">סיסמא</label>
                                            {/* </div> */}
                                        </FloatLabel>
                                    </div>
                                    <div className=" flex flex-column p-3">
                                        <FloatLabel>
                                            <InputText tooltip="הכנס שם משתמש" required id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                            <label htmlFor="name">שם משתמש</label>
                                        </FloatLabel>
                                    </div>
                                    <div className=" flex flex-column p-3">
                                        <FloatLabel>
                                            <InputText id="email" tooltip="הכנס כתובת מייל" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            <label htmlFor="email">מייל</label>
                                        </FloatLabel>
                                    </div>
                                    <div className=" flex flex-column p-3">
                                        <FloatLabel>
                                            <InputText id="phone" tooltip="הכנס מספר טלפון" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                            <label htmlFor="phone">מספר טלפון </label>
                                        </FloatLabel>
                                    </div>
                                    <div className="flex align-items-center p-3 gap-3">
                                        {/* <div className="flex align-items-center p-3 gap-2"> */}
                                            <Checkbox inputId="active" checked={active} onChange={(e) => setActive(e.checked)} />
                                            <label htmlFor="active" className="checkbox-label">משתמש פעיל</label>
                                        {/* </div> */}
                                        {/* <ToggleButton checked={active} onChange={(e) => setActive(e.value)} className="w-13rem" />
                                        <label htmlFor="active">מספר טלפון </label> */}
                                    </div>
                                    {/* <Button type="submit" label="שלח" icon="pi pi-check" className="p-button-success" /> */}
                                </div>

                                <div className="flex align-items-center gap-3" style={{paddingLeft:"35%"}}>
                                    {/* <Button label="שלח" type="submit" text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button> */}
                                    <Button label="שמור" type="submit" text icon="pi pi-check" size="Normal"  />
                                </div>
                            </form>

                            {/* <Button onClick={() => setVisible(false)} label="ביטול" text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button> */}
                        </div>
                    )}
                ></Dialog>
            </div>
        </div>
    )
}

export default Register