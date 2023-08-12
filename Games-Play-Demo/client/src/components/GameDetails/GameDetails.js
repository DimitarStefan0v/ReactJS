import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as gameService from '../../services/gameService';
import * as commentService from '../../services/commentService';

export const GameDetails = () => {
    const { gameId } = useParams();
    const [game, setGame] = useState({});
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        gameService.getOne(gameId)
            .then(result => {
                setGame(result);
                return commentService.getAll(gameId);
            })
            .then(result => {
                setComments(result);
            });
    }, [gameId]);

    const onCommentSubmit = async (e) => {
        e.preventDefault();

        const newComment = await commentService.create({
            gameId,
            username,
            comment,
        });

        console.log(newComment);
        //TODO: add comment to state
        //setGame(state => ({...state, comments}));
        setUsername('');
        setComment('');
    };

    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const onCommentChange = (e) => {
        setComment(e.target.value);
    };

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">{game.summary}</p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {comments.map(x => (
                            <li key={x._id} className="comment">
                                <p>{x.username}: {x.comment}</p>
                            </li>
                        ))}
                    </ul>

                    {comments.length === 0 && (<p className="no-comment">No comments.</p>)}
                </div>

                <div className="buttons">
                    <a href="#" className="button">Edit</a>
                    <a href="#" className="button">Delete</a>
                </div>
            </div>

            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={onCommentSubmit}>
                    <input type="text" name="username" placeholder="Your username..." value={username} onChange={onUsernameChange} />
                    <textarea name="comment" placeholder="Comment......" value={comment} onChange={onCommentChange}></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>

        </section>
    );
};