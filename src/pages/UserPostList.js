import React, {useState, useEffect} from 'react'
import API, { endpoints } from '../API'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import Post from '../components/Post'
const UserPostList = () => {
    const [posts, setPosts] = useState([])

    const currentUser = useSelector(state => state.userLogin.userInfo)

    const getPosts = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await API.get(endpoints["post"], {
                headers: {
                    "Authorization": `Bearer ${token}`
                  },
            })
            const arr = response.data.results.filter(post => post.creator.id === currentUser.id)
            setPosts(arr)
            
        } catch (error) {
            console.log(error.response)
        }
    }
    useEffect(() => {
        getPosts()
    }, [currentUser])
    return (
        <div>
            <Navbar />
            <div className="mx-auto max-w-[1100px]">
                {
                    posts.map((post) => (
                       <Post user={currentUser} post={post} />
                    ))
                }
            </div>
        </div>
    )
}

export default UserPostList
