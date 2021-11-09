

import React, { useEffect, useState } from 'react'
import API, {endpoints} from '../API'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
const OrderList = () => {
    const currentUser = useSelector(state => state.userLogin.userInfo)
    const [orders, setOrders] = useState([])
    const [toggle, setToggle] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState({})
    const [info, setInfo] = useState({})
    const handleToggle = () => {
        setToggle(!toggle)
    }
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
            console.log(error.response)
        }
    }
    const handleChange = (event) => {
        if (event.target.value.includes["0", "1", "2"]) {
            setInfo({
                status: event.target.value
            })
        } else {

            setInfo({
                ...info,
                [event.target.name]: event.target.value
            })
        }
    }
    const handleSelect = (order) => {
        setSelectedOrder(order)
        handleToggle()
    }
    const UserUpdate = async () => {
        try {
            const token = localStorage.getItem('token')
            const data = new FormData()
            for (let k in info) {
                data.append(k, info[k])
            }
            const response = await API.patch(`${endpoints['orders']}${selectedOrder.id}/`, data , {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(response)
            handleToggle()
            setInfo({})
            setOrders(orders.map(ord => ord.id === response.data.id ? response.data : ord))
        } catch (error) {
            console.log(error.response)
        }
    }
    const ShipperUpdate = async () => {
        try {
            const token = localStorage.getItem('token')
            const data = new FormData()
            data.append("status", info.status)
            const response = await API.patch(`${endpoints['orders']}${selectedOrder.id}/update-order/`, data , {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(response)
            handleToggle()
            setInfo({})
            setOrders(orders.map(ord => ord.id === response.data.id ? response.data : ord))
        } catch (error) {
            console.log(error.response)
        }
    }
    useEffect(() => {
        getOrders()
    }, [])
    return (
        <div className="max-w-[1100px] mx-auto">
            <Navbar />
                <h1 className="font-bold text-2xl">Danh sách đơn hàng</h1>
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
                            <th className="w-[80px] text-xl border-[1px] p-2 border-black"></th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                           orders.map(order => (
                            <tr className="mb-4">
                                <td className="text-center text-xl border-[1px] p-2 py-4">{order.id}</td>
                                <td className="text-center text-xl border-[1px] p-2 py-4">{order.customer.username}</td>
                                <td className="text-center text-xl border-[1px] p-2 py-4">{order.pickup_address}</td>
                                <td className="text-center text-xl border-[1px] p-2 py-4">{order.ship_address}</td>
                                <td className="text-center text-xl border-[1px] p-2 py-4">{order.product_cate?.name}</td>
                                <td className="text-center text-xl border-[1px] p-2 py-4">{order.service_cate?.name}</td>
                                <td className="text-center text-xl border-[1px] p-2 py-4">{order.total_price}</td>
                                <td className="text-center text-xl border-[1px] p-2 py-4">{order.pay_method}</td>
                                <td className="text-center text-xl border-[1px] p-2 py-4">{order.status}</td>
                                <td className="text-center text-xl border-[1px] p-2 py-4"><button onClick={() => handleSelect(order)}>Cập nhật</button></td>
                            </tr>
                           ))
                       }
                    </tbody>
                </table>
            </div>
          {
              (toggle && !currentUser.is_shipper) && <>
                            <div className="z-[52] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[1px] rounded-lg bg-white p-4 w-[600px]">
                                <h1 className="text-2xl text-center font-bold">Cập nhật đơn hàng</h1>
                                <div className="flex justify-around">
                                    <div className="flex flex-col">
                                        <label className="text-xl font-semibold my-4">Địa chỉ lấy hàng</label>
                                        <input className="text-xl border-[1px] border-black p-4" defaultValue={selectedOrder.pickup_address} name="pickup_address" onChange={handleChange} />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-xl font-semibold my-4">Địa chỉ giao hàng</label>
                                        <input className="text-xl border-[1px] border-black p-4" defaultValue={selectedOrder.ship_address} name="ship_address" onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="flex justify-around mt-8">
                                    <button className="p-4 text-xl font-medium text-[#f26522] border-2 border-[#f26522]" onClick={handleToggle}>Hủy</button>
                                    <button className="p-4 text-xl font-medium text-white bg-[#f26522]" onClick={UserUpdate}>Xác nhận</button>
                                </div>
                            </div>
                            <div className="fixed top-0 left-0 w-full h-full z-30 bg-black opacity-75"></div>
                        </>
          }
          {
              (toggle && currentUser.is_shipper) && <>
                <div className="z-[52] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[1px] rounded-lg bg-white p-4 w-[600px]">
                    <h1 className="text-2xl text-center font-bold">Cập nhật đơn hàng</h1>
                    <div className="text-center my-3">
                        <label className="font-medium text-2xl mr-4">Trạng thái</label>
                        <select className="text-xl" defaultValue={selectedOrder.status} name="status" onChange={handleChange}>
                            <option value="0">Chưa giao hàng</option>
                            <option value="1">Đang giao hàng</option>
                            <option value="2">Đã giao hàng</option>
                        </select>
                    </div>
                    <div className="flex justify-around mt-8">
                        <button className="p-4 text-xl font-medium text-[#f26522] border-2 border-[#f26522]" onClick={handleToggle}>Hủy</button>
                        <button className="p-4 text-xl font-medium text-white bg-[#f26522]" onClick={ShipperUpdate}>Xác nhận</button>
                    </div>
                </div>
                <div className="fixed top-0 left-0 w-full h-full z-30 bg-black opacity-75"></div>
             </>
          }
            
        </div>
    )
}

export default OrderList
