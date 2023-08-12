import { useState } from 'react';

export const CreateGame = ({
    onCreateGameSubmit
}) => {
    const [values, setValues] = useState({
        title: '',
        category: '',
        maxLevel: '',
        imageUrl: '',
        summary: '',
    });

    const onChangeHandler = (e) => {
        setValues(state => ({...state, [e.target.name]: e.target.value}));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        onCreateGameSubmit(values);
    };

    return (
        <section id="create-page" className="auth">
            <form id="create" onSubmit={onSubmit}>
                <div className="container">

                    <h1>Create Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" value={values.title} onChange={onChangeHandler} placeholder="Enter game title..." />

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" value={values.category} onChange={onChangeHandler} placeholder="Enter game category..." />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" value={values.maxLevel} onChange={onChangeHandler} placeholder="1" />

                    <label htmlFor="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value={values.imageUrl} onChange={onChangeHandler} placeholder="Upload a photo..." />

                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" value={values.summary} onChange={onChangeHandler}></textarea>
                    <input className="btn submit" type="submit" value="Create Game" />
                </div>
            </form>
        </section>
    );
};