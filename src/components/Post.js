import React, {useEffect, useState} from 'react'
import API, { endpoints } from '../API'

const Post = ({post, user, onFilter, onUpdate}) => {
    const [price, setPrice] = useState(null)
    const [auctions, setAuctions] = useState([])
    const [selectedPost, setSelectedPost] = useState({})
    const [toggle, setToggle] = useState(false)
    const [info, setInfo] = useState({})
    const [edit, setEdit] = useState("")
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
            console.log(error.response)
        }
    }
    const handleEditModal = (post) => {
        if (post.creator) {
            setEdit('post')

        } else {
            setEdit('auction')
        }
        setSelectedPost(post)
        handleToggle()
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

   

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token')
            const data = new FormData()
            for (let k in info) {
                data.append(k, info[k])
            }
            const response = await API.patch(`${endpoints['auction']}${selectedPost.id}/`, data , {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            })
         
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
           
            setInfo({})
            setAuctions(auctions.filter(auc => auc.id !== auct.id))
        } catch (error) {
            console.log(error.response)
        }
    }
    const handleUserUpdate = async () => {
        try {
            const token = localStorage.getItem('token')
            const data = new FormData()
            for (let k in info) {
                data.append(k, info[k])
            }
            const response = await API.patch(`${endpoints['post']}${selectedPost.id}/`,data, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(response)
            onUpdate(response.data)
            handleToggle()
            setInfo({})
            
        } catch (error) {
            console.log(error)
        }
    }
    const handleUserDelete = async (post) => {
        try {
            const token = localStorage.getItem('token')
            const response = await API.delete(`${endpoints['post']}${post.id}/`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            onFilter(post)
            setInfo({})
         
        } catch (error) {
            console.log(error.response)
        }
    }
    const getPostAuction = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await API.get(`${endpoints["post"]}${post.id}/show-auction/`, {
                headers: {
                    // "Content-type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                  },
            })
            setAuctions(response.data)
       
        } catch (error) {
            console.log(error.response)
        }
    }
    const createOrder = async (auction) => {
    
        const token = localStorage.getItem('token')
        
        try {
          await API.patch(`${endpoints["auction"]}${auction}/confirm-auction/`,{}, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            try {
                await API.post(`${endpoints["post"]}${post.id}/create-order/`,{}, {
                    headers: {
                       
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                })
                alert('Tạo đơn hàng thành công !')
                onFilter(post)
                try {
                    await API.post(`${endpoints["post"]}${post.id}/hide-post/`,{}, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Authorization": `Bearer ${token}`
                        }
                    })
                } catch (error) {
                    console.log(error.response)
                }
            } catch (error) {
                console.log(error.response)
            }
            
        } catch (error) {
            console.log(error.response)
        }

      
      
    }
    useEffect(() => {
        getPostAuction()
    }, [])
    return (
        <div  className=" mb-8 border-[1px] border-gray-300 border-black p-4 rounded-lg">
                            <div key={post.id} className="border-[1px] border-gray-300 p-2 mb-4 rounded-lg mr-4 flex justify-between">
                               <div>
                                    <p className="text-2xl font-semibold mb-4">Người tạo: <span className="text-2xl font-normal">{post.creator.username}</span></p>
                                    <p className="text-2xl font-semibold mb-4">Địa chỉ lấy hàng: {post.pickup_address}</p>
                                    <p className="text-2xl font-semibold mb-4">Địa chỉ giao hàng: {post.ship_address}</p>
                                    <p className="text-2xl font-semibold mb-4">Loại hàng: {post.product_cate?.name}</p>
                                    <p className="text-2xl font-semibold mb-4">Dịch vụ: {post.service_cate?.name}</p>
                                    <p className="text-2xl font-semibold mb-4">Nội dung: {post.content}</p>
                               </div>
                              {
                                  !user.is_shipper &&   <>
                                                             <div>
                                                                <button className="bg-[#f26522] p-2 text-white font-medium text-2xl mr-4" onClick={() => handleEditModal(post)}>Sửa</button>
                                                                <button className="bg-[#f26522] p-2 text-white font-medium text-2xl" onClick={() => handleUserDelete(post)}>Xóa</button>
                                                            </div>
                                                        </>
                              }
                            </div>
                            {user?.is_shipper ? <p className="text-2xl font-semibold mb-4">Nhập giá</p> : <p className="text-2xl font-semibold">Danh sách đấu giá</p>}
                            {user?.is_shipper ? <>
                                                    <div>
                                                    {
                                                        auctions.filter(au => au.shipper.id === user.id).map(au => (
                                                        <div className="flex items-center justify-around text-xl">
                                                            <div className="flex">
                                                                <div className="w-[35px] overflow-hidden rounded-[50%] mr-4">
                                                                    <img src={user.avatar} alt='avatar' />
                                                                </div>
                                                               <div>
                                                                     <p>Tên shipper: {au.shipper.username}</p>
                                                                    <p>Giá: {au.ship_cost}</p>
                                                                    <p>Ngày: {new Date(au.updated_date).toLocaleString()}</p>
                                                               </div>
                                                            </div>
                                                            <div>
                                                                <button className="bg-[#f26522] p-2 text-white font-medium mr-4" onClick={() => handleEditModal(au)}>Sửa</button>
                                                                <button className="bg-[#f26522] p-2 text-white font-medium" onClick={() => handleDelete(au)}>xóa</button>
                                                            </div>
                                                        </div>))
                                                    }
                                                    </div>
                                                   {
                                                       auctions.filter(au => au.shipper.id === user.id).length !== 0 ?
                                                       <p className="text-2xl text-center font-medium">Bạn đã đấu giá</p>
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
                                                            <div className="flex">
                                                                <div className="w-[35px] overflow-hidden rounded-full  mr-4">
                                                                    <img src={`http://127.0.0.1:8000${au.shipper.avatar}`} alt='avatar' />
                                                                </div>
                                                                <div>
                                                                    <p>{au.shipper.username}</p>
                                                                    <p>{au.ship_cost}</p>
                                                                    <p>{new Date(au.updated_date).toLocaleString()}</p>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <button className="bg-[#f26522] p-2 text-white font-medium" onClick={() => createOrder(au.id)}>Chọn</button>
                                                            </div>
                                                        </div>))
                                                    }
                                                </div>
                                            }
                                         {
                                             (toggle && edit === 'auction') &&    <>
                                             <div className="z-[52] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[1px] rounded-lg bg-white p-4 w-[600px]">
                                                 <h1 className="text-2xl text-center font-bold">Cập nhật đấu giá</h1>
                                                 <div className="text-center my-3">
                                                                         <div>
                                                                            <label className="text-xl font-semibold my-4">Phí ship</label>
                                                                            <input className="text-xl border-[1px] border-black p-4" defaultValue={selectedPost.ship_cost}  name="ship_cost" onChange={handleChange} />
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
                                         {
                                             (toggle && edit === 'post') &&    <>
                                             <div className="z-[52] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[1px] rounded-lg bg-white p-4 w-[600px]">
                                                <h1 className="text-2xl text-center font-bold">Cập nhật bài đăng</h1>
                                                <div className="flex justify-around">
                                                    <div className="flex flex-col">
                                                        <label className="text-xl font-semibold my-4">Địa chỉ lấy hàng</label>
                                                        <input className="text-xl border-[1px] border-black p-4" defaultValue={selectedPost.pickup_address} name="pickup_address" onChange={handleChange} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="text-xl font-semibold my-4">Địa chỉ giao hàng</label>
                                                        <input className="text-xl border-[1px] border-black p-4" defaultValue={selectedPost.ship_address} name="ship_address" onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                        <label className="text-xl font-semibold my-4">Nội dung</label>
                                                        <input className="text-xl border-[1px] border-black p-4" defaultValue={selectedPost.content} name="content" onChange={handleChange} />
                                                    </div>
                                                 <div className="flex justify-around mt-8">
                                                     <button className="p-4 text-xl font-medium text-[#f26522] border-2 border-[#f26522]" onClick={handleToggle}>Hủy</button>
                                                     <button className="p-4 text-xl font-medium text-white bg-[#f26522]" onClick={handleUserUpdate}>Xác nhận</button>
                                                 </div>
                                             </div>
                                             <div className="fixed top-0 left-0 w-full h-full z-30 bg-black opacity-75"></div>
                                         </>
                                         }
        </div>
    )
}

export default Post
