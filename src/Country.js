import './App.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MaterialTable from 'material-table';
import { useSelector } from 'react-redux';

const columns = [
  { field: 'date', title: 'Date' },
  { field: 'confirmed', title: 'Confirmed', },
  { field: 'deaths', title: 'Deaths', },
  { field: 'recovered', title: 'Recovered', },
];


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

function Country() {

  const [globalData, setGlobalData] = useState({});
  const [lastesData, setLastesData] = useState([]);
  let countryName = useSelector((state) => state.country_reducer.countryName);
  useEffect(() => {
    if (countryName === "") countryName = getCountry();
    const globalApi = "https://covidapi.info/api/v1/country/" + countryName + "/latest";
    axios.get(globalApi).then(response => {
      const key = Object.keys(response.data.result)[0];
      const lastesData = response.data.result[key];
      lastesData["date"] = key;
      setGlobalData(lastesData)
    });

    axios.get("https://covidapi.info/api/v1/country/" + countryName).then(resLatest => {
      // console.log(Object.keys(resLatest.data.result))
      let newFormedArray = Object.keys(resLatest.data.result).map((item, index) => {
        let arr = resLatest.data.result[item];
        arr["date"] = item;
        return arr;
      });
      setLastesData(newFormedArray);
    });

  }, [countryName]);

  const classes = useStyles();

  const getCountry = () => {
    return window.location.pathname.match(/country=([^/]+)/)[1];
  }
  return (
    <>
      <div className="centerContent">
        <Card className={classes.root + " card-b-color"}>
          <CardContent>
            {globalData.confirmed ?
              <>
                <Typography className={classes.title + " textDec"} color="textSecondary" gutterBottom>
                  Country : <span className="content">{getCountry()}</span>
                </Typography>
                <Typography className={classes.title + " textDec"} color="textSecondary" gutterBottom>
                  Date : <span className="content">{globalData.date}</span>
                </Typography>
                <Typography className={classes.title + " textDec"} color="textSecondary" gutterBottom>
                  Confirmed : <span className="content">{globalData.confirmed}</span>
                </Typography>
                <Typography className={classes.title + " textDec"} color="textSecondary" gutterBottom>
                  Deaths : <span className="content">{globalData.deaths}</span>
                </Typography>
                <Typography className={classes.title + " textDec"} color="textSecondary" gutterBottom>
                  Recovered : <span className="content">{globalData.recovered}</span>
                </Typography>
              </>
              : null}
          </CardContent>
        </Card>
      </div>
      <div >
        <MaterialTable data={lastesData} columns={columns} title="Country Data" />
      </div>
    </>
  );
}

export default Country;
