import { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import AddShoppingCard from "./AddShoppingCard";

const SingleProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const fetchId = async () => {
        try {
            const res = await Axios.get(`http://localhost:1004/api/product/${id}`);
            setProduct(res.data);
        } catch (err) {
            console.error("שגיאה בשליפת המוצר", err);
        }
    };

    useEffect(() => {
        fetchId();
    }, []);

    if (!product) return <div className="text-center mt-6 text-lg">טוען מוצר...</div>;

    return (
        <div 
            className="min-h-screen flex flex-column md:flex-row justify-center items-center p-6"
            style={{ backgroundColor: '#f7f7f7', gap: '2rem' }}
        >
            <div 
                style={{ 
                    flex: '1', 
                    maxWidth: '600px',
                    minWidth: '280px',
                    padding: '2rem',
                    borderRadius: '10px',
                    color: '#333',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <h2 style={{ fontSize: '1.8rem', marginBottom: '0.75rem', color: '#222' }}>{product.name}</h2>
                <Tag 
                    value={`מק"ט: ${product.code}`} 
                    severity="info" 
                    className="mb-3" 
                    style={{ backgroundColor: '#e0e0e0', color: '#333', borderRadius: '4px', padding: '0.3rem 0.6rem' }}
                />
                <Divider />
                <p style={{ fontSize: '1.2rem', margin: '1rem 0', color: '#555' }}>
                    מחיר: <strong style={{ color: '#C89A42' }}>{product.price} ₪</strong>
                </p>
                <AddShoppingCard product={product} />
            </div>

            <div 
                style={{
                    flex: '0 0 40%',
                    maxWidth: '400px',
                    minWidth: '280px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    border: '1px solid #e0e0e0',
                    backgroundColor: '#fff',
                }}
            >
                <img 
                    src={`http://localhost:1004/uploads/${product.image}`} 
                    alt={product.name} 
                    style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '10px' }} 
                />
            </div>
        </div>
    );
};

export default SingleProduct;
