import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function Student() {
    const paperStyle = {padding: '50px 20px', width:600, margin: "20px auto"}
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [students, setStudents] = useState([])
    const handleClick= (e) => {
        e.preventDefault()
        const student={name, address}
        console.log(student)
        fetch("http://localhost:8080/student/add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(student)
        }).then(()=>{
            console.log("New student added")
        })
    }

    useEffect(()=>{
        fetch("http://localhost:8080/student/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setStudents(result)
        })
    }, [])

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{color:"blue"}}>Add Student</h1>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
            >
                <TextField id="standard-basic" label="Student Name" variant="standard" fullWidth
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
                <TextField id="standard-basic" label="Student Address" variant="standard" fullWidth
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                />
                <Button variant="contained" endIcon={<SendIcon />} color="success" onClick={handleClick}>
                    Submit
                </Button>
            </Box>
            </Paper>

            <h1>Students</h1>
            <Paper elevation={3} style={paperStyle}>
                <table align='center' style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Paper>
        </Container>
    );
}