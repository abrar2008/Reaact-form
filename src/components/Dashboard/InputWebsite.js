import React, { useState } from 'react';
import { Container, TextField, FormGroup, FormControlLabel, Checkbox, Button } from '@material-ui/core'

export default function InputWebsite() {
    const [data, setData] = useState({
        website_url: "",
        browser: {
            splash: true,
            chrome: false,
            firefox: false
        },
        resolution: {
            "1920x1080": true
        },
        requestTime: Date(),
    });

    //Add resolution
    
    const handleChange = name => event => {
        setData({
            ...data,
            browser: {
                ...data.browser,
                [name]: event.target.checked
            }
        });
    };

    const handleButtonPress = () => {

        setData({
            ...data,
            requestTime: Date()
        })

        console.log(data);
        (async () => {
            const response = await fetch('http://localhost:5000/sendScrape', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log('Data sent to flask! '+JSON.stringify(data));
                setData({
                    ...data,
                    browser: {
                        splash: true,
                        chrome: false,
                        firefox: false
                    },
                    resolution: {
                        "1920x1080": true
                    }
                });
            }
        })();
    }

    return (
        <Container>
            <h2>Add Site ...</h2>
            <form>
                <div style={{width: '300px'}}>
                    <TextField id='outlined-basic' label='Website Name' variant='outlined' fullWidth onChange={(e) => {setData({ ...data, website_url: e.target.value})}}/>
                </div>
                <br/>
                <FormGroup row>
                    <FormControlLabel
                        control={<Checkbox checked={data.browser.splash} onChange={handleChange('splash')} value='splash'/>}
                        label='Splash'
                    />
                    <FormControlLabel
                        control={<Checkbox checked={data.browser.chrome} onChange={handleChange('chrome')} value='chrome'/>}
                        label='Chrome'
                    />
                    {/* <FormControlLabel
                        control={<Checkbox checked={data.browser.firefox} onChange={handleChange('firefox')} value='firefox'/>}
                        label='Firefox'
                    /> */}
                </FormGroup>
                <br/>
                <Button variant='contained' onClick={handleButtonPress} style={{marginTop: '20px'}}>Submit</Button>
            </form>
        </Container>
    )
}

