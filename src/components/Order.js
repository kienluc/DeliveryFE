import React, {useState} from 'react'
import StarRatings from 'react-star-ratings';
import API, {endpoints} from '../API'
const Order = ({order, currentUser, updateOrder, index}) => {
    const [toggle, setToggle] = useState(false)
    const [modal, setModal] = useState("")
    const [error, setError] = useState(null)
    const [selectedOrder, setSelectedOrder] = useState({})
    const [info, setInfo] = useState({})
    const [rating, setRating] = useState(5);
    const handleToggle = () => {
        setToggle(!toggle)
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
    const changeRating = (newRating) => {
        setRating(newRating)
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
            
            handleToggle()
            setInfo({})
            updateOrder(response.data)
        } catch (error) {
            
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
            updateOrder(response.data)
            alert('Cập nhật trạng thái giao hàng thành công !')
            
            handleToggle()
            setInfo({})
          
        } catch (error) {
            
        }
    }
    const handleRatingModal = (order) => {
        setSelectedOrder(order)
        setModal('rating')
        handleToggle()
    }
    const handleRating = async () => {
        try {
            const token = localStorage.getItem('token')
            const data = new FormData()
            data.append('order_id', selectedOrder.id)
            data.append('content', 'ok')
            data.append('rate', rating)
            const response = await API.post(`${endpoints['rating']}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            })
            setError(null)
            handleToggle()
        } catch (error) {
            setError(error.response.data[0])
        }
    }
    return (
      <>
              <tr className={"mb-4 " + index && index % 2 === 0 ? "" : "bg-gray-200"}>
                                <td className="text-center text-xl border-[1px] p-2 py-4">{order.id}</td>
                                <td className="text-center text-xl border-[1px] p-2 py-4">{order.customer.username}</td>
                                <td className="text-center text-xl border-[1px] p-2 py-4">{order.pickup_address}</td>
                                <td className="text-center text-xl border-[1px] p-2 py-4">{order.ship_address}</td>
                                <td className="text-center text-xl border-[1px] p-2 py-4">{order.product_cate?.name}</td>
                                <td className="text-center text-xl border-[1px] p-2 py-4">{order.service_cate?.name}</td>
                                <td className="text-center text-xl border-[1px] p-2 py-4">{order.total_price}</td>
                                <td className="text-center text-xl border-[1px] p-2 py-4">{order.pay_method}</td>
                                <td className="text-center text-xl border-[1px] p-2 py-4 font-medium">{order.status}</td>
                                <td className="text-center text-xl border-[1px] p-2 py-4">{order.shipper.username}</td>
                                {
                                    (order.status === 'ĐÃ GIAO' &&  !currentUser.is_shipper) &&
                                    <td className="text-center text-xl border-[1px] p-2 py-4"><button className="bg-[#f26522] text-white px-2 py-2 font-medium" onClick={() => handleRatingModal(order)}>Đánh giá</button></td>                                    
                                }
                                {
                                    (order.status !== 'ĐÃ GIAO') &&
                                    <td className="text-center text-xl border-[1px] p-2 py-4"><button className="bg-[#f26522] text-white px-2  py-2 font-medium" onClick={() => handleSelect(order)}>Cập nhật</button></td>
                                }
                                {
                                    order.status === 'ĐÃ GIAO' && currentUser.is_shipper  && null  
                                    
                                }
                </tr>
                            {
              ((toggle && !currentUser.is_shipper) && modal !== 'rating') && <>
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
             {
              ((toggle && !currentUser.is_shipper) && modal === 'rating') && <>
              
                <div className="z-[52] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[1px] rounded-lg bg-white p-4 w-[600px]">
                {
                  error && <p className="bg-red-500 w-full text-white font-medium text-2xl text-center mb-1 py-2 rounded-mdr">Bạn đã đánh giá shipper này.</p>
                }
                    <h1 className="text-2xl text-center font-bold">Đánh giá</h1>
                    <div className="text-center">
                    <StarRatings
                        changeRating={changeRating}
                        starRatedColor="#F7DD7C"
                        numberOfStars={5}
                        name='rating'
                        rating={rating}
                        starDimension="25px"
                        starSpacing="2px"
                    />
                    </div>
                    <div className="flex justify-around mt-8">
                        <button className="p-4 text-xl font-medium text-[#f26522] border-2 border-[#f26522]" onClick={handleToggle}>Hủy</button>
                        <button className="p-4 text-xl font-medium text-white bg-[#f26522]" onClick={handleRating}>Xác nhận</button>
                    </div>
                </div>
                <div className="fixed top-0 left-0 w-full h-full z-30 bg-black opacity-75"></div>
             </>
          }
            
      </>
    )
}

export default Order
