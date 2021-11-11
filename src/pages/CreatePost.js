import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import API, {endpoints} from '../API'
import { useSelector } from 'react-redux'

const Post = () => {
    const [services, setServices] = useState([])
    const [categories, setCategories] = useState([])
    const [post, setPost] = useState({})
    const [isSuccess, setIsSuccess] = useState(null)
    const currentUser = useSelector(state => state.userLogin.userInfo)

    const getServicesAndCategories = async () => {
        const response = await API.get(endpoints["category"])
        const response2 = await API.get(endpoints["service"])
        setCategories(response.data.results)
        setServices(response2.data.results)
    }
    const handleChange = (event) => {
        if (event.target.name === 'product_cate' || event.target.name === 'service_cate' || event.target.name === 'pay_method') {
            const toInt = parseInt(event.target.value)
            setPost({
                ...post,
                [event.target.name]: toInt
            })
        } else {
            setPost({
                ...post,
                [event.target.name]: event.target.value
            })
        }
       
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
     
        const token = localStorage.getItem('token')
        try {
            const data = new FormData()
            for (let k in post) {
                data.append(k, post[k])
            }
            data.append('creator', currentUser.id)
     
            const response = await API.post(endpoints["post"], data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                  },
            })
            setIsSuccess(true)
        } catch (error) {
            setIsSuccess(false)
            console.log(error.response)
        }
    }
    useEffect(() => {
        getServicesAndCategories()
    }, [])
    return (
        <div className="order-page">
             <Navbar />
            <form className="order-form" onSubmit={handleSubmit}>
                {
                    isSuccess === true && <div className="bg-green-600 w-full text-white font-medium text-2xl text-center mb-1 py-2 rounded-md ">Tạo bài đăng thành công</div> 
                    
                }
                {
                    isSuccess === false && <div className="bg-red-500 w-full text-white font-medium text-2xl text-center mb-1 py-2 rounded-md ">Có lỗi xảy ra</div>
                }
                <div className="order-item">
                    <label>Tên khách hàng</label>
                    <input className="order-input" placeholder="Nhập họ tên" name="customer_received"  onChange={handleChange}/>
                </div>
                <div className="order-item">
                    <label>Số điện thoại</label>
                    <input className="order-input" placeholder="Nhập số điện thoại" name="phone"  onChange={handleChange}/>
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
                    <select name="product_cate" onChange={handleChange} defaultValue="1" className="w-full cursor-pointer text-xl border-[1px] border-gray-300 py-4 rounded-xl" required>
                        {
                            categories.map(cate => (<option value={cate.id}>{cate.name}</option>))
                        }
                    </select>
                </div>
                <div className="order-item">
                    <label>Dịch vụ</label>
                    <select name="service_cate" onChange={handleChange} defaultValue="1" className="w-full cursor-pointer text-xl border-[1px] border-gray-300 py-4 rounded-xl" required>
                        {
                            services.map(ser => (<option value={ser.id}>{ser.name}</option>))
                        }
                    </select>
                </div>
                <div className="order-item">
                    <label>Nội dung</label>
                    <textarea className="order-input" placeholder="Nhập nội dung" name="content"  onChange={handleChange}/>
                </div>
                <button type="submit">Xác nhận</button>
            </form>
        </div>
    )
}

export default Post
