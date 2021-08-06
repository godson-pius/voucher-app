import React, { useState, useEffect } from 'react'
import { db } from '../firebase'

export default function Admin() {

    const [vouchers, setVouchers] = useState('')
    const [code, setCode] = useState('')
    const [discount, setDiscount] = useState('')
    
    const initValues = {
        vCode: code,
        vDiscount: discount,
        vStatus: 0
    }

    //= Getting vouchers from db
    useEffect(() => {
        db.child('vouchers').on('value',  snapshot => {
            if (snapshot.val() != null) {
                setVouchers({
                    ...snapshot.val()
                })
            }
        })

    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        //= Generate voucher
        const hex = '0123456789ABCDEF';
        let output = '';
        const len = 6;
        for (let i = 0; i < len; ++i) {
            output += hex.charAt(Math.floor(Math.random() * hex.length));
        }
        initValues.vCode = output;

        //= Pushing to db
        db.child('vouchers').push(
            initValues, err => {
                if (!err) {
                    alert('Voucher generated')
                } else {
                    alert('Failed to generate Voucher')
                }
            }
        )
    }
    
    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className="container mt-3">
                <h2 className="display-5 text-center bg-primary p-3 text-light rounded">Generate Voucher</h2> <hr />
                <div className="card shadow">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div class="form-group">
                                <label for="discount">Voucher discount %</label>
                                <input id="discount" value={discount} className="form-control" type="number" onChange={e => setDiscount(e.target.value)} required />

                                <div class="form-group">
                                    <input type="submit" className="btn btn-secondary w-100 mt-2" value="Generate"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="d-flex">
                    <h3 className="display-6 text-primary mt-3">Generated Vouchers.......</h3>
                    <div><a href="/users" className="btn btn-warning btn-sm mt-4">Switch</a></div>
                </div>
                <hr />
                <p className="lead text-dark">Those in red have been used</p>

                <div className="row">
                    {
                        Object.keys(vouchers).map(id => {
                            return <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Voucher Code: {vouchers[id].vCode}</h5>
                                <p className="card-text">Discount: { vouchers[id].vDiscount }%</p> <hr />
                                <p className="card-text">Status: { vouchers[id].vStatus }</p>
                            </div>
                        </div>
                    </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
