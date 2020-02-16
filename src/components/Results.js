import React, {useState, useEffect} from 'react';
import {Grid, Paper, Container, FormControl, InputLabel, Select, MenuItem, Button, TableHead, TableRow, TableCell, TableContainer, Tab, Table, TableBody} from '@material-ui/core';

export default function Results() {

    const [websiteList, setWebsiteList] = useState({});
    const [selection, setSelection] = useState({
        website: '',
        processId: '',
        analysis: 'seo'
    });
    const [daData, setDaData] = useState({
        showSeo: false,
        showAxe: false,
        showAxeRaw: false,
        data: {}
    });

    useEffect(() => {
        fetch("http://localhost:5000/getWebsiteList").then(
            response => response.json().then(
                data => {
                    setWebsiteList(data);
                }
            )
        );
    }, []);

    const handleSelectionChange = name => event => {
        setSelection({
            ...selection,
            [name]: event.target.value
        })
    }

    const handleButtonPress = () => {
        if (selection.website !== '') {
            if (selection.processId !== '') {
                if (selection.analysis === 'seo') {
                    fetch('http://localhost:5000/getReportDa?site='+selection.website+'&process_id='+selection.processId).then(
                        response => response.json().then(
                            data => {
                                setDaData({
                                    showSeo: true,
                                    showAxe: false,
                                    showAxeRaw: false,
                                    data: data
                                });
                            }
                        )
                    )
                } else if (selection.analysis === 'axe') {
                    fetch('http://localhost:5000/getReportAxe?site='+selection.website+'&process_id='+selection.processId).then(
                        response => response.json().then(
                            data => {
                                setDaData({
                                    showSeo: false,
                                    showAxe: true,
                                    showAxeRaw: false,
                                    data: data
                                });
                            }
                        )
                    )
                } else if (selection.analysis === 'axe_raw') {
                    fetch('http://localhost:5000/getReportAxeRaw?site='+selection.website+'&process_id='+selection.processId).then(
                        response => response.json().then(
                            data => {
                                setDaData({
                                    showSeo: false,
                                    showAxe: false,
                                    showAxeRaw: true,
                                    data: data
                                });
                                console.log(data);
                            }
                        )
                    )
                }
            }
        }
    }

    const handleDownloadButton = () => {
        if (selection.website !== '') {
            if (selection.processId !== '') {
                fetch('http://localhost:5000/getAxeCsv?site='+selection.website+'&process_id='+selection.processId).then(
                    response => response.blob().then((blob) => {
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = "main-table.csv";
                        a.click(); 
                    })
                )
            }
        }
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                <Paper style={{
                      padding: 30,
                      display: 'flex',
                      overflow: 'auto',
                      flexDirection: 'column',
                  }}>
                    <Container>
                        <h2>Results</h2>
                        <FormControl style={{width: 200}}>
                            <InputLabel>Select Website</InputLabel>
                            <Select onChange={handleSelectionChange('website')} autoWidth>
                                {Object.keys(websiteList).map((key) => (
                                    <MenuItem value={key}>
                                        {key}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        
                        <FormControl style={{width: 200}}>
                            <InputLabel>Select ProcessId</InputLabel>
                            <Select onChange={handleSelectionChange('processId')} autoWidth>
                                {selection.website !== '' ? websiteList[selection.website].map((val) => (
                                    <MenuItem value={val}>
                                        {val}
                                    </MenuItem>
                                )) : <MenuItem>Select a website first!</MenuItem>}
                            </Select>
                        </FormControl>

                        <FormControl style={{width: 200}}>
                            <InputLabel>Select Analysis</InputLabel>
                            <Select onChange={handleSelectionChange('analysis')} autoWidth>
                                <MenuItem value={'seo'}>SEO (Script 1)</MenuItem>
                                <MenuItem value={'axe'}>Violations (Script 2)</MenuItem>
                                <MenuItem value={'axe_raw'}>Main Table</MenuItem>
                            </Select>
                        </FormControl>
                        <br/>
                        <Button variant='contained' onClick={handleButtonPress} style={{marginTop: '20px'}}>Fetch Results</Button>
                        <br/>
                        {daData.showAxeRaw ? <Button variant='contained' onClick={handleDownloadButton} style={{marginTop: '20px'}}>Download CSV</Button> : <Container></Container>}
                    </Container>
                </Paper>
            </Grid>
            {daData.showSeo ? 
            <Grid container spacing={3}>
                {Object.keys(daData.data).map((title) => (
                    <Grid item xs={4} md={3} lg={3}>
                        <h2>{title}</h2>
                        <br/>
                        <TableContainer component={Paper}>
                            <Table>
                                {daData.data[title].map((field) => (
                                    <TableBody>
                                        <TableCell>{field[0]}</TableCell>
                                        <TableCell>{field[1]}</TableCell>
                                    </TableBody>
                                ))}
                            </Table>
                        </TableContainer>
                    </Grid>
                ))}
            </Grid>
            : <Container></Container>}
            {daData.showAxe ?
            <Grid container spacing={3}>
                {Object.keys(daData.data).map((title) => (
                    <Grid item>
                        <h2>{title}</h2>
                        <br/>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableCell><b>{title}</b></TableCell>
                                    <TableCell><b>Times it asppeared</b></TableCell>
                                    <TableCell><b>AVG/Page</b></TableCell>
                                </TableHead>
                                {daData.data[title].map((field) => (
                                    <TableBody>
                                        <TableCell>{field[0]}</TableCell>
                                        <TableCell>{field[1]}</TableCell>
                                        <TableCell>{field[2]}</TableCell>
                                    </TableBody>
                                ))}
                            </Table>
                        </TableContainer>
                    </Grid>
                ))}
            </Grid>
            : <Container></Container>}
            {daData.showAxeRaw ?
            <Grid container spacing={3}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell component='th'><b>S.No.</b></TableCell>
                                <TableCell component='th'><b>url</b></TableCell>
                                <TableCell component='th'><b>category</b></TableCell>
                                <TableCell component='th'><b>priority</b></TableCell>
                                <TableCell component='th'><b>violation_help</b></TableCell>
                                <TableCell component='th'><b>description</b></TableCell>
                                <TableCell component='th'><b>element_location</b></TableCell>
                                <TableCell component='th'><b>element</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(daData.data).map((row) => (
                                <TableRow>
                                    <TableCell>{row}</TableCell>
                                    {daData.data[row].map((item) => (
                                        <TableCell>{item}</TableCell>
                                    ))}
                                </TableRow> 
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            : <Container></Container>}
        </Grid>
    )
}