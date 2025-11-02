
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import Axios from "axios";
const Maneger = () => {
    let emptyProduct = {
        id: null,
        name: '',
        image: null,
        category: null,
        price: 0,
        codeProduct: '',
        rating: 0,
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [isNewProduct, setIsNewProduct] = useState(false);

    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        fetchData()
    }, []);
    const fetchData = async () => {
        const { data } = await Axios.get("http://localhost:1004/api/product");
        setProducts(data);
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };


    const openNew = () => {
        setProduct(emptyProduct);
        setIsNewProduct(true);
        setSubmitted(false);
        setProductDialog(true);
    };

    const editProduct = (prod) => {
        setProduct({
            ...prod,
            codeProduct: prod.code
        });
        setIsNewProduct(false);
        setProductDialog(true);
    };


    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const saveProduct = async () => {
        setSubmitted(true);

        if (
            product.name?.trim() &&
            (isNewProduct ? product.codeProduct?.trim() : true) &&
            product.category &&
            product.price > 0
        ) {
            try {
                if (product._id) {
                    await Axios.put("http://localhost:1004/api/product", {
                        name: product.name,
                        price: product.price,
                        category: product.category,
                        code: product.codeProduct,
                        image: product.image
                    });
                    toast.current.show({ severity: 'success', summary: 'עודכן', detail: 'המוצר עודכן בהצלחה', life: 3000 });
                    const { data: data1 } = await Axios.get("http://localhost:1004/api/product");

                    let findId;

                    for (let index = 0; index < data1.length; index++) {
                        if (data1[index].code === product.codeProduct) {
                            findId = data1[index]._id;
                            break;
                        }
                    }

                    const token = localStorage.getItem("userNow");
                    if (!token) {
                        return;
                    }

                    const { data } = await Axios.get("http://localhost:1004/api/shoppingCard", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    for (let index = 0; index < data.length; index++) {
                        if (data[index].codeProduct === findId) {
                            await Axios.put(
                                "http://localhost:1004/api/shoppingCard/sc",
                                {
                                    codeProduct: findId,
                                    price: product.price,
                                    category: product.category,
                                    name: product.name,
                                    image: product.image
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                }
                            );

                        }
                    }
                } else {
                    await Axios.post("http://localhost:1004/api/product", {
                        name: product.name,
                        price: product.price,
                        category: product.category,
                        code: product.codeProduct,
                        image: product.image || "product-placeholder.svg"
                    });
                    toast.current.show({ severity: 'success', summary: 'נוסף', detail: 'המוצר נוסף בהצלחה', life: 3000 });
                }

                await fetchData();
                setProductDialog(false);
                setProduct(emptyProduct);
            } catch (error) {
                if (error.response?.status === 400) {
                    toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'המוצר קיים יש להחליף קוד', life: 3000 });
                }
                else
                    toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'לא ניתן לשמור את המוצר', life: 3000 });
            }
        }
    };



    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);

    };

    const deleteProduct = async () => {
        try {
            await Axios.delete(`http://localhost:1004/api/product/${product._id}`);
            toast.current.show({ severity: 'success', summary: 'נמחק', detail: 'המוצר נמחק בהצלחה', life: 3000 });

            await fetchData();
            setDeleteProductDialog(false);
            setProduct(emptyProduct);
        } catch (error) {
            console.error("שגיאה במחיקה:", error);
            toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'לא ניתן למחוק את המוצר', life: 3000 });
        }
    };

    

    const exportCSV = () => {
        dt.current.exportCSV();
    };

   

    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['category'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="הוספת מוצר" icon="pi pi-plus" severity="success" onClick={openNew} style={{backgroundColor:"#F8F9FA"}}/>
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="קובץ מוצרים להורדה" icon="pi pi-upload" className="p-button-help" style={{backgroundColor:"#F8F9FA"}} onClick={exportCSV} />;
    };

    const imageBodyTemplate = (rowData) => {
        return (
            <img
                src={`http://localhost:1004/uploads/${rowData.image}`}
                alt={rowData.image}
                className="shadow-2 border-round"
                style={{ width: '64px', height: '64px', objectFit: 'cover' }}
            />
        );
    };


    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };


    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">ניהול מוצרים</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="...חיפוש" />
            </IconField>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="ביטול" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="שמור" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="לא" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="כן" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );


    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                    <Column field="code" header="קוד מוצר" sortable  style={{ width: '12rem' }}></Column>
                    <Column field="name" header="שם מוצר" sortable  style={{ width: '12rem' }}></Column>
                    <Column field="image" header="תמונה" body={imageBodyTemplate}  style={{ width: '12rem' }}></Column>
                    <Column field="price" header="מחיר" body={priceBodyTemplate} sortable  style={{ width: '12rem' }}></Column>
                    <Column field="category" header="קטגוריה" sortable  style={{ width: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false}  style={{ width: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="פרטי מוצר" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && (
                    <img
                        src={`http://localhost:1004/uploads/${product.image}`}
                        alt={product.image}
                        className="product-image block m-auto pb-3"
                        style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                )}

                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        שם מוצר
                    </label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-error">יש להכניס שם מוצר</small>}
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">קטגוריה</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value="שוקולאב בר" onChange={onCategoryChange} checked={product.category === 'שוקולאב בר'} />
                            <label htmlFor="category1">שוקולאב בר</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="category" value="כלים ומפות" onChange={onCategoryChange} checked={product.category === 'כלים ומפות'} />
                            <label htmlFor="category2">כלים ומפות</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="category" value="מגשי פירות" onChange={onCategoryChange} checked={product.category === 'מגשי פירות'} />
                            <label htmlFor="category3">מגשי פירות</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="category" value="מארזי אירועים" onChange={onCategoryChange} checked={product.category === 'מארזי אירועים'} />
                            <label htmlFor="category4">מארזי אירועים</label>
                        </div>
                    </div>
                    {submitted && !product.category && (
                        <small className="p-error">יש לבחור קטגוריה</small>
                    )}

                </div>
                <div className="field">
                    <label htmlFor="image" className="font-bold">
                        שם קובץ תמונה (כולל סיומת)
                    </label>
                    <InputText
                        id="image"
                        value={product.image || ''}
                        onChange={(e) => onInputChange(e, 'image')}
                        placeholder="למשל: myImage.jpg"
                    />
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            מחיר
                        </label>
                        <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="ILS" locale="he-IL" />
                        {submitted && !product.price && (
                            <small className="p-error">יש להזין מחיר</small>
                        )}
                    </div>


                    {isNewProduct && (
                        <div className="field col">
                            <label htmlFor="codeProduct" className="font-bold">
                                קוד מוצר
                            </label>
                            <InputText
                                id="codeProduct"
                                value={product.codeProduct}
                                onChange={(e) => onInputChange(e, 'codeProduct')}
                                required
                                className={classNames({ 'p-invalid': submitted && !product.codeProduct })}
                            />
                            {submitted && !product.codeProduct && (
                                <small className="p-error">יש להזין קוד מוצר</small>
                            )}
                        </div>
                    )}


                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            בטוח שאתה רוצה למחוק את המוצר <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

        </div>
    );
}
export default Maneger