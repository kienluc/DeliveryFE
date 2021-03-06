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
    const [isSuccess, setIsSuccess] = useState(null)
    const currentUser = useSelector(state => state.userLogin.userInfo)
    const getShippers = async () => {
        const response = await API.get(endpoints["shipperRegister"])
        setShippers(response.data)
    }
    const getServicesAndCategories = async () => {
        try {
            const response = await API.get(endpoints["category"])
            const response2 = await API.get(endpoints["service"])
            setServices(response2.data)
            setCategories(response.data)
        
        } catch (error) {
            
        }

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
           
            setIsSuccess(true)
        } catch (error) {
            setIsSuccess(false)
            
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
                {
                    isSuccess === true && <div className="bg-green-600 w-full text-white font-medium text-2xl text-center mb-1 py-2 rounded-md ">T???o ????n h??ng th??nh c??ng</div> 
                    
                }
                {
                    isSuccess === false && <div className="bg-red-500 w-full text-white font-medium text-2xl text-center mb-1 py-2 rounded-md ">C?? l???i x???y ra</div>
                }
                <div className="order-item">
                    <label>T??n kh??ch h??ng</label>
                    <input className="order-input" placeholder="Nh???p h??? t??n" name="customer_received" onChange={handleReceiverChange} />
                </div>
                <div className="order-item">
                    <label>S??? ??i???n tho???i</label>
                    <input className="order-input" placeholder="Nh???p s??? ??i???n tho???i" name="phone" onChange={handleReceiverChange} />
                </div>
                <div className="order-item">
                    <label>?????a ch??? nh???n h??ng</label>
                    <input className="order-input" placeholder="Nh???p ?????a ch???" name="pickup_address"  onChange={handleChange}/>
                </div>
                <div className="order-item">
                    <label>?????a ch??? giao h??ng</label>
                    <input className="order-input" placeholder="Nh???p ?????a ch???" name="ship_address"  onChange={handleChange}/>
                </div>
                
                <div className="order-item">
                    <label>Lo???i h??ng h??a</label>
                    <select name="product_cate" onChange={handleChange} defaultValue="1" className="w-full cursor-pointer text-xl border-[1px] border-gray-300 py-4 rounded-xl" required>
                        {
                            categories?.map(cate => (<option value={cate.id}>{cate.name}</option>))
                        }
                    </select>
                </div>
                <div className="order-item">
                    <label>D???ch v???</label>
                    <select name="service_cate" onChange={handleChange} defaultValue="1" className="w-full cursor-pointer text-xl border-[1px] border-gray-300 py-4 rounded-xl" required>
                        {
                            services?.map(ser => (<option value={ser.id}>{ser.name}</option>))
                        }
                    </select>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '2rem 0'}}>
                    
                    
                        <div className="order-item">
                        <label>Lo???i h??ng h??a</label>
                        <select name="pay_method" onChange={handleChange} defaultValue="2" className="w-full cursor-pointer text-xl border-[1px] border-gray-300 py-4 rounded-xl" required>
                        <option value={0}>Zalo</option>
                            <option value={1}>Momo</option>
                            <option value={2}>Thanh to??n khi giao h??ng</option>
                        </select>
                    </div>
                </div>
                <button onClick={createOrder}>X??c nh???n</button>
            </form>
        </div>
    )
}

export default OrderPage
