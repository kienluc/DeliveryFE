import React from 'react'
import Navbar from '../components/Navbar'
const OrderPage = () => {
    return (
        <div className="order-page">
            <Navbar />
            <form className="order-form">
                <div className="order-item">
                    <label>Tên khách hàng</label>
                    <input className="order-input" placeholder="Nhập họ tên" />
                </div>
                <div className="order-item">
                    <label>Số điện thoại</label>
                    <input className="order-input" placeholder="Nhập số điện thoại" />
                </div>
                <div className="order-item">
                    <label>Địa chỉ nhận hàng</label>
                    <input className="order-input" placeholder="Nhập địa chỉ" />
                </div>
                <div className="order-item">
                    <label>Địa chỉ giao hàng</label>
                    <input className="order-input" placeholder="Nhập địa chỉ" />
                </div>
                <div className="order-item">
                    <label>Loại hàng hóa</label>
                    <input className="order-input" placeholder="Nhập loại hàng hóa" />
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '2rem 0'}}>
                    <div className="checkbox">
                        <input className="order-input" type="checkbox" placeholder="Nhập loại hàng hóa" />
                        <label>Cho phép đấu giá</label>
                    </div>
                    <div className="payment-method">
                        <label className="bg-red-700">Thanh toán</label>
                        <select className="payment">
                            <option>Zalo</option>
                            <option>Momo</option>
                            <option>Thanh toán khi giao hàng</option>
                        </select>
                    </div>
                </div>
                <button>Xác nhận</button>
            </form>
        </div>
    )
}

export default OrderPage
