import { useState, useEffect } from "react";
import Admin from "layouts/Admin.js";
import LoginComponent from "../../components/New/LoginComponent";
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios";
import { useTable, useBlockLayout, useSortBy } from "react-table";
import { formatDate } from "../../components/New/formatDate";
import Router, { useRouter } from "next/router";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import "./999project.css";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DateAdapter from "@date-io/date-fns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { Button } from "@mui/material";
import Link from "next/link";

const Project = () => {
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
          if (router.query.status !== "completed") {
            //In Progress
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
          } else {
          }
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

  const Accordion = styled(props => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&:hover": {
      color: "#109b84",
      backgroundColor: "#eff3f2",
      border: "2px solid",
    },
  }));

  const AccordionSummary = styled(props => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

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
        <>
          <div className="background">tes</div>
        </>
      )}
    </>
  );
};

Project.layout = Admin;

export default Project;