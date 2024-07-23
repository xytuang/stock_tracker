import React, { useEffect, useState } from "react"
import axios from "axios";
import { Formik, Form , Field } from 'formik';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
    name,
    symbol,
    price,
    quantity
  ) {
    return { name, symbol, price, quantity };
}

/*
const rows = [
    createData("Apple Inc.", "AA",10, 225),
    createData("Nvidia", "NVDA", 12, 140),
    createData("Meta Platforms Inc", "META", 10, 480),
  ];
*/

const Portfolio = () => {
    const [positions, setPositions] = useState([])
    const [addPosition, setAddPosition] = useState(false)
    useEffect(() => {
        const loadPortfolio = () => {
            axios.get(`http://localhost:8080/users/${window.localStorage.getItem("id")}/portfolio`, {
            }, {withCredentials: true}).then(result => {
                //console.log(result.data)
                setPositions(result.data.portfolio)
            }).catch(err => {
                console.error(err)
            })
        }
        loadPortfolio()
    }, [])
    
    const updatePortfolio = async (values) => {
        await axios.patch(`http://localhost:8080/users/${window.localStorage.getItem("id")}/portfolio`, 
        {
            name: values.name,
            ticker: values.ticker,
            price: values.price,
            quantity: values.quantity
        }, 
        {withCredentials: true})
        .then(result => {
            console.log(result)
        }).catch(err => {
            console.error(err)
        })
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Name </TableCell>
                        <TableCell align="right">Ticker</TableCell>
                        <TableCell align="right">Price&nbsp;</TableCell>
                        <TableCell align="right">Quantity&nbsp;</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {positions.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.ticker}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <button onClick={() => setAddPosition(!addPosition)}>Open new position</button>
            {addPosition ? 
                (<Formik
                initialValues={{ name: "", ticker: "", price: "", quantity: "" }}
                onSubmit={async (values) => {
                    try {
                        const res = await updatePortfolio(values)
                        if (res.status === 200) {
                            setPositions([...positions, createData(values.name, values.ticker, values.price, values.quantity)])
                        }
                        else {
                            console.log("Add position failed")
                        }
                    }
                    catch (error) {
                        console.error("Error adding: ", error)
                    }
                }}
                >
                <Form>
                    <label htmlFor="name">Name: </label>
                    <Field name="name" type="text" />
                    <label htmlFor="ticker">Ticker: </label>
                    <Field name="ticker" type="text" />
                    <label htmlFor="price">Price: </label>
                    <Field name="price" type="text" />
                    <label htmlFor="quantity">Quantity: </label>
                    <Field name="quantity" type="text" />
                    <button type="submit">Add ticker</button>
                </Form>
            </Formik>) : null 
            }
            
        </div>
    )
}

export default Portfolio