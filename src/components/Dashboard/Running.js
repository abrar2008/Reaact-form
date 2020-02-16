import React, {useState, useEffect} from 'react';
import {Grid, Paper, Container} from '@material-ui/core';

export default function Running() {
    const [running, setRunning] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch("http://localhost:5000/getLiveRunning").then(
                response => response.json().then(
                    data => {

                        console.log(data)
                        let a = [];
                        for (const item in data) {
                            a.push(data[item])
                        }
                        setRunning(a);
                    }
                )
            ); 
        }, 500);

        return () => clearInterval(interval);
    }, []);


    return (
        <div>
            <h2>Running</h2>
            {running.map((item) => (
                <Paper style={{
                    padding: 30,
                    display: 'flex',
                    overflow: 'auto',
                    flexDirection: 'column'
                }}>
                    home_url: {item.home_url}<br/>
                    browser: {item.browser}<br/>
                    resolution: {item.resolution}<br/>
                    pages: {item.number_of_pages_scraped}
                </Paper>
            ))}
        </div>
    )
} 