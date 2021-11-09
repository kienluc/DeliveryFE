import React, {useState, useRef} from 'react'
import API, {endpoints} from '../API'
const ShipperRegister = () => {
    const avatarRef = useRef(null)
    const frontRef = useRef(null)
    const backRef = useRef(null)
    const [error, setError] = useState({})
    const [info, setInfo] = useState({
        last_name: '',
        first_name: '',
        gender: '',
        email: '',
        phone: '',
        avatar: '',
        username: '',
        id_number: '',
        password: '',
        confirmPassword: '',
        choice: 2,
        is_shipper: 1,
        is_active: 0
    })
    const handleChange = (event) => {
        console.log(event.target.value)
        setInfo({
            ...info,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
            const dataForm = new FormData()
            for (let k in info) {
                if (k !== "confirmPassword") {
                    dataForm.append(k, info[k])
                }
            }
            dataForm.append("avatar",avatarRef.current.files[0])
            try {
                const response = await API.post(endpoints['user'], dataForm, {
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                console.log(response)
                const dataForm1 = new FormData()
                dataForm1.append("account", response.data.id)
                dataForm1.append("id_number", info.id_number)
                dataForm1.append("id_front_image", frontRef.current.files[0])
                dataForm1.append("id_back_image", backRef.current.files[0])
                const res2 = await API.post(endpoints['shipperRegister'], dataForm1, {
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                console.log(res2)
            } catch (error) {
                    console.log(error.response)
            }
            setError({})
        
     
    }
    return (
        <form className="login" onSubmit={handleSubmit}>
            <div className="login-item">
                <label>Họ</label>
                <input className="login-input" placeholder="Nhập họ"  name="last_name" onChange={handleChange}/>
            </div>
            <div className="login-item">
                <label>Tên</label>
                <input className="login-input" placeholder="Nhập tên"  name="first_name" onChange={handleChange}/>
            </div>
            <select name="gender" defaultValue="Male" name="gender" onChange={handleChange}>
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
                <option value="Other">Khác</option>
            </select>
            <div className="login-item">
                <label>Tài khoản</label>
                <input className="login-input" placeholder="Nhập tài khoản"  name="username" onChange={handleChange}/>
            </div>
            <div className="login-item">
                <label>Email</label>
                <input className="login-input" placeholder="Nhập email" name="email" onChange={handleChange} />
            </div>
            <div className="login-item">
                <label>Số điện thoại</label>
                <input className="login-input" placeholder="Nhập số điện thoại" name="phone" onChange={handleChange} />
            </div>
            <div className="login-item">
                <label>Chứng minh nhân dân / Căn cước công dân</label>
                <input className="login-input" placeholder="Nhập số CMND/CCCD" name="id_number" onChange={handleChange} />
            </div>
            <div className="login-item img-upload">
                <div className="img-upload-item">
                    <label>Ảnh mặt trước CCCD/CMND</label>
                    <input className="login-input" type="file" ref={frontRef} />
                </div>
                <div className="img-upload-item">
                    <label>Ảnh mặt sau CCCD/CMND</label>
                    <input className="login-input" type="file" ref={backRef} />
                </div>
            </div>
            <div className="login-item">
                <label>Mật khẩu</label>
                <input className="login-input" placeholder="Nhập mật khẩu" type="password" name="password" onChange={handleChange} />
            </div>
            <div className="login-item">
                <label>Nhập lại mật khẩu</label>
                <input className="login-input" placeholder="Nhập lại mật khẩu" type="password" name="passwordConfirm" onChange={handleChange} />
            </div>
            <div className="login-item">
                <label>Ảnh đại diện</label>
                <input className="login-input" type="file" ref={avatarRef} />
            </div>
            <button className="login-button" type="submit">Đăng kí</button>
        </form>
    )
}

export default ShipperRegister
