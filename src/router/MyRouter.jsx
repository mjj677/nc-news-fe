import {Route, Routes, Navigate} from "react-router-dom"
import {useContext} from "react"
import { UserContext } from "../context/UserContext"
import {ListArticles, ArticleDetail, PostArticle, UserList, TopicPage, AboutPage, UserPosts} from '../components/index'


export const MyRoutes = () => {

    const {username} = useContext(UserContext)

    if (!username) {
        return <Navigate to="/" />;
    }

    return (
        <Routes>
            <Route path="/" element={<ListArticles />} />
            <Route path="/topics/:topic" element={<TopicPage />} /> 
            <Route path="/articles" element={<ListArticles />} />
            <Route path="/articles/:article_id" element={< ArticleDetail />} />
            <Route path="/articles/post" element={< PostArticle />} />
            <Route path="/users" element={< UserList />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/:username/posts" element={<UserPosts />} />
            <Route path="*" element={<h1 className="error-message"> ERROR 404: PAGE NOT FOUND </h1>} />
        </Routes>
    )

}