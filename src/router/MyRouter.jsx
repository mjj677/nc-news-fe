import {Route, Routes, Navigate} from "react-router-dom"
import {useContext} from "react"
import { UserContext } from "../context/UserContext"
import {ListArticles, ArticleDetail, PostArticle, UserList, User} from '../components/index'


export const MyRoutes = () => {

    // const {username} = useContext(UserContext)

    // if (!username) {
    //     return <Navigate to="/" />;
    // }

    return (
        <Routes>
            <Route path="/" element={<ListArticles />} />
            <Route path="/articles" element={<ListArticles />} />
            <Route path="/articles/:article_id" element={< ArticleDetail />} />
            <Route path="/articles/post" element={< PostArticle />} />
            <Route path="/users" element={< UserList />} />
            <Route path="/users/:username" element={< User />} />
            <Route path="*" element={<div> ERROR: 404 NOT FOUND </div>} />
        </Routes>
    )

}