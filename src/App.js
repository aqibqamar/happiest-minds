import './App.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MaterialTable from 'material-table';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setData } from "./Actions/Country";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function App() {

  const [globalData, setGlobalData] = useState({});
  const [lastesData, setLastesData] = useState([]);


  const dispatch = useDispatch()

const columns = [
  {
    field: 'country', title: 'Country',
    render: rowData => <Link to={"/covid/country=" + rowData.country} onClick={()=> dispatch(setData(rowData.country))}>
      {rowData.country}
    </Link>
  },
  {
    field: 'confirmed', title: 'Confirmed',
    // render: rowData => <Link  to={"/covid/country=" + rowData.country}>
    //   {rowData.confirmed}
    // </Link>
  },
  {
    field: 'deaths', title: 'Deaths',
    // render: rowData => <Link  to={"/covid/country=" + rowData.country}>
    //   {rowData.deaths}
    // </Link>
  },
  {
    field: 'recovered', title: 'Recovered',
    // render: rowData => <Link  to={"/covid/country=" + rowData.country}>
    //   {rowData.deaths}
    // </Link>
  },
];

  useEffect(() => {
    const globalApi = "https://covidapi.info/api/v1/global";
    axios.get(globalApi).then(response => {
      setGlobalData(response.data)
    });

    axios.get("https://covidapi.info/api/v1/global/latest").then(resLatest => {
      let newFormedArray = resLatest.data.result.map((item, index) => {
        item[Object.keys(item)[0]]["id"] = index;
        item[Object.keys(item)[0]]["country"] = Object.keys(item)[0];
        return item[Object.keys(item)[0]];
      });
      setLastesData(newFormedArray);
    });

  }, []);

  const classes = useStyles();

  return (
    <>
      <div className="centerContent">
        <Card className={classes.root + " card-b-color"}>
          <CardContent>
            {globalData.result ?
              <>
                <Typography className={classes.title + " textDec"} color="textSecondary" gutterBottom>
                  Date : <span className="content">{globalData.date}</span>
                </Typography>
                <Typography className={classes.title + " textDec"} color="textSecondary" gutterBottom>
                  Confirmed : <span className="content">{globalData.result.confirmed}</span>
                </Typography>
                <Typography className={classes.title + " textDec"} color="textSecondary" gutterBottom>
                  Deaths : <span className="content">{globalData.result.deaths}</span>
                </Typography>
                <Typography className={classes.title + " textDec"} color="textSecondary" gutterBottom>
                  Recovered : <span className="content">{globalData.result.recovered}</span>
                </Typography>
              </>
              : null}
          </CardContent>
        </Card>
      </div>
      <div >
        <MaterialTable data={lastesData} columns={columns} title="Global Data" />
      </div>
    </>
  );
}

export default App;
