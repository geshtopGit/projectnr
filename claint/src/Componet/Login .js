import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from "primereact/floatlabel";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Tooltip } from "primereact/tooltip";
import { Dialog } from 'primereact/dialog';
import { Password } from 'primereact/password';
import '../App.css'
import { Button } from 'primereact/button';
import Axios from "axios";
import { jwtDecode } from "jwt-decode"
import { Card } from "primereact/card";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')
    const [products, setProducts] = useState([])
    const [degelPassword, setDegelPassword] = useState(false)
    const navigate = useNavigate();
    const login = async (e) => {
        e.preventDefault();
        try {
            const res = await Axios.post("http://localhost:1004/api/auth/login", { username, password },

            )
            const accessToken = res.data.accessToken
            localStorage.setItem("userNow", accessToken);
            Axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            // console.log("f"+a);
            const token = localStorage.getItem("userNow");
            const decodeToken = jwtDecode(token);
            console.log(decodeToken.name);

            console.log(accessToken.name);
            // console.log("asdf");
            const { data } = await Axios.get("http://localhost:1004/api/shoppingCard/singel", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userNow")}`
                }
            })
            setProducts(data)

            let zover = 0;
            for (let i = 0; i < data.length; i++) {
                zover += data[i].price * data[i].count
            }
            console.log(zover+"  zover");
          
            dispatch({ type: "Set", payload: zover })
            setUsername('');
            setPassword('');
            setVisible(false);
            const isAdmin = decodeToken.roles === "מנהל";

            dispatch({ type: "SetRoles", payload: isAdmin });
            if (isAdmin) {
                navigate("/maneger");
            } else {
                navigate("/");
            }
        }
        catch (error) {
            if (error.response?.status === 401)
                setErr("משתמש לא פעיל")
            if (error.response?.status === 405)
                navigate("/register")
        }
    }
    useEffect(() => {
        const tokenStr = localStorage.getItem("userNow");

        if (tokenStr) {
            try {
                const decoded = jwtDecode(tokenStr);
                const isAdmin = decoded.roles === "מנהל";
                console.log(isAdmin);
                dispatch({ type: "SetRoles", payload: isAdmin });
            } catch (e) {
                console.error("טוקן לא תקין:", e.message);
                dispatch({ type: "SetRoles", payload: false });
            }
        } else {
            dispatch({ type: "SetRoles", payload: false });
        }

    }, []);







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
            <Tooltip target="#loginBtn" content="התחברות" position="top" className="custom-tooltip" />
            <Button id="loginBtn" icon="pi pi-user" text onClick={() => setVisible(true)} style={{
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
                            <form onSubmit={login}>
                                <div className=" ">
                                    <div className=" flex flex-column p-3 w-12">
                                        <FloatLabel>
                                            <InputText required tooltip="הכנס קוד משתמש" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                            <label htmlFor="username">קוד משתמש</label>
                                        </FloatLabel>
                                    </div>
                                    <div className="flex flex-column p-3 w-2rem">

                                        <FloatLabel>
                                            <Password inputId="password" style={{ width: "30%" }} tooltip="הכנס סיסמה" value={password} onChange={(e) => { zover(e) }} toggleMask feedback={degelPassword} />
                                            <label htmlFor="password">סיסמא</label>
                                        </FloatLabel>
                                    </div>
                                </div>
                                <div className="flex align-items-center gap-3" style={{ paddingLeft: "35%" }}>
                                    <Button label="שמור" type="submit" text icon="pi pi-check" size="Normal" />
                                </div>
                            </form>
                        </div>
                    )}
                ></Dialog>
            </div>
        </div>
    )
}
export default Login