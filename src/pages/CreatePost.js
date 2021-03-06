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
        setCategories(response.data)
        setServices(response2.data)
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
            setPost({})
        } catch (error) {
            setIsSuccess(false)
            
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
                    isSuccess === true && <div className="bg-green-600 w-full text-white font-medium text-2xl text-center mb-1 py-2 rounded-md ">T???o b??i ????ng th??nh c??ng</div> 
                    
                }
                {
                    isSuccess === false && <div className="bg-red-500 w-full text-white font-medium text-2xl text-center mb-1 py-2 rounded-md ">C?? l???i x???y ra</div>
                }
                <div className="order-item">
                    <label>T??n kh??ch h??ng</label>
                    <input className="order-input" placeholder="Nh???p h??? t??n" name="customer_received"  onChange={handleChange}/>
                </div>
                <div className="order-item">
                    <label>S??? ??i???n tho???i</label>
                    <input className="order-input" placeholder="Nh???p s??? ??i???n tho???i" name="phone"  onChange={handleChange}/>
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
                            categories.map(cate => (<option value={cate.id}>{cate.name}</option>))
                        }
                    </select>
                </div>
                <div className="order-item">
                    <label>D???ch v???</label>
                    <select name="service_cate" onChange={handleChange} defaultValue="1" className="w-full cursor-pointer text-xl border-[1px] border-gray-300 py-4 rounded-xl" required>
                        {
                            services.map(ser => (<option value={ser.id}>{ser.name}</option>))
                        }
                    </select>
                </div>
                <div className="order-item">
                    <label>N???i dung</label>
                    <textarea className="order-input" placeholder="Nh???p n???i dung" name="content"  onChange={handleChange}/>
                </div>
                <button type="submit">X??c nh???n</button>
            </form>
        </div>
    )
}

export default Post
