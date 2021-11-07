import React, {useState, useRef} from 'react'
import API, {endpoints} from '../API'

const Register = ({handleActive}) => {
    const avatarRef = useRef(null)

    const [info, setInfo] = useState({
        last_name: '',
        first_name: '',
        gender: '',
        email: '',
        phone: '',
        avatar: '',
        username: '',
        password: '',
        confirmPassword: '',
        choice: 1,
        is_shipper: 0,
        is_active: 1
    })

    const [error, setError] = useState({})

    const handleChange = (event) => {
        setInfo({
            ...info,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (info.password !== info.confirmPassword) {
            setError({
                ...error,
                confirm: 'Mật khẩu không khớp'
            })
        } else {
            const dataForm = new FormData()
            for (let k in info) {
                if (k !== "confirmPassword") {
                    dataForm.append(k, info[k])
                }
            }
            dataForm.append("avatar",avatarRef.current.files[0])
            API.post(endpoints['user'], dataForm, {
                headers: {
                    "Content-Type": "multipart/form-data",
                  },
            })
            .then((res) => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            setError({})
        }
     
    }
    return (
       <>
             <form className="login" onSubmit={handleSubmit}>
            <div className="login-item">
                <label>Họ</label>
                <input className="login-input" placeholder="Nhập họ" name="last_name"  onChange={handleChange}/>
            </div>
            <div className="login-item">
                <label>Tên</label>
                <input className="login-input" placeholder="Nhập tên" name="first_name"  onChange={handleChange}/>
            </div>
            <select name="gender" onChange={handleChange} defaultValue="Male">
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
                <option value="Other">Khác</option>
            </select>
            <div className="login-item">
                <label>Tài khoản</label>
                <input className="login-input" placeholder="Nhập tài khoản" name="username" onChange={handleChange}/>
            </div>
            <div className="login-item">
                <label>Số điện thoại</label>
                <input className="login-input" placeholder="Nhập số điện thoại"  name="phone" onChange={handleChange}/>
            </div>
            <div className="login-item">
                <label>Email</label>
                <input className="login-input" placeholder="Nhập email" name="email"  onChange={handleChange}/>
            </div>
            <div className="login-item">
                <label>Mật khẩu</label>
                <input className="login-input" placeholder="Nhập mật khẩu" type="password" name="password" onChange={handleChange}/>
            </div>
            <div className="login-item">
                <label>Nhập lại mật khẩu</label>
                <input className="login-input" placeholder="Nhập lại mật khẩu" type="password" name="confirmPassword" onChange={handleChange}/>
            </div>
            <div className="login-item">
                <label>Ảnh đại diện</label>
                <input className="login-input" type="file" ref={avatarRef}/>
            </div>
            <button className="login-button" type="submit">Đăng kí</button>
            <p className="no-account">Bạn là shipper ? <span style={{color: '#f26522', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline'}} onClick={() => handleActive(3)}>Đăng kí shipper</span></p>
            </form>
            {
                error.confirm && <p>{error.confirm}</p>
            }
       </>
    )
}

export default Register
