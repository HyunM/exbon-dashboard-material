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

import Profile1 from "../../../assets/img/faces/profile1.png";
import Profile2 from "../../../assets/img/faces/profile2.png";
import Profile3 from "../../../assets/img/faces/profile3.png";
import Profile4 from "../../../assets/img/faces/profile4.png";
import Profile5 from "../../../assets/img/faces/profile5.png";
import Profile6 from "../../../assets/img/faces/profile6.png";
import Profile7 from "../../../assets/img/faces/profile7.png";
import Subcontractor1 from "../../../assets/img/faces/sub1.png";
import Subcontractor2 from "../../../assets/img/faces/sub2.png";
import Vendor1 from "../../../assets/img/faces/vendor1.png";
import Vendor3 from "../../../assets/img/faces/vendor3.png";

import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { wrikeConfig } from "../../../WrikeAPI.js";
import "./project.css";

const Day9_1 = () => {
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
      history: [],
      fieldworker: [],
    };
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(true);
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
                    {row.name == "Subcontractor" && (
                      <TableRow>
                        <TableCell width="15%" align="center">
                          Subcontractor
                        </TableCell>
                        <TableCell className="test" width="14%">
                          License
                        </TableCell>
                        <TableCell align="center" width="12%">
                          Work Start
                        </TableCell>
                        <TableCell align="center" width="12%">
                          Work End
                        </TableCell>
                        <TableCell width="31%">Task</TableCell>
                        <TableCell width="6%">Completion</TableCell>
                        <TableCell width="6%">Workers</TableCell>
                      </TableRow>
                    )}

                    {row.name == "Exbon Team" && (
                      <TableRow>
                        <TableCell width="10%"></TableCell>
                        <TableCell align="left" width="20%">
                          Name
                        </TableCell>

                        <TableCell align="left" width="70%">
                          Description
                        </TableCell>
                      </TableRow>
                    )}
                    {row.name == "Client" && (
                      <TableRow>
                        <TableCell width="10%"></TableCell>
                        <TableCell align="left" width="20%">
                          Name
                        </TableCell>

                        <TableCell align="left" width="70%">
                          Description
                        </TableCell>
                      </TableRow>
                    )}
                  </TableHead>
                  <TableBody>
                    {/* {row.history.map(historyRow => (
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
                    ))} */}

                    {row.name == "Subcontractor" && (
                      <>
                        {/* Subcontractor1 */}
                        <TableRow>
                          <TableCell>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <img
                                src={Subcontractor1}
                                style={{
                                  width: "100px",
                                  cursor: "pointer",
                                }}
                              />
                              <span style={{ textAlign: "center" }}>
                                T-Wall Enterprise
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>B General Carpentry</TableCell>
                          <TableCell align="center"></TableCell>
                          <TableCell align="center"></TableCell>
                          <TableCell>No Work</TableCell>
                          <TableCell align="right"></TableCell>
                          <TableCell align="right"></TableCell>
                        </TableRow>

                        {/* Subcontractor2 */}
                        <TableRow>
                          <TableCell>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <img
                                src={Subcontractor2}
                                style={{
                                  width: "100px",
                                  cursor: "pointer",
                                }}
                              />
                              <span style={{ textAlign: "center" }}>
                                Conti Corporation
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>C10 Electrical</TableCell>
                          <TableCell align="center"></TableCell>
                          <TableCell align="center"></TableCell>
                          <TableCell></TableCell>
                          <TableCell align="right"></TableCell>
                          <TableCell align="right"></TableCell>
                        </TableRow>
                      </>
                    )}
                    {row.name == "Material Delivered" && (
                      <>
                        {/* Vendor1 */}
                        <TableRow>
                          <TableCell rowSpan={4}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <img
                                src={Vendor1}
                                style={{
                                  width: "80px",
                                  height: "40px",
                                  cursor: "pointer",
                                }}
                              />
                              <span style={{ textAlign: "center" }}>
                                Ganahl Lumber
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="center" rowSpan={4}>
                            10:00
                          </TableCell>
                          <TableCell>Door Frame</TableCell>
                          <TableCell>EA</TableCell>
                          <TableCell align="right">4</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Laminated Door</TableCell>
                          <TableCell>EA</TableCell>
                          <TableCell align="right">4</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Door Hardware - Hinge</TableCell>
                          <TableCell>EA</TableCell>
                          <TableCell align="right">12</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Door Hardware - Lockset</TableCell>
                          <TableCell>EA</TableCell>
                          <TableCell align="right">12</TableCell>
                        </TableRow>

                        {/* Vendor2 */}
                        <TableRow>
                          <TableCell rowSpan={2}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <img
                                src={Vendor3}
                                style={{
                                  width: "80px",
                                  height: "40px",
                                  cursor: "pointer",
                                }}
                              />
                              <span style={{ textAlign: "center" }}>AMS</span>
                            </div>
                          </TableCell>
                          <TableCell align="center" rowSpan={2}>
                            13:00
                          </TableCell>
                          <TableCell>Acoustical Ceiling Tile</TableCell>
                          <TableCell>Box</TableCell>
                          <TableCell align="right">4</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Ceiling Tile Adhesive</TableCell>
                          <TableCell>Carton</TableCell>
                          <TableCell align="right">4</TableCell>
                        </TableRow>
                      </>
                    )}
                    {row.name == "Exbon Team" && (
                      <>
                        {/* Person1 */}
                        <TableRow>
                          <TableCell component="th" scope="row">
                            <img
                              src={Profile4}
                              style={{
                                width: "70px",
                                height: "70px",
                                cursor: "pointer",
                              }}
                            />
                          </TableCell>
                          <TableCell>Exbon PC</TableCell>
                          <TableCell>Work with PIC to review a CO</TableCell>
                        </TableRow>
                      </>
                    )}
                    {row.name == "Client" && (
                      <>
                        {/* Client1 */}
                        <TableRow>
                          <TableCell component="th" scope="row">
                            <img
                              src={Profile5}
                              style={{
                                width: "70px",
                                height: "70px",
                                cursor: "pointer",
                              }}
                            />
                          </TableCell>
                          <TableCell>Owner PM</TableCell>
                          <TableCell>
                            RFI response sent back to Contractor with Field
                            Instruction
                          </TableCell>
                        </TableRow>

                        {/* Client2 */}
                        <TableRow>
                          <TableCell component="th" scope="row" rowSpan={2}>
                            <img
                              src={Profile6}
                              style={{
                                width: "70px",
                                height: "70px",
                                cursor: "pointer",
                              }}
                            />
                          </TableCell>
                          <TableCell>Owner Inspector</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </>
                    )}
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
    // createData("Field Worker"),
    createData("Subcontractor"),
    // createData("Material Delivered"),
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
          if (status.cookies.username == 1) {
            return null;
          }
          await axios({
            method: "post",
            url: `/api/dashboard/signin`,
            timeout: 5000, // 5 seconds timeout
            headers: {},
            data: {
              Username: status.cookies.username,
              Password: status.cookies.password,
            },
          }).then(response => {
            if (response.data.result.recordset.length == 0) {
              removeCookie("fullname");
              removeCookie("password");
              removeCookie("username");
              removeCookie("employeeid");
              setStatus(prevState => ({
                ...prevState,
                cookies: {
                  username: 1,
                  password: 1,
                  fullname: 1,
                  employeeid: 1,
                },
              }));
              alert("Login Failed.");
            }
          });
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

  const handleNext = async () => {
    let promises = [];

    const fetchData = async () => {
      await axios({
        method: "get",
        url: `/api/training/training-progress?employeeID=${cookies.employeeid}&day=9&part=1`,
        timeout: 5000, // 5 seconds timeout
        headers: {},
      }).then(async response => {
        const resultProgress = response.data.result.recordsets[0];
        if (resultProgress.length == 0) {
          await axios({
            method: "get",
            url: `/api/training/rfi-log?employeeID=${cookies.employeeid}`,
            timeout: 5000, // 5 seconds timeout
            headers: {},
          }).then(async response => {
            const resultRFI = response.data.result.recordsets[0];
            if (resultRFI.length == 0) {
              alert("No RFI log created!");
            } else {
              const RfiID = resultRFI[0].WrikeID;
              await axios({
                method: "get",
                url: `/api/training/change-order-log?employeeID=${cookies.employeeid}`,
                timeout: 5000, // 5 seconds timeout
                headers: {},
              }).then(async response => {
                const resultCO = response.data.result.recordsets[0];
                if (resultCO.length == 0) {
                  alert("No Change Order log created!");
                } else {
                  const CoID = resultCO[0].WrikeID;
                  await axios({
                    method: "get",
                    url: `https://www.wrike.com/api/v4/tasks/${RfiID}`,
                    timeout: 5000, // 5 seconds timeout
                    headers: {
                      Authorization: wrikeConfig.apikey,
                    },
                  }).then(async response => {
                    const dataRfi = response.data.data;
                    if (
                      dataRfi[0].customStatusId != "IEACA7BEJMCIU22M" //Upload Response (PIC)
                    ) {
                      alert("Wrike task's status in incorrect! - RFI");
                    } else {
                      await axios({
                        method: "get",
                        url: `https://www.wrike.com/api/v4/tasks/${CoID}`,
                        timeout: 5000, // 5 seconds timeout
                        headers: {
                          Authorization: wrikeConfig.apikey,
                        },
                      }).then(async response => {
                        const dataCo = response.data.data;
                        if (
                          dataCo[0].customStatusId != "IEACA7BEJMCIU3YC" //Create Proposal (Est)
                        ) {
                          alert("Wrike task's status in incorrect! - CO");
                        } else {
                          await axios({
                            method: "post",
                            url: `https://www.wrike.com/api/v4/tasks/${RfiID}/comments`,
                            timeout: 5000, // 5 seconds timeout
                            headers: {
                              Authorization: wrikeConfig.apikey,
                            },
                            data: {
                              plainText: false,
                              text: `<a class="stream-user-id avatar ai-936361 quasi-contact" rel="@assignees">@assignees</a> Project Control: Proceed with creating a Change Order log.`,
                            },
                          }).then(async response => {
                            await axios({
                              method: "put",
                              url: `https://www.wrike.com/api/v4/tasks/${RfiID}`,
                              timeout: 5000, // 5 seconds timeout
                              headers: {
                                Authorization: wrikeConfig.apikey,
                              },
                              data: {
                                customStatus: "IEACA7BEJMCIU22W",
                              },
                            }).then(async response => {
                              await axios({
                                method: "post",
                                url: `https://www.wrike.com/api/v4/tasks/${CoID}/comments`,
                                timeout: 5000, // 5 seconds timeout
                                headers: {
                                  Authorization: wrikeConfig.apikey,
                                },
                                data: {
                                  plainText: false,
                                  text: `<a class="stream-user-id avatar ai-936361 quasi-contact" rel="@assignees">@assignees</a> Project Control: Please see attached CO proposal. Please submit this to Owner.`,
                                },
                              }).then(async response => {
                                await axios({
                                  method: "get",
                                  url: `https://www.wrike.com/api/v4/tasks/${CoID}`,
                                  timeout: 5000, // 5 seconds timeout
                                  headers: {
                                    Authorization: wrikeConfig.apikey,
                                  },
                                }).then(async response => {
                                  await axios({
                                    method: "get",
                                    url: `/api/training/file-sender-day9_1-1?taskid=${CoID}`,
                                    timeout: 15000, // 5 seconds timeout
                                    headers: {},
                                  }).then(async response => {
                                    await axios({
                                      method: "get",
                                      url: `/api/training/file-sender-day9_1-2?taskid=${CoID}`,
                                      timeout: 15000, // 5 seconds timeout
                                      headers: {},
                                    }).then(async response => {
                                      await axios({
                                        method: "put",
                                        url: `https://www.wrike.com/api/v4/tasks/${CoID}`,
                                        timeout: 5000, // 5 seconds timeout
                                        headers: {
                                          Authorization: wrikeConfig.apikey,
                                        },
                                        data: {
                                          customStatus: "IEACA7BEJMCIU3YM",
                                        },
                                      }).then(async response => {
                                        await axios({
                                          method: "post",
                                          url: `/api/training/training-progress`,
                                          timeout: 5000, // 5 seconds timeout
                                          headers: {},
                                          data: {
                                            employeeID: cookies.employeeid,
                                            day: 9,
                                            part: 1,
                                          },
                                        }).then(response => {
                                          router.push(`./Day9_2`);
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        } else {
          router.push(`./Day9_2`);
        }
      });
    };

    promises.push(fetchData());
    trackPromise(Promise.all(promises).then(() => {}));
  };
  return (
    <>
      {promiseInProgress || status.cookies.username == 1 ? (
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
              <Grid item xs={8} style={{ height: "90vh", overflow: "auto" }}>
                <div>
                  <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        value={"07/14/2021"}
                        onChange={() => {}}
                        className="datepicker"
                        autoOk={true}
                        disabled
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                  {/* <div
                    style={{
                      display: "flex",
                      flexGrow: "4",
                    }}
                  >
                    <h2 className="title-day">Day 9 - Sample Project</h2>
                  </div> */}
                </div>
                <div style={{ width: "98%", marginTop: "10px" }}>
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
              <Grid item xs={4} style={{ height: "90vh", overflow: "auto" }}>
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
                    backgroundColor: "#5e5a5a",
                  }}
                >
                  <div style={{ padding: "1%" }}>
                    <h2 className="title-day">Day 9 Part 1</h2>
                    <h3
                      style={{
                        color: "#fcfaf8",
                        fontWeight: "400",
                        textAlign: "center",
                        marginTop: "10px",
                      }}
                    >
                      Daily Note
                    </h3>
                    <div style={{ textAlign: "center" }}>
                      {/* Link -> OneDrive download click -> Chrome Development Settings -> Network API */}
                      {/* <Link href="https://exboncom-my.sharepoint.com/personal/hammer_exbon_com/_layouts/15/download.aspx?UniqueId=54b02ca3%2D16b7%2D4a9b%2Db852%2Dc5f75ca6a92b">
                        <CloudDownloadIcon className="Onedrive-download-icon" />
                      </Link> */}
                    </div>
                    <p
                      style={{
                        marginTop: "10px",
                        marginBottom: "30px",
                        color: "#f7f3f0",
                        fontWeight: "500",
                        marginLeft: "5px",
                      }}
                    >
                      1. Owner sent Field Instruction along with RFI response to
                      proceed via Email.
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
                      <h3
                        style={{
                          color: "#fcfaf8",
                          fontWeight: "400",
                          textAlign: "center",
                          marginTop: "0px",
                        }}
                      >
                        Assignment
                      </h3>
                      <p
                        style={{
                          color: "white",
                          fontWeight: "500",
                          marginBottom: "30px",
                        }}
                      >
                        0902 . Upload Customer Response to RFI Log and complete
                        the Wrike process. (Refer to CO 11 RFI Log in LMS
                        Training)
                      </p>
                      <p
                        style={{
                          color: "white",
                          fontWeight: "500",
                          marginBottom: "30px",
                        }}
                      >
                        0903 . CO Log : Generate Change Order Log in Hammer CO
                        Log and Change Status to "Create a Proposal". Wrike Task
                        can be accessed by clicking the "Wrike" button in Hammer
                        CO Log.
                      </p>
                      <p
                        style={{
                          color: "white",
                          fontWeight: "500",
                          marginBottom: "30px",
                        }}
                      >
                        0904 . Upload FI in One Drive.
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
                    <Link href="./Day8_2">
                      <Button variant="outlined" className="nextBtn">
                        PREVIOUS
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      className="nextBtn"
                      onClick={() => handleNext()}
                    >
                      NEXT
                    </Button>
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

Day9_1.layout = Admin;

export default Day9_1;
