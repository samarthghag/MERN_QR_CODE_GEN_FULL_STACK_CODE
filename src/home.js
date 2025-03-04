import React from 'react';
import About from './about';

function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Home</h1>
                <h5>This is the Home page
                </h5>
                <About />
            </header>
        </div>
    );
}

export default Home;