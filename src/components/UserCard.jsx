import Card from "react-bootstrap/Card"


export const UserCard = ({user, articles}) => {


    const filteredArticles = articles.filter((article) => {
        return article.author === user.username
    })

    return (
    <Card className="user-card">
        <Card.Body>
        <img id="user-card-picture" src={user.avatar_url} alt="Profile picture"/>
        <div className="user-card-info">
        <Card.Title>{user.name}</Card.Title>
        <Card.Subtitle>u/{user.username}</Card.Subtitle>
        <Card.Text>Posts: {filteredArticles.length}</Card.Text>
        </div>
        </Card.Body>
    </Card>
    )
}