import React from 'react';
import Header from './components/Header';
import MainFrame from './components/MainFrame';

export default function App() {
    return (
        <div>
            <Header/>
            <h2 style={{ marginBottom: '1rem',padding: '90px',marginTop:'0rem'}}>Add Candidates to Database</h2>
           <MainFrame/>
        </div>
    )
}