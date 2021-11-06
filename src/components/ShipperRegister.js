import React from 'react'

const ShipperRegister = () => {
    return (
        <div className="login">
            <div className="login-item">
                <label>Họ và tên</label>
                <input className="login-input" placeholder="Nhập họ tên" />
            </div>
            <div className="login-item">
                <label>Tài khoản</label>
                <input className="login-input" placeholder="Nhập tài khoản" />
            </div>
            <div className="login-item">
                <label>Email</label>
                <input className="login-input" placeholder="Nhập email" />
            </div>
            <div className="login-item">
                <label>Chứng minh nhân dân / Căn cước công dân</label>
                <input className="login-input" placeholder="Nhập số CMND/CCCD" />
            </div>
            <div className="login-item img-upload">
                <div className="img-upload-item">
                    <label>Ảnh mặt trước CCCD/CMND</label>
                    <input className="login-input" type="file" />
                </div>
                <div className="img-upload-item">
                    <label>Ảnh mặt sau CCCD/CMND</label>
                    <input className="login-input" type="file" />
                </div>
            </div>
            <div className="login-item">
                <label>Mật khẩu</label>
                <input className="login-input" placeholder="Nhập mật khẩu" type="password" />
            </div>
            <div className="login-item">
                <label>Nhập lại mật khẩu</label>
                <input className="login-input" placeholder="Nhập lại mật khẩu" type="password" />
            </div>
            <div className="login-item">
                <label>Ảnh đại diện</label>
                <input className="login-input" type="file" />
            </div>
            <button className="login-button">Đăng kí</button>
        </div>
    )
}

export default ShipperRegister
