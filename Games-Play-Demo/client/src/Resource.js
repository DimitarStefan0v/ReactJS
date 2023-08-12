
function App() {
    return (
        <div id="box">

            <section id="create-page" className="auth">
                <form id="create">
                    <div className="container">

                        <h1>Create Game</h1>
                        <label htmlFor="leg-title">Legendary title:</label>
                        <input type="text" id="title" name="title" placeholder="Enter game title..." />

                        <label htmlFor="category">Category:</label>
                        <input type="text" id="category" name="category" placeholder="Enter game category..." />

                        <label htmlFor="levels">MaxLevel:</label>
                        <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1" />

                        <label htmlFor="game-img">Image:</label>
                        <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." />

                        <label htmlFor="summary">Summary:</label>
                        <textarea name="summary" id="summary"></textarea>
                        <input className="btn submit" type="submit" value="Create Game" />
                    </div>
                </form>
            </section>

            <section id="edit-page" className="auth">
                <form id="edit">
                    <div className="container">

                        <h1>Edit Game</h1>
                        <label htmlFor="leg-title">Legendary title:</label>
                        <input type="text" id="title" name="title" defaultValue="" />

                        <label htmlFor="category">Category:</label>
                        <input type="text" id="category" name="category" defaultValue="" />

                        <label htmlFor="levels">MaxLevel:</label>
                        <input type="number" id="maxLevel" name="maxLevel" min="1" defaultValue="" />

                        <label htmlFor="game-img">Image:</label>
                        <input type="text" id="imageUrl" name="imageUrl" defaultValue="" />

                        <label htmlFor="summary">Summary:</label>
                        <textarea name="summary" id="summary"></textarea>
                        <input className="btn submit" type="submit" value="Edit Game" />

                    </div>
                </form>
            </section>

            

            
        </div>
    );
}

export default App;
