import { useState, useEffect } from "react";
import Admin from "layouts/Admin.js";
import LoginComponent from "../../../components/New/LoginComponent";
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios";

import Router, { useRouter } from "next/router";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import Loader from "react-loader-spinner";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import Link from "next/link";

import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import "./project.css";

const July112021 = () => {
  const useRowStyles = makeStyles({
    root: {
      "& > *": {
        borderBottom: "unset",
      },
    },
  });

  function createData(
    name,
    position,
    license,
    workstart,
    workend,
    mealstart,
    mealend,
    task,
    completion,
    workers
  ) {
    return {
      name,
      position,
      license,
      workstart,
      workend,
      mealstart,
      mealend,
      task,
      completion,
      workers,
      history: [
        { date: "2020-01-05", customerId: "11091700", amount: 3 },
        { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
      ],
    };
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();

    return (
      <>
        <TableRow className={classes.root}>
          <TableCell style={{ width: "30px", paddingBottom: 0, paddingTop: 0 }}>
            <IconButton aria-label="expand row" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell
            component="th"
            scope="row"
            style={{ paddingBottom: 0, paddingTop: 0, fontWeight: "800" }}
          >
            {row.name}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    {row.name == "Field Worker" && (
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Position</TableCell>
                        <TableCell align="right">Work Start</TableCell>
                        <TableCell align="right">Work End</TableCell>
                        <TableCell align="right">Task</TableCell>
                      </TableRow>
                    )}
                    {row.name == "Subcontractor" && (
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Subcontractor</TableCell>
                        <TableCell align="right">License</TableCell>
                        <TableCell align="right">Work Start</TableCell>
                        <TableCell align="right">Work End</TableCell>
                        <TableCell align="right">Task</TableCell>
                        <TableCell align="right">Completion</TableCell>
                        <TableCell align="right">Workers</TableCell>
                      </TableRow>
                    )}
                  </TableHead>
                  <TableBody>
                    {row.history.map(historyRow => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell align="right">{historyRow.amount}</TableCell>
                        <TableCell align="right">
                          {Math.round(historyRow.amount * row.price * 100) /
                            100}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }

  const rows = [
    createData("Field Worker"),
    createData("Subcontractor"),
    createData("Material Delivered"),
    createData("Exbon Team"),
    createData("Client"),
  ];

  const router = useRouter();

  const [data, setData] = useState(() => []);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [status, setStatus] = useState({
    cookies: {
      username: 0,
      password: 0,
      fullname: "",
      employeeid: 0,
    },
  });

  const signin = async (username, password) => {
    let promises = [];

    const fetchData = async () =>
      await axios({
        method: "post",
        url: `/api/dashboard/signin`,
        timeout: 5000, // 5 seconds timeout
        headers: {},
        data: {
          Username: username,
          Password: password,
        },
      })
        .then(response => {
          if (response.data.result.recordset[0] !== undefined) {
            setCookie("username", username, {
              path: "/",
              maxAge: 3600 * 24 * 30,
            });
            setCookie("password", password, {
              path: "/",
              maxAge: 3600 * 24 * 30,
            });
            setCookie("fullname", response.data.result.recordset[0].FullName, {
              path: "/",
              maxAge: 3600 * 24 * 30,
            });
            setCookie(
              "employeeid",
              response.data.result.recordset[0].EmployeeID,
              {
                path: "/",
                maxAge: 3600 * 24 * 30,
              }
            );
            setStatus(prevState => ({
              ...prevState,
              cookies: {
                username: username,
                password: password,
                fullname: response.data.result.recordset[0].FullName,
                employeeid: response.data.result.recordset[0].EmployeeID,
              },
            }));
          } else {
            alert("Login failed.");
          }
        })
        .catch(err => {
          alert(
            "Loading Error.(POST /api/dashboard/signin) \n\nPlease try again.\n\nPlease contact IT if the issue still persists. (Hyunmyung Kim 201-554-6666)\n\n" +
              err
          );
          setData(() => [
            {
              ProjectGroup: "",
              ProjectID: "",
              ProjectName: "No Permission",
              ContractAmount: "",
              Director: "",
              PIC: "",
              Associate1: "",
              Associate2: "",
              Associate3: "",
              Position: "",
              BaselineCost: "",
              EEAC: "",
              CV: "",
              CPI: "",
              ESPI: "",
              WorkCompletion: "",
              StartDate: "",
              FinishDate: "",
              Deadline: "",
              IsDesign: "",
              DesignParentID: "",
            },
          ]);
        });
    promises.push(fetchData());
    trackPromise(Promise.all(promises).then(() => {}));
  };

  useEffect(() => {
    let promises = [];

    const fetchData = async () => {
      if (status.cookies.username !== 0) {
        if (status.cookies.username !== undefined) {
          await axios({
            method: "post",
            url: `/api/dashboard/signin`,
            timeout: 5000, // 5 seconds timeout
            headers: {},
            data: {
              Username: status.cookies.username,
              Password: status.cookies.password,
            },
          }).then(response => {});
        }
      } else {
        if (router.query.hash !== undefined) {
          await axios({
            method: "post",
            url: `/api/dashboard/signin-pw`,
            timeout: 5000, // 5 seconds timeout
            headers: {},
            data: {
              hashstr: router.query.hash,
            },
          }).then(response => {
            const employeeInfo = response.data.result.recordsets[0][0];
            if (employeeInfo !== undefined) {
              setCookie("fullname", employeeInfo.FullName, {
                path: "/",
                maxAge: 3600 * 24 * 30,
              });
              setCookie("password", employeeInfo.Password, {
                path: "/",
                maxAge: 3600 * 24 * 30,
              });
              setCookie("username", employeeInfo.UserName, {
                path: "/",
                maxAge: 3600 * 24 * 30,
              });
              setCookie("employeeid", employeeInfo.EmployeeID, {
                path: "/",
                maxAge: 3600 * 24 * 30,
              });
              setStatus(prevState => ({
                ...prevState,
                cookies: {
                  username: employeeInfo.UserName,
                  password: employeeInfo.Password,
                  fullname: employeeInfo.FullName,
                  employeeid: employeeInfo.EmployeeID,
                },
              }));
            } else {
              alert("The user cannot be found.");
            }
          });
        } else {
          setStatus(prevState => ({
            ...prevState,
            cookies: {
              username: cookies.username,
              password: cookies.password,
              fullname: cookies.fullname,
              employeeid: cookies.employeeid,
            },
          }));
        }
      }
    };
    promises.push(fetchData());
    trackPromise(Promise.all(promises).then(() => {}));
  }, [status, router.query]);

  const { promiseInProgress } = usePromiseTracker();

  return (
    <>
      {promiseInProgress ? (
        <div
          style={{
            width: "100%",
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader
            type="BallTriangle"
            color="#31c4b0"
            height="150"
            width="150"
          />
        </div>
      ) : status.cookies.username === undefined ||
        status.cookies.employeeid === undefined ? (
        <LoginComponent signin={signin} />
      ) : data.length === 1 ? (
        <div
          style={{
            width: "100%",
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader
            type="BallTriangle"
            color="#31c4b0"
            height="150"
            width="150"
          />
        </div>
      ) : (
        <div className="background">
          <Box sx={{ width: "100%" }}>
            <Grid container>
              <Grid item xs={6}>
                <div style={{ display: "flex" }}>
                  <p className="title-day">Day 9</p>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      value={"07/11/2021"}
                      onChange={() => {}}
                      className="datepicker"
                      autoOk={true}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div style={{ width: "900px" }}>
                  <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                      <TableBody>
                        {rows.map(row => (
                          <Row key={row.name} row={row} />
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div
                  style={{
                    minHeight: "90vh",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderLeft: "2px dotted #7e7a7a",
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "0px",
                  }}
                >
                  <div style={{ padding: "1%" }}>
                    <h2
                      style={{
                        color: "#fcfaf8",
                        fontWeight: "400",
                        textAlign: "center",
                      }}
                    >
                      Assignment
                    </h2>
                    <p
                      style={{
                        marginTop: "40px",
                        marginBottom: "20px",
                        color: "#f7f3f0",
                        fontWeight: "500",
                        marginLeft: "5px",
                      }}
                    >
                      Today is the first day of construction.
                    </p>
                    <div
                      style={{
                        borderTop: "3px dotted #7e7a7a",
                        borderBottom: "3px dotted #7e7a7a",
                        borderRadius: "2px",
                        padding: "1%",
                        paddingBottom: "2%",
                      }}
                    >
                      <p style={{ color: "white", fontWeight: "500" }}>
                        Q1. Fill out timesheet and daily report for the day.
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "1%",
                      textAlign: "right",
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                      marginRight: "20px",
                      marginLeft: "20px",
                    }}
                  >
                    <Link href="#">
                      <Button variant="outlined" className="nextBtn">
                        PREVIOUS
                      </Button>
                    </Link>
                    <Link href="#">
                      <Button variant="contained" className="nextBtn">
                        NEXT
                      </Button>
                    </Link>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>
        </div>
      )}
    </>
  );
};

July112021.layout = Admin;

export default July112021;
