import React from 'react';
import {Grid, Paper} from '@material-ui/core';
import InputWebsite from './Dashboard/InputWebsite';
import Running from './Dashboard/Running';
import Queue from './Dashboard/Queue';

export default function Dashboard() {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                <Paper style={{
                    padding: 30,
                    display: 'flex',
                    overflow: 'auto',
                    flexDirection: 'column',
                    minHeight: 240,
                }}>
                    <InputWebsite/>
                </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={9}>
                <Paper style={{
                    padding: 30,
                    display: 'flex',
                    overflow: 'auto',
                    flexDirection: 'column',
                    minHeight: 240,
                }}>
                    <Running/>
                </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={9}>
                <Paper style={{
                    padding: 30,
                    display: 'flex',
                    overflow: 'auto',
                    flexDirection: 'column',
                    minHeight: 240,
                }}>
                    <Queue/>
                </Paper>
            </Grid>
        </Grid>
    )
}