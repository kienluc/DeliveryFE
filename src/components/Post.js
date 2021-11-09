import React, {useEffect, useState} from 'react'
import API, { endpoints } from '../API'

const Post = ({post, user}) => {
    const [price, setPrice] = useState(null)
    const [auctions, setAuctions] = useState([])
    const [selectedAuction, setSelectedAuction] = useState({})
    const [toggle, setToggle] = useState(false)
    const [info, setInfo] = useState({})

    const createAuction = async () => {
        try {
            const token = localStorage.getItem('token')
            const data = new FormData()
         
            data.append('ship_cost', price)

           const response = await API.post(`${endpoints["post"]}${post.id}/add-auction/`, data, {
                headers: {
                    "Content-type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                  },
            } )
            setAuctions([
                ...auctions,
                response.data
            ])
        } catch (error) {
            console.log(error)
        }
    }

    const handleToggle = () => {
        setToggle(!toggle)
    }

    const handleChange = (event) => {
       

            setInfo({
                ...info,
                [event.target.name]: event.target.value
            })
        
    }

    const handleSelect = (auction) => {
        setSelectedAuction(auction)
        handleToggle()
    }

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token')
            const data = new FormData()
            for (let k in info) {
                data.append(k, info[k])
            }
            const response = await API.patch(`${endpoints['auction']}${selectedAuction.id}/`, data , {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(response)
            handleToggle()
            setInfo({})
            setAuctions(auctions.map(auc => auc.id === response.data.id ? response.data : auc))
        } catch (error) {
            console.log(error.response)
        }
    }

    const handleDelete = async (auct) => {
        try {
            const token = localStorage.getItem('token')
            const response = await API.delete(`${endpoints['auction']}${auct.id}/`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(response)
            setInfo({})
            setAuctions(auctions.filter(auc => auc.id !== auct.id))
        } catch (error) {
            console.log(error.response)
        }
    }
    const getPostAuction = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await API.get(`${endpoints["post"]}${post.id}/show-auction/`, {
                headers: {
                    "Content-type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                  },
            })
            setAuctions(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error.response)
        }
    }
    const createOrder = async (auction) => {
        const token = localStorage.getItem('token')
        try {
           await API.post(`${endpoints["auction"]}${auction}/confirm-auction/`, {}, {
                headers: {
                    "Content-type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            })
            try {
                await API.post(`${endpoints["post"]}${post.id}/create-order/`, {}, {
                    headers: {
                        "Content-type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                })
            
            } catch (error) {
                console.log(error)
            }
            
        } catch (error) {
            console.log(error.response)
        }
        try {
            await API.post(`${endpoints["post"]}${post.id}/hide-post/`, {}, {
                headers: {
                    "Content-type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error.response)
        }
    }
    useEffect(() => {
        getPostAuction()
    }, [])
    return (
        <div  className=" mb-4">
                            <div key={post.id} className="border-[1px] border-gray-300 p-2 mb-4 rounded-lg mr-4">
                                <p className="text-xl font-semibold">Người tạo: <span className="text-xl font-normal">{post.creator.username}</span></p>
                                <p className="text-xl font-semibold">Địa chỉ lấy hàng: {post.pickup_address}</p>
                                <p className="text-xl font-semibold">Địa chỉ giao hàng: {post.ship_address}</p>
                                <p className="text-xl font-semibold">Loại hàng: {post.product_cate?.name}</p>
                                <p className="text-xl font-semibold">Dịch vụ: {post.service_cate?.name}</p>
                                <p className="text-xl font-semibold">Nội dung: {post.content}</p>
                            </div>
                            {user?.is_shipper ? <p className="text-2xl font-semibold">Nhập giá</p> : <p className="text-2xl font-semibold">Danh sách đấu giá</p>}
                            {user?.is_shipper ? <>
                                                    <div>
                                                    {
                                                        auctions.filter(au => au.shipper.id === user.id).map(au => (
                                                        <div className="flex items-center justify-around text-xl">
                                                            <div>
                                                                <p>{au.shipper.username}</p>
                                                                <p>{au.ship_cost}</p>
                                                                <p>{au.updated_date}</p>
                                                            </div>
                                                            <div>
                                                                <button className="bg-[#f26522] p-2 text-white font-medium mr-4" onClick={() => handleSelect(au)}>Sửa</button>
                                                                <button className="bg-[#f26522] p-2 text-white font-medium" onClick={() => handleDelete(au)}>xóa</button>
                                                            </div>
                                                        </div>))
                                                    }
                                                    </div>
                                                   {
                                                       auctions.filter(au => au.shipper.id === user.id).length !== 0 ?
                                                       <p className="text-xl text-center font-medium">ban da dau gia</p>
                                                       :
                                                       <>
                                                            <div className="flex w-full bg-gray-200 p-4">
                                                       <div className="flex items-center mr-4">
                                                           <div className="w-[50px] rounded-full overflow-hidden mr-4">
                                                               <img src={user.avatar} alt="avatar" className="w-full" />
                                                           </div>
                                                           <p className="font-medium text-xl">{user.username}</p>
                                                       </div>
                                                       <input className="flex-1 h-[30px] text-xl" type="number" onChange={(event) => setPrice(parseInt(event.target.value))} />
                                                   </div>
                                                   <button className="p-4 bg-black text-white font-semibold block ml-auto" onClick={createAuction}>Đăng</button>
                                                       </>
                                                   }
                                                </>
                                                :
                                                <div>
                                                    {
                                                        auctions.map(au => (
                                                        <div className="flex items-center justify-around text-xl">
                                                            <div>
                                                                <p>{au.shipper.username}</p>
                                                                <p>{au.ship_cost}</p>
                                                                <p>{au.updated_date}</p>
                                                            </div>
                                                            <div>
                                                                <button className="bg-[#f26522] p-2 text-white font-medium" onClick={() => createOrder(au.id)}>Chọn</button>
                                                            </div>
                                                        </div>))
                                                    }
                                                </div>
                                            }
                                         {
                                             toggle &&    <>
                                             <div className="z-[52] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[1px] rounded-lg bg-white p-4 w-[600px]">
                                                 <h1 className="text-2xl text-center font-bold">Cập nhật đơn hàng</h1>
                                                 <div className="text-center my-3">
                                                                         <div>
                                                                            <label className="text-xl font-semibold my-4">Phí ship</label>
                                                                            <input className="text-xl border-[1px] border-black p-4" defaultValue={selectedAuction.ship_cost}  name="ship_cost" onChange={handleChange} />
                                                                         </div>
                                                 </div>
                                                 <div className="flex justify-around mt-8">
                                                     <button className="p-4 text-xl font-medium text-[#f26522] border-2 border-[#f26522]" onClick={handleToggle}>Hủy</button>
                                                     <button className="p-4 text-xl font-medium text-white bg-[#f26522]" onClick={handleUpdate}>Xác nhận</button>
                                                 </div>
                                             </div>
                                             <div className="fixed top-0 left-0 w-full h-full z-30 bg-black opacity-75"></div>
                                         </>
                                         }
        </div>
    )
}

export default Post
