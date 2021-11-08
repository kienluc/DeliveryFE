import React, {useEffect, useState} from 'react'
import API, { endpoints } from '../API'
import avatar from '../assets/images/partner1.png'
const Post = ({post, user}) => {
    const [price, setPrice] = useState(null)
    const [auctions, setAuctions] = useState([])
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
    
        } catch (error) {
            console.log(error)
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
                            {user.is_shipper ? <p className="text-2xl font-semibold">Nhập giá</p> : <p className="text-2xl font-semibold">Danh sách đấu giá</p>}
                            {user.is_shipper ? <>
                                <div className="flex w-full bg-gray-200 p-4">
                                <div className="flex items-center mr-4">
                                    <div className="w-[50px] rounded-full overflow-hidden mr-4">
                                        <img src={avatar} alt="avatar" className="w-full" />
                                    </div>
                                    <p className="font-medium text-xl">{user.username}</p>
                                </div>
                                <input className="flex-1 h-[30px] text-xl" type="number" onChange={(event) => setPrice(parseInt(event.target.value))} />
                            </div>
                            <button className="p-4 bg-black text-white font-semibold block ml-auto" onClick={createAuction}>Đăng</button>
                                                </>
                                                :
                                                <div>
                                                    {
                                                        auctions.map(au => (<div>
                                                            <p>{au.shipper.username}</p>
                                                            <p>{au.ship_cost}</p>
                                                            <p>{au.updated_date}</p>
                                                        </div>))
                                                    }
                                                </div>
                                            }
                        </div>
    )
}

export default Post
