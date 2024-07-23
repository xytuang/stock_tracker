import React from "react"
//import axios from "axios"
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

const rows = [
    createData("Frozen yoghurt", "AA", 99, 100),
    createData("Frozen", "AAPL", 100, 1),
    createData("yoghurt", "MSFT", 94, 94),

  ];


const Portfolio = () => {
    /*
    const [tickers, setTickers] = useState(null)
    useEffect(() => {
        const findPortfolio = async (values) => {
            try {
                const response = axios.get("http://localhost:8080/auth/login", {
                    email: values.email,
                    password: values.password,
                }, {withCredentials: true});
                setTickers(response.data)
            } catch (error) {
                throw error;
                setTickers(null)
            }
        };
        findPortfolio()
    }, [])
    */
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Name </TableCell>
                        <TableCell align="right">Symbol</TableCell>
                        <TableCell align="right">Price&nbsp;</TableCell>
                        <TableCell align="right">Quantity&nbsp;</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.symbol}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Portfolio