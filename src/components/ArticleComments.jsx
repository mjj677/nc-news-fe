import { useParams } from "react-router-dom"
import { getRequest } from "../utils/api"
import { useEffect, useState } from "react"
import { ArticleCommentCard } from "./ArticleCommentCard"


export const ArticleComments = () => {

    const {article_id} = useParams()
    const [articleComments, setArticleComments] = useState([])

    useEffect(() => {
        const fetchArticleComments = async () => {
            try {
                const {article_comments} = await getRequest(`articles/${article_id}/comments`);
                setArticleComments(article_comments)
            } catch (err) {
                console.log("Error:", err)
                throw err
            }
        }
        fetchArticleComments();
    }, [])

    return (<section className="article-comments-container">{articleComments.map((comment) => {
        return <ArticleCommentCard key={comment.comment_id} comment={comment}/>
    })}</section>

    )
}