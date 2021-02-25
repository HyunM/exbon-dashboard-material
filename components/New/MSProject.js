import { useState, useEffect } from "react";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Button } from "@material-ui/core";

import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import StyledRadio from "../../assets/jss/nextjs-material-dashboard/New/StyledRadio";
import "../../assets/jss/nextjs-material-dashboard/New/MSProjectStyle.css";
import { CookiesProvider, useCookies } from "react-cookie";

const MSProject = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [status, setStatus] = useState({
    cookies: {
      username: 0,
      fullname: "",
      employeeid: 0,
    },
  });
  const [data, setData] = useState({
    selectRange: "1week",
    allProject: [],
    graph1: [],
    graph2: [],
    graph3: [],
    graph4: [],
  });
  const [state, setState] = useState({
    assignedProject: [],
  });
  const [selectedProject, setSelectedProject] = useState(0);
  const [selectedFeature, setFeature] = useState("WorkCompletion");

  const handleSelectedProject = e => {
    setSelectedProject(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      let result = await axios({
        method: "get",
        url: `/api/MSProject/${selectedProject}`,
        timeout: 5000, // 5 seconds timeout
        headers: {},
      });

      setData(prevState => ({
        ...prevState,
        allProject: result.data.recordsets[0],
        graph1: result.data.recordsets[1],
        graph2: result.data.recordsets[2],
        graph3: result.data.recordsets[3],
        graph4: result.data.recordsets[4],
      }));
    };
    trackPromise(fetchData());
  }, [selectedProject]);

  useEffect(() => {
    if (status.cookies.username !== 0) {
      if (status.cookies.username !== undefined) {
        axios({
          method: "post",
          url: `/api/dashboard/signin`,
          timeout: 1000, // 1 seconds timeout
          headers: {},
          data: {
            Username: status.cookies.username,
            Password: status.cookies.password,
          },
        }).then(response => {
          setState({
            assignedProject: response.data.result.recordsets[1],
          });
          if (response.data.result.recordsets[1].length > 0) {
            setSelectedProject(response.data.result.recordsets[1][0].ProjectID);
          }
        });
      }
    } else {
      setStatus({
        cookies: {
          username: cookies.username,
          password: cookies.password,
          fullname: cookies.fullname,
          employeeid: cookies.employeeid,
        },
      });
    }
  }, [status, cookies]);

  const { promiseInProgress } = usePromiseTracker();

  return (
    <>
      {promiseInProgress ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader
            style={{
              marginTop: "50px",
              marginBottom: "50px",
            }}
            type="Oval"
            color="#0ace83"
            height="100"
            width="100"
          />
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                marginLeft: "10px",
                marginTop: 0,
                marginBottom: 0,
                fontFamily: "Roboto, sans-serif",
                color: "#74646e",
                fontWeight: 500,
              }}
            >
              Project ID
            </p>
            <select
              value={selectedProject}
              onChange={handleSelectedProject}
              style={{
                marginLeft: "20px",
                fontFamily: "Roboto, sans-serif",
                display: "inline-block",
                color: "#74646e",
                border: "1px solid #c8bfc4",
                borderRadius: "4px",
                boxShadow: "inset 1px 1px 2px #ddd8dc",
                background: "#fff",
              }}
            >
              {state.assignedProject.map(item => {
                return (
                  <option value={item.ProjectID} key={item.ProjectID}>
                    {item.ProjectID}
                  </option>
                );
              })}
            </select>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <LineChart
              width={980}
              height={500}
              data={
                (data.selectRange === "1week" && data.graph1) ||
                (data.selectRange === "1month" && data.graph2) ||
                (data.selectRange === "3months" && data.graph3) ||
                (data.selectRange === "1year" && data.graph4)
              }
              margin={{ top: 20, right: 10, left: 10, bottom: 0 }}
            >
              <XAxis dataKey="Date" />
              {selectedFeature === "WorkCompletion" && (
                <YAxis type="number" domain={[0, 100]} />
              )}
              {selectedFeature === "EEAC" && (
                <YAxis domain={["dataMin - 10000", "dataMax + 10000"]} />
              )}

              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />

              {selectedFeature === "WorkCompletion" && (
                <Line
                  type="monotone"
                  dataKey="WorkCompletion"
                  stroke="#0ace83"
                  strokeWidth={3}
                  dot={data.selectRange === "1year" ? false : true}
                  isAnimationActive={true}
                />
              )}
              {selectedFeature === "EEAC" && (
                <Line
                  type="monotone"
                  dataKey="EEAC"
                  stroke="#6c85d8"
                  strokeWidth={3}
                  dot={data.selectRange === "1year" ? false : true}
                  isAnimationActive={true}
                />
              )}
            </LineChart>
            <div
              style={{
                marginTop: "20px",
                marginBottom: "10px",
              }}
            >
              <FormControl component="fieldset">
                <FormLabel component="legend" className="date-range-label">
                  Date Range
                </FormLabel>
                <RadioGroup
                  defaultValue="1week"
                  aria-label="gender"
                  name="customized-radios"
                >
                  <FormControlLabel
                    value="1week"
                    control={<StyledRadio />}
                    label="1 Week"
                    onClick={() =>
                      setData(prevState => ({
                        ...prevState,
                        selectRange: "1week",
                      }))
                    }
                    checked={data.selectRange === "1week" && true}
                  />
                  <FormControlLabel
                    value="1month"
                    control={<StyledRadio />}
                    label="1 Month"
                    onClick={() =>
                      setData(prevState => ({
                        ...prevState,
                        selectRange: "1month",
                      }))
                    }
                    checked={data.selectRange === "1month" && true}
                  />
                  <FormControlLabel
                    value="3months"
                    control={<StyledRadio />}
                    label="3 Months"
                    onClick={() =>
                      setData(prevState => ({
                        ...prevState,
                        selectRange: "3months",
                      }))
                    }
                    checked={data.selectRange === "3months" && true}
                  />
                  <FormControlLabel
                    value="1year"
                    control={<StyledRadio />}
                    label="1 Year"
                    onClick={() =>
                      setData(prevState => ({
                        ...prevState,
                        selectRange: "1year",
                      }))
                    }
                    checked={data.selectRange === "1year" && true}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div
            style={{
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <Button
              variant="outlined"
              style={{
                marginLeft: "20px",
                fontFamily: "Roboto, sans-serif",
                color:
                  selectedFeature === "WorkCompletion" ? "#1ec8db" : "grey",
              }}
              onClick={() => setFeature("WorkCompletion")}
            >
              Work Completion
            </Button>
            <Button
              variant="outlined"
              style={{
                marginLeft: "20px",
                fontFamily: "Roboto, sans-serif",
                color: selectedFeature === "EEAC" ? "#1ec8db" : "grey",
              }}
              onClick={() => setFeature("EEAC")}
            >
              EEAC
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default MSProject;
