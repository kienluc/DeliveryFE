import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import API, {endpoints} from '../API'

import Navbar from '../components/Navbar'
const Profile = () => {
    const user = useSelector(state => state.userLogin.userInfo)
    const [avg, setAvg] = useState(0)
    const getShipperRating = async () => {
        try {
            const token = localStorage.getItem('token')
            const response2 = await API.get(endpoints['shipperRegister'])
            const cur = response2.data.results.filter(res => res.id === user.id)[0]
       
            const response = await API.get(`${endpoints['shipperRegister']}${cur?.id}/average-rate/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
           console.log(response2)
            setAvg(response.data.average)
           
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(() =>{
     
            getShipperRating()

    }, [user])
    return (
        <div>
            <Navbar />
            <div className="max-w-[1100px] mx-auto border-2 border-purple-400">
                <div className="w-[100px]">
                    <img src={user.avatar} alt="avatar" />
                </div>
                <p className="font-medium text-2xl mb-4">Username: {user.username}</p>
                <p className="font-medium text-2xl mb-4">Họ tên: {user.last_name} {user.first_name}</p>
                <p className="font-medium text-2xl mb-4">Giới tính: {user.gender === "Male" ? 'Nam' : user.gender === "Female" ? "Nữ" : 'Khác'}</p>
                <p className="font-medium text-2xl mb-4">Email: {user.email}</p>
                <p className="font-medium text-2xl mb-4">Số điện thoại: {user.phone}</p>
                {
                    user.is_shipper && <p className="font-medium text-2xl mb-4">Đánh giá: {avg}</p>
                }
            </div>
        </div>
    )
}

export default Profile
