import React, { useState, useEffect } from 'react'
import { db } from '../firebase'

export default function Users() {

    const [vouchers, setVouchers] = useState('')
    const [used, setUsed] = useState('')

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

    //= Using voucher
    const useVoucher = (e) => {
        const id = e.target.value
        e.target.setAttribute('disabled', 'true')

        setTimeout(() => {
            db.child(`vouchers/${id}`).remove(err => {
            if (err) {
                alert('Oops! Failed, try again')
            } else {
                alert('Hooray!! \nSuccessfully used voucher')
            }
        })
        }, 3000);
    }

    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className="container mt-3">
                <h2 className="display-5 text-center bg-primary p-3 text-light rounded">Generated Voucher</h2> <hr />
                
                <a href="/admin" className="btn btn-success btn-sm mt-4">Switch</a>
                <hr />
                <p className="lead text-dark">Those in red have been used</p>

                <div className="row">
                    {
                        Object.keys(vouchers).map(id => {

                            return <div className="col-4">
                        <div className="card" key={id}>
                            <div className="card-body">
                                <h5 className="card-title">Voucher Code: {vouchers[id].vCode}</h5>
                                <p className="card-text">Discount: { vouchers[id].vDiscount }%</p> <hr />
                                <button onClick={useVoucher} className="btn btn-primary btn-sm" value={id}>Use Voucher</button>
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
