import Card from 'react-bootstrap/Card'
import { ConvertDate } from '../utils/convertDate'

export const ArticleCommentCard = ({comment}) => {

    const readableDate = ConvertDate(comment.created_at)

    return (
        <Card className='comment-card'>
            <div className='comment-card-header'>
                <div className='comment-info'>
                    <span className='topic-name'>u/{comment.author}</span>
                    <span className='dot'>•</span>
                    <span className='timestamp'>{readableDate}</span>
                </div>
            </div>
            <Card.Body>
                <Card.Text>
                    {comment.body}
                </Card.Text>
                <div className="votes-wrapper">
              <button id="upvote-button">👍</button>
              {comment.votes}
              <button id="downvote-button">👎</button>
          </div>
            </Card.Body>
        </Card>
        )
}