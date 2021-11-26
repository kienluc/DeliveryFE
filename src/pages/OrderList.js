
import React, { useEffect, useState } from 'react'
import API, {endpoints} from '../API'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import Order from '../components/Order'

const OrderList = () => {
    const currentUser = useSelector(state => state.userLogin.userInfo)
    const [orders, setOrders] = useState([])
   
    
    const getOrders = async () => {
        try {
            const token = localStorage.getItem('token')

            const response = await API.get(endpoints['orders'], {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setOrders(response.data)
            
        } catch (error) {
            
        }
    }
    const updateOrder = (order) => {
        setOrders(orders.map(ord => ord.id === order.id ? order : ord))
    }
    useEffect(() => {
        getOrders()
    }, [])
    return (
        <div className="max-w-[1100px] mx-auto">
            <Navbar />
                <h1 className="font-bold text-2xl text-white bg-[#F26522] w-[fit-content] px-4 py-2 rounded-md mb-8">Danh sách đơn hàng</h1>
            <div>
                <table>
                    <thead className="border-t-[2px] border-b-[2px] border-black">
                        <tr>
                            <th className="w-[60px] text-xl border-[1px] p-2 border-black">Order ID</th>
                            <th className="w-[80px] text-xl border-[1px] p-2 border-black">Khách hàng</th>
                            <th className="w-[80px] text-xl border-[1px] p-2 border-black">Địa chỉ lấy hàng</th>
                            <th className="w-[80px] text-xl border-[1px] p-2 border-black">Địa chỉ giao hàng</th>
                            
                            <th className="w-[80px] text-xl border-[1px] p-2 border-black">Loại hàng</th>
                            <th className="w-[80px] text-xl border-[1px] p-2 border-black">Dịch vụ</th>
                            <th className="w-[80px] text-xl border-[1px] p-2 border-black">Tổng</th>
                            <th className="w-[80px] text-xl border-[1px] p-2 border-black">Thanh toán</th>
                            <th className="w-[80px] text-xl border-[1px] p-2 border-black">Trạng thái</th>
                            <th className="w-[80px] text-xl border-[1px] p-2 border-black">Shipper</th>
                            <th className="w-[80px] text-xl border-[1px] p-2 border-black"></th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                           orders.map((order, index) => (
                              
                                   <Order order={order} currentUser={currentUser} updateOrder={updateOrder} index={index}/>  
                                                 
                           ))
                       }
                    </tbody>
                </table>
            </div>
       
        </div>
    )
}

export default OrderList
