import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import API, {endpoints} from '../API'
const OrderPage = () => {
    const [order, setOrder] = useState({})
    const [receiver, setReceiver] = useState({})
    const [shippers, setShippers] = useState([])
    const [services, setServices] = useState([])
    const [categories, setCategories] = useState([])
    const currentUser = useSelector(state => state.userLogin.userInfo)
    const getShippers = async () => {
        const response = await API.get(endpoints["shipperRegister"])
        setShippers(response.data.results)
    }
    const getServicesAndCategories = async () => {
        const response = await API.get(endpoints["category"])
        const response2 = await API.get(endpoints["service"])
        setServices(response2.data.results)
        setCategories(response.data.results)
     
    }
    const handleChange = (event) => {
        if (event.target.name === 'product_cate' || event.target.name === 'service_cate' || event.target.name === 'pay_method') {
            const toInt = parseInt(event.target.value)
            setOrder({
                ...order,
                [event.target.name]: toInt,
                total_price: Math.ceil(Math.random() * 100000)
            })
        } else {
            setOrder({
                ...order,
                [event.target.name]: event.target.value,
                total_price: Math.ceil(Math.random() * 100000)
            })
        }
       
    }
    const handleReceiverChange = (event) => {
        setReceiver({
            ...receiver,
            [event.target.name]: event.target.value
        })
    }
    const createOrder = async (event) => {
     
        event.preventDefault()
        const shipper = shippers[Math.floor(Math.random()*shippers.length)];
        
        const token = localStorage.getItem('token')
        try {
            const data = new FormData()
            for (let k in order) {
                data.append(k, order[k])
            }
            data.append('customer', currentUser.id)
            data.append('shipper', shipper.id)
            const response = await API.post(endpoints["orders"], data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                  },
            })
            const response2 = await API.post(endpoints["orderDetail"], {
                order: response.data.id,
                ...receiver
            })
            console.log(response2)
            
        } catch (error) {
            console.log(error.response)
        }

    }
    useEffect(() => {
        getShippers()
        getServicesAndCategories()
    }, [])
    return (
        <div className="order-page">
            <Navbar />
            <form className="order-form">
                <div className="order-item">
                    <label>Tên khách hàng</label>
                    <input className="order-input" placeholder="Nhập họ tên" name="customer_received" onChange={handleReceiverChange} />
                </div>
                <div className="order-item">
                    <label>Số điện thoại</label>
                    <input className="order-input" placeholder="Nhập số điện thoại" name="phone" onChange={handleReceiverChange} />
                </div>
                <div className="order-item">
                    <label>Địa chỉ nhận hàng</label>
                    <input className="order-input" placeholder="Nhập địa chỉ" name="pickup_address"  onChange={handleChange}/>
                </div>
                <div className="order-item">
                    <label>Địa chỉ giao hàng</label>
                    <input className="order-input" placeholder="Nhập địa chỉ" name="ship_address"  onChange={handleChange}/>
                </div>
                <div className="order-item">
                    <label>Loại hàng hóa</label>
                    <select className="payment" name="product_cate" onChange={handleChange}>
                           {
                                categories.map(cate => (<option value={cate.id}>{cate.name}</option>))
                           }
                    </select>
                </div>
                <div className="order-item">
                    <label>Loại dịch vụ</label>
                    <select className="payment" name="service_cate" onChange={handleChange}>
                            {
                                services.map(ser => (<option value={ser.id}>{ser.name}</option>))
                            }
                    </select>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '2rem 0'}}>
                    
                    <div className="payment-method">
                        <label>Thanh toán</label>
                        <select className="payment" name="pay_method" onChange={handleChange}>
                            <option value={0}>Zalo</option>
                            <option value={1}>Momo</option>
                            <option value={2}>Thanh toán khi giao hàng</option>
                        </select>
                    </div>
                </div>
                <button onClick={createOrder}>Xác nhận</button>
            </form>
        </div>
    )
}

export default OrderPage
