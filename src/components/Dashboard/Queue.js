import React, {useState, useEffect} from 'react';
import {Paper} from '@material-ui/core';

export default function Queue(data) {

    const [queue, setQueue] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch("http://localhost:5000/getLiveQueue").then(
                response => response.json().then(
                    data => {
                        let a = [];
                        for (const item in data) {
                            a.push(data[item])
                        }
                        setQueue(a);
                    }
                )
            ); 
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h2>Queue</h2>
            {queue.map((item) => (
                <Paper style={{
                    padding: 30,
                    display: 'flex',
                    overflow: 'auto',
                    flexDirection: 'column'
                }}>
                    home_url: {item.home_url}<br/>
                    browser: {item.browser}<br/>
                    resolution: {item.resolution}<br/>
                    request_time: {item.time_token}
                </Paper>
            ))}
        </div>
    )
} 