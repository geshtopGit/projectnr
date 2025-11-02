import { NavLink, useNavigate } from "react-router-dom";
import { Toolbar } from 'primereact/toolbar';
import React, { useRef, useState } from "react";
import Register from "./Register";
import { Tooltip } from "primereact/tooltip";
import Login from "./Login ";
import { useSelector } from "react-redux";
import { Toast } from 'primereact/toast';
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const Header = () => {
    const navigate = useNavigate();
    const toast = useRef(null);

    const roles = useSelector(state => state.sum.roles);
    const [visible, setVisible] = useState(false);
    const enter = (res) => {
        if (res){
            setVisible(false);
            navigate("/Register"); }
        else{
            setVisible(false);
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
            setVisible(true);
        }
    }

    const leftContent = (
        <div className="flex flex-wrap align-items-center gap-3">
            <NavLink to="/">
            <Tooltip target="#home" content="דף הבית" position="top" className="custom-tooltip" />
                <i className="pi pi-home" id="home" style={{ color: '#C89A42' }}></i>
            </NavLink>
            <Tooltip target="#shopping-cart" content="עגלת קניות" position="top" className="custom-tooltip" />
            <i   id="shopping-cart"
                className="pi pi-shopping-cart"
                style={{ color: '#C89A42', cursor: 'pointer' }}
                onClick={goToCart}
            ></i>

            <Register />
            <Login />

            <NavLink to="/out">
            <Tooltip target="#sign-out" content="התנתקות" position="top" className="custom-tooltip" />
                <i className="pi pi-sign-out" id="sign-out"  style={{ color: '#C89A42' }}></i>
            </NavLink>
            
          
        </div>
    );

    const centerContent = (
        <div className="flex flex-wrap align-items-center gap-3">
            
            <NavLink to="/category" style={{ textDecoration: 'none', color: '#C89A42' }} state={{ title: "שוקולאב בר" }}>
                שוקולאב בר
            </NavLink>
            <NavLink to="/category" style={{ textDecoration: 'none', color: '#C89A42' }} state={{ title: "מגשי פירות" }}>
                מגשי פירות
            </NavLink>
            <NavLink to="/category" style={{ textDecoration: 'none', color: '#C89A42' }} state={{ title: "כלים ומפות" }}>
                כלים ומפות
            </NavLink>
            <NavLink to="/category" style={{ textDecoration: 'none', color: '#C89A42' }} state={{ title: "מארזי אירועים" }}>
                מארזי אירועים
            </NavLink>
        </div>
    );

    return (<>
        <div
            style={{
                backgroundColor: '#362C28',
                borderRadius: '2rem',
                padding: '10px',
                margin: '10px',
                overflow: 'hidden'
            }}
        >
            <Toast ref={toast} />

            <div style={{ textAlign: 'center', marginBottom: '10px', paddingLeft: "10%" }}>
                <img
                    src="http://localhost:1004/uploads/logo.png"
                    style={{ height: '40px' }}
                    alt="logo"
                />
            </div>

            <Toolbar
                left={leftContent}
                center={centerContent}
                style={{
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    border: 'none',
                    height: '30px',
                    minHeight: 'unset',
                    padding: '0 0rem'
                }}
            />

        </div>
        <Dialog
            header="שגיאה בגישה לעגלה"
            visible={visible}
            modal={true}
            style={{ width: '40vw', zIndex: 1000 }}
            onHide={() => setVisible(false)}
            footer={footerContent}
        >
            <p>כדי לצפות בעגלת הקניות יש להתחבר למערכת.</p>
        </Dialog>

    </>
    );
};

export default Header;
