import { useEffect, useContext, useReducer } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { useService } from '../../hooks/useService';

import { AuthContext } from '../../contexts/AuthContext';
import { useGameContext } from '../../contexts/GameContext';

import { gameServiceFactory } from '../../services/gameService';
import * as commentService from '../../services/commentService';

import { gameReducer } from '../../reducers/gameReducer';

import { AddComment } from './AddComment/AddComment';


export const GameDetails = () => {
    const { gameId } = useParams();
    const { userId, isAuthenticated, userEmail } = useContext(AuthContext);
    const { deleteGame } = useGameContext();
    const [game, dispatch] = useReducer(gameReducer, {});
    const gameService = useService(gameServiceFactory);
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
            gameService.getOne(gameId),
            commentService.getAll(gameId),
        ])
            .then(([gameData, commentsData]) => {
                const gameState = {
                    ...gameData,
                    comments: commentsData
                };

                dispatch({ type: 'GAME_FETCH', payload: gameState });
            });
    }, [gameId]);

    const onCommentSubmit = async (values) => {
        const response = await commentService.create(gameId, values.comment);
        console.log(response);

        dispatch({
            type: 'COMMENT_ADD',
            payload: response,
            userEmail,
        });
    };

    const isOwner = game._ownerId === userId;

    const onDeleteClick = async () => {
        // eslint-disable-next-line no-restricted-globals
        const confirmation = confirm(`Are you sure you want to delete ${game.title}?`);

        if (confirmation) {
            await gameService.delete(game._id);
                
            deleteGame(game._id);

            navigate('/catalog');
        }

        // TODO: delete from gameState
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
                        {game.comments && game.comments.map(x => (
                            <li key={x._id} className="comment">
                                <p>{x.author.email}: {x.comment}</p>
                            </li>
                        ))}
                    </ul>

                    {!game.comments?.length && (<p className="no-comment">No comments.</p>)}
                </div>

                {isOwner && (
                    <div className="buttons">
                        <Link to={`/catalog/${gameId}/edit`} className="button">Edit</Link>
                        <button className="button" onClick={onDeleteClick}>Delete</button>
                    </div>
                )}
            </div>

            {isAuthenticated && <AddComment onCommentSubmit={onCommentSubmit} />}
        </section>
    );
};