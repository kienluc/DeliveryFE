import React, {useEffect, useState} from 'react'
import API, { endpoints } from '../API'
import Spinner from './Spinner'
const Post = ({post, user, onFilter, onUpdate}) => {
    const [price, setPrice] = useState(null)
    const [auctions, setAuctions] = useState([])
    const [selectedPost, setSelectedPost] = useState({})
    const [toggle, setToggle] = useState(false)
    const [loading, setLoading] = useState(false)
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
            
        }
    }
    const createOrder = async (auction) => {
    
        const token = localStorage.getItem('token')
        setLoading(true)
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
                setLoading(false)
                alert('T???o ????n h??ng th??nh c??ng !')
                onFilter(post)
                try {
                    await API.post(`${endpoints["post"]}${post.id}/hide-post/`,{}, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    setLoading(false)
                } catch (error) {
                    setLoading(false)
                    
                }
            } catch (error) {
                setLoading(false)
                
            }
            
        } catch (error) {
            setLoading(false)
            
        }

      
    }
    useEffect(() => {
        getPostAuction()
    }, [])
    return (
        <div  className=" mb-8 border-[1px] border-gray-300 border-[#f26522] p-4 rounded-lg">
                            <div key={post.id} className="border-[1px] border-gray-300 p-2 mb-4 rounded-lg mr-4 flex justify-between">
                               <div className="p-2">
                                    <p className="text-2xl font-semibold mb-4">Ng?????i t???o: <span className="text-2xl font-normal">{post.creator.username}</span></p>
                                    <p className="text-2xl font-semibold mb-4">?????a ch??? l???y h??ng: {post.pickup_address}</p>
                                    <p className="text-2xl font-semibold mb-4">?????a ch??? giao h??ng: {post.ship_address}</p>
                                    <p className="text-2xl font-semibold mb-4">Lo???i h??ng: {post.product_cate?.name}</p>
                                    <p className="text-2xl font-semibold mb-4">D???ch v???: {post.service_cate?.name}</p>
                                    <p className="text-2xl font-semibold mb-4">N???i dung: {post.content}</p>
                               </div>
                              {
                                  !user.is_shipper &&   <>
                                                             <div>
                                                                <button className="bg-[#f26522] p-2 text-white font-medium text-2xl mr-4" onClick={() => handleEditModal(post)}>S???a</button>
                                                                <button className="bg-[#f26522] p-2 text-white font-medium text-2xl" onClick={() => handleUserDelete(post)}>X??a</button>
                                                            </div>
                                                        </>
                              }
                            </div>
                            {user?.is_shipper ? <p className="text-2xl font-semibold mb-4">Nh???p gi??</p> : <p className="text-2xl font-semibold text-white bg-[#f26522] p-2 rounded-md w-[fit-content]">Danh s??ch ?????u gi??</p>}
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
                                                                     <p>T??n shipper: {au.shipper.username}</p>
                                                                    <p>Gi??: {au.ship_cost}</p>
                                                                    <p>Ng??y: {new Date(au.updated_date).toLocaleString()}</p>
                                                               </div>
                                                            </div>
                                                            <div>
                                                                <button className="bg-[#f26522] p-2 text-white font-medium mr-4" onClick={() => handleEditModal(au)}>S???a</button>
                                                                <button className="bg-[#f26522] p-2 text-white font-medium" onClick={() => handleDelete(au)}>x??a</button>
                                                            </div>
                                                        </div>))
                                                    }
                                                    </div>
                                                   {
                                                       auctions.filter(au => au.shipper.id === user.id).length !== 0 ?
                                                       <p className="text-2xl text-center font-medium">B???n ???? ?????u gi??</p>
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
                                                   <button className="p-4 bg-black text-white font-semibold block ml-auto" onClick={createAuction}>????ng</button>
                                                       </>
                                                   }
                                                </>
                                                :
                                                <div>
                                                   {
                                                       auctions.length !== 0 
                                                       ?
                                                        auctions.map(au => (

                                                        <div className="flex items-center justify-around text-xl border-b-2">
                                                            <div className="flex">
                                                                <div className="w-[35px] overflow-hidden rounded-full  mr-4">
                                                                    <img src={`http://127.0.0.1:8000${au.shipper.avatar}`} alt='avatar' />
                                                                </div>
                                                                <div>
                                                                    <p className="mb-2 text-xl font-medium">Shipper: {au.shipper.username}</p>
                                                                    <p className="mb-2 text-xl font-medium">Ph??: {au.ship_cost}</p>
                                                                    <p className="mb-2 text-xl font-medium">Ng??y: {new Date(au.updated_date).toLocaleString()}</p>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <button className="bg-[#f26522] p-2 text-white font-medium" onClick={() => createOrder(au.id)}>{loading ? <Spinner /> : <p>Ch???n</p>}</button>
                                                            </div>
                                                        </div>))
                                                        :
                                                        <div className="text-center font-medium text-2xl">Ch??a c?? ?????u gi??</div>
                                                   }
                                                </div>
                                            }
                                         {
                                             (toggle && edit === 'auction') &&    <>
                                             <div className="z-[52] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[1px] rounded-lg bg-white p-4 w-[600px]">
                                                 <h1 className="text-2xl text-center font-bold">C???p nh???t ?????u gi??</h1>
                                                 <div className="text-center my-3">
                                                                         <div>
                                                                            <label className="text-xl font-semibold my-4">Ph?? ship</label>
                                                                            <input className="text-xl border-[1px] border-black p-4" defaultValue={selectedPost.ship_cost}  name="ship_cost" onChange={handleChange} />
                                                                         </div>
                                                 </div>
                                                 <div className="flex justify-around mt-8">
                                                     <button className="p-4 text-xl font-medium text-[#f26522] border-2 border-[#f26522]" onClick={handleToggle}>H???y</button>
                                                     <button className="p-4 text-xl font-medium text-white bg-[#f26522]" onClick={handleUpdate}>X??c nh???n</button>
                                                 </div>
                                             </div>
                                             <div className="fixed top-0 left-0 w-full h-full z-30 bg-black opacity-75"></div>
                                         </>
                                         }
                                         {
                                             (toggle && edit === 'post') &&    <>
                                             <div className="z-[52] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[1px] rounded-lg bg-white p-4 w-[600px]">
                                                <h1 className="text-2xl text-center font-bold">C???p nh???t b??i ????ng</h1>
                                                <div className="flex justify-around">
                                                    <div className="flex flex-col">
                                                        <label className="text-xl font-semibold my-4">?????a ch??? l???y h??ng</label>
                                                        <input className="text-xl border-[1px] border-black p-4" defaultValue={selectedPost.pickup_address} name="pickup_address" onChange={handleChange} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="text-xl font-semibold my-4">?????a ch??? giao h??ng</label>
                                                        <input className="text-xl border-[1px] border-black p-4" defaultValue={selectedPost.ship_address} name="ship_address" onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                        <label className="text-xl font-semibold my-4">N???i dung</label>
                                                        <input className="text-xl border-[1px] border-black p-4" defaultValue={selectedPost.content} name="content" onChange={handleChange} />
                                                    </div>
                                                 <div className="flex justify-around mt-8">
                                                     <button className="p-4 text-xl font-medium text-[#f26522] border-2 border-[#f26522]" onClick={handleToggle}>H???y</button>
                                                     <button className="p-4 text-xl font-medium text-white bg-[#f26522]" onClick={handleUserUpdate}>X??c nh???n</button>
                                                 </div>
                                             </div>
                                             <div className="fixed top-0 left-0 w-full h-full z-30 bg-black opacity-75"></div>
                                         </>
                                         }
        </div>
    )
}

export default Post
