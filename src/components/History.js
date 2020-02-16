import React, {useState, useEffect} from 'react';
import {Paper} from '@material-ui/core';

export default function History() {
    const [running, setRunning] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch("http://localhost:5000/getHistory").then(
                response => response.json().then(
                    data => {
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
            <h2>History</h2>
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
                    run_start_time: {item.run_start_time}<br/>
                    run_end_time: {item.run_end_time}<br/>
                    
                </Paper>
            ))}
        </div>
    )
} 