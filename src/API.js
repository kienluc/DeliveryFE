import axios from "axios";

export let endpoints = {
    user: "users/",
    shipperRegister: "shippers_info/",
    login: "o/token/",
    currentUser: "users/current-user/",
    orders: "orders/",
    category: "ProductCategories/",
    service: "services/",
    orderDetail: "order-detail/",
    post: "order_posts/",
    auction: "auctions/",
    rating: "ratings/",
};  

export default axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

