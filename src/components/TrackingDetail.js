import React, { } from 'react'
import { BiX } from "react-icons/bi";

const TrackingDetail = ({order, modal, onModal}) => {

    return (
      <>
          {
              modal && 
              <div>
                <div className="z-[52] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[1px] rounded-lg bg-white p-4 w-[1100px] flex">
                    <table className="mx-auto">
                        <thead>
                            <tr className="text-xl">
                                <th className="w-[100px]">Mã đơn</th>
                                <th className="w-[100px]">Tên khách hàng</th>
                                <th className="w-[100px]">Tên shipper</th>
                                <th className="w-[100px]">Địa chỉ nhận hàng</th>
                                <th className="w-[100px]">Địa chỉ giao hàng</th>
                                <th className="w-[100px]">Loại hàng hóa</th>
                                <th className="w-[100px]">Dịch vụ</th>
                                <th className="w-[100px]">Giá tiền</th>
                                <th className="w-[100px]">Phương thức thanh toán</th>
                                <th className="w-[100px]">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-xl">
                                <td className="text-center">{order.id}</td>
                                <td className="text-center">{`${order.customer?.first_name} ${order.customer?.last_name}`}</td>
                                <td className="text-center">{`${order.shipper?.first_name} ${order.shipper?.last_name}`}</td>
                                <td className="text-center">{order.pickup_address}</td>
                                <td className="text-center">{order.ship_address}</td>
                                <td className="text-center">{order.product_cate?.name}</td>
                                <td className="text-center">{order.service_cate?.name}</td>
                                <td className="text-center">{order.total_price}</td>
                                <td className="text-center">{order.pay_method}</td>
                                <td className="text-center">{order.status}</td>
                                {/* <td className="text-center">123</td>
                                <td className="text-center">123</td>
                                <td className="text-center">123</td>
                                <td className="text-center">123</td>
                                <td className="text-center">123</td>
                                <td className="text-center">123</td>
                                <td className="text-center">123</td>
                                <td className="text-center">123</td>
                                <td className="text-center">123</td>
                                <td className="text-center">123</td> */}
                                
                            </tr>
                        </tbody>
                    </table>
                    <div className="cursor-pointer" onClick={onModal}>
                        <BiX className="text-4xl" />
                    </div>
                </div>
                <div className="fixed top-0 left-0 w-full h-full z-30 bg-black opacity-75"></div>
        </div>
          }
      </>
    )
}

export default TrackingDetail
