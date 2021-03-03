import Admin from "layouts/Admin.js";
import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { useTable, useBlockLayout } from "react-table";
import DateFnsUtils from "@date-io/date-fns";
import { formatDate } from "../../../components/New/formatDate";
import TextField from "@material-ui/core/TextField";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { deepOrange, blue } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { toast } from "react-toastify";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import Modal from "react-modal";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import Router, { useRouter } from "next/router";
import NotPermission from "./NotPermission";
import { CookiesProvider, useCookies } from "react-cookie";

import "./task-completion.css";

Modal.setAppElement("#modalForTasksTab");

let noWorkMapKey = -1;
let projectInfoTab2;

toast.configure();
const themeForWorkDate = createMuiTheme({
  palette: {
    primary: deepOrange,
  },

  typography: {
    fontSize: 12,
    textAlign: "center",
  },
});

const themeForNoWork = createMuiTheme({
  palette: {
    primary: {
      main: blue["300"],
    },
  },

  typography: {
    fontSize: 12,
    textAlign: "center",
  },
});

const TaskCompletion = (
  {
    // projectState,
    // setProjectState,
    // employeeInfo,
    // setPreviousProject,
  }
) => {
  const router = useRouter();
  const projectState = "6102";

  const [cookies, setCookie, removeCookie] = useCookies();
  const [status, setStatus] = useState({
    cookies: {
      username: 0,
      password: 0,
      fullname: "",
      employeeid: 0,
    },
    permission: true,
  });

  const columns = useMemo(
    () => [
      {
        Header: "Section",
        accessor: "Section",
        width: 65,
      },
      {
        Header: "Summary Task",
        accessor: "Trade",
        width: 160,
      },

      {
        Header: "Task",
        accessor: "TaskName",
        width: 360,
      },
      {
        Header: "Resource",
        accessor: "Company",
        width: 260,
      },
      {
        Header: "Start Date",
        accessor: "StartDate",
        width: 100,
      },
      {
        Header: "Finish Date",
        accessor: "FinishDate",
        width: 100,
      },
      {
        Header: "Request Start Date",
        accessor: "ReqStartDate",
        width: 100,
      },
      {
        Header: "Request Finish Date",
        accessor: "ReqFinishDate",
        width: 100,
      },
      // {
      //   Header: "Finish Date",
      //   accessor: "FinishDate",
      //   width: 90,
      // },
      {
        Header: "Previous Work %",
        accessor: "PreviousWork",
        width: 70,
      },
      {
        Header: "Current Work %",
        accessor: "CurrentWork",
        width: 70,
      },
      // {
      //   Header: "Message",
      //   accessor: "Trade",
      //   align: "center",
      //   width: 377,
      // },
    ],
    []
  );

  const [data, setData] = useState(() => []);
  const [noWork, setNoWork] = useState(() => []);

  const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    row,
    updateMyData, // This is a custom function that we supplied to our table instance
  }) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue);

    const onChange = e => {
      setValue(e.target.value);
    };

    const onChangePercent = e => {
      //e.nativeEvent.data => User input data (On Firefox, in case of arrow, next value)
      //e.target.value => future value
      if (e.nativeEvent.data) {
        if (e.nativeEvent.data.length > 1) {
          //For Firefox
          setValue(e.target.value);
          updateMyData(index, id, e.target.value);
        } else if (
          e.nativeEvent.data !== "0" &&
          e.nativeEvent.data !== "1" &&
          e.nativeEvent.data !== "2" &&
          e.nativeEvent.data !== "3" &&
          e.nativeEvent.data !== "4" &&
          e.nativeEvent.data !== "5" &&
          e.nativeEvent.data !== "6" &&
          e.nativeEvent.data !== "7" &&
          e.nativeEvent.data !== "8" &&
          e.nativeEvent.data !== "9"
        ) {
          setValue("0");
          updateMyData(index, id, "0");
        } else if (e.nativeEvent.data === "0") {
          if (e.target.value === "100") {
            setValue("100");
            updateMyData(index, id, "100");
          } else if (
            e.target.value.length > 2 &&
            e.target.value.includes("50")
          ) {
            setValue("0");
            updateMyData(index, id, "0");
          } else if (e.target.value.includes("2")) {
            setValue("20");
            updateMyData(index, id, "20");
          } else if (e.target.value.includes("3")) {
            setValue("30");
            updateMyData(index, id, "30");
          } else if (e.target.value.includes("4")) {
            setValue("40");
            updateMyData(index, id, "40");
          } else if (e.target.value.includes("5")) {
            setValue("50");
            updateMyData(index, id, "50");
          } else if (e.target.value.includes("6")) {
            setValue("60");
            updateMyData(index, id, "60");
          } else if (e.target.value.includes("7")) {
            setValue("70");
            updateMyData(index, id, "70");
          } else if (e.target.value.includes("8")) {
            setValue("80");
            updateMyData(index, id, "80");
          } else if (e.target.value.includes("9")) {
            setValue("90");
            updateMyData(index, id, "90");
          } else {
            setValue("0");
            updateMyData(index, id, "0");
          }
        } else if (e.nativeEvent.data === "1") {
          setValue("10");
          updateMyData(index, id, "10");
        } else if (e.nativeEvent.data === "2") {
          setValue("20");
          updateMyData(index, id, "20");
        } else if (e.nativeEvent.data === "3") {
          setValue("30");
          updateMyData(index, id, "30");
        } else if (e.nativeEvent.data === "4") {
          setValue("40");
          updateMyData(index, id, "40");
        } else if (e.nativeEvent.data === "5") {
          if (e.target.value === "5") {
            setValue("5");
            updateMyData(index, id, "5");
          } else if (e.target.value === "05") {
            setValue("5");
            updateMyData(index, id, "5");
          } else if (e.target.value === "55") {
            setValue("55");
            updateMyData(index, id, "55");
          } else if (
            e.target.value.length > 2 &&
            e.target.value.includes("55")
          ) {
            setValue("5");
            updateMyData(index, id, "5");
          } else if (e.target.value.includes("1")) {
            setValue("15");
            updateMyData(index, id, "15");
          } else if (e.target.value.includes("2")) {
            setValue("25");
            updateMyData(index, id, "25");
          } else if (e.target.value.includes("3")) {
            setValue("35");
            updateMyData(index, id, "35");
          } else if (e.target.value.includes("4")) {
            setValue("45");
            updateMyData(index, id, "45");
          } else if (e.target.value.includes("6")) {
            setValue("65");
            updateMyData(index, id, "65");
          } else if (e.target.value.includes("7")) {
            setValue("75");
            updateMyData(index, id, "75");
          } else if (e.target.value.includes("8")) {
            setValue("85");
            updateMyData(index, id, "85");
          } else if (e.target.value.includes("9")) {
            setValue("95");
            updateMyData(index, id, "95");
          } else {
            setValue("0");
            updateMyData(index, id, "0");
          }
        } else if (e.nativeEvent.data === "6") {
          setValue("60");
          updateMyData(index, id, "60");
        } else if (e.nativeEvent.data === "7") {
          setValue("70");
          updateMyData(index, id, "70");
        } else if (e.nativeEvent.data === "8") {
          setValue("80");
          updateMyData(index, id, "80");
        } else if (e.nativeEvent.data === "9") {
          setValue("90");
          updateMyData(index, id, "90");
        } else if (e.nativeEvent.data === ".") {
          setValue("0");
          updateMyData(index, id, "0");
        }
      } else {
        if (e.nativeEvent.data === undefined) {
          setValue(e.target.value);
          updateMyData(index, id, e.target.value);
        } else {
          setValue("0");
          updateMyData(index, id, "0");
        }
      }
    };

    const onChangeDatePicker = e => {
      setValue(e);
    };

    const selectReqStartDate = e => {
      updateReqStartDate(index, id, value, e);
    };

    const selectReqFinishDate = e => {
      updateReqFinishDate(index, id, value, e);
    };
    // We'll only update the external data when the input is blurred
    const onBlur = () => {
      updateMyData(index, id, value);
    };

    const onBlurForCurrentWork = e => {
      updateMyData(index, id, value);
    };

    const handleModalWorkDate = (
      type,
      Company,
      TaskID,
      TaskName,
      StartDate,
      FinishDate,
      ReqStartDate,
      ReqFinishDate
    ) => {
      updateModalWorkDate(
        index,
        type,
        Company,
        TaskID,
        TaskName,
        StartDate,
        FinishDate,
        ReqStartDate,
        ReqFinishDate
      );
    };

    const preventNegativeNumber = e => {
      if (e.key === "-" || e.key === "+" || e.key === ".") {
        setValue("0");
      }
    };

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);
    // if (id === "RecordID") {
    //   return (
    //     <>
    //       <ReportIcon
    //         color="secondary"
    //         className={styles["table__report-icon"]}
    //         data-tip="Praesent non nunc mollis, fermentum neque at"
    //       />
    //       <ReactTooltip />
    //     </>
    //   );
    if (id === "Trade") {
      return (
        <div className="table__trade-wrapper">
          <span className="table__trade-wrapper__data">{value}</span>
        </div>
      );
    } else if (id === "Section") {
      return (
        <div className="table__section-wrapper">
          <span className="table__section-wrapper__data">{value}</span>
        </div>
      );
    } else if (id === "Company") {
      return (
        <div className="table__company-wrapper">
          <span className="table__company-wrapper__data">{value}</span>
        </div>
      );
    } else if (id === "TaskName") {
      return (
        <div className="table__task-name-wrapper">
          <span className="table__task-name-wrapper__data">{value}</span>
        </div>
      );
    } else if (id === "StartDate") {
      return (
        <div className="table__start-date-wrapper">
          <span className="table__start-date-wrapper__data">{value}</span>
        </div>
      );
    } else if (id === "FinishDate") {
      return (
        <div className="table__finish-date-wrapper">
          <span
            className="table__finish-date-wrapper__data"
            // onClick={() =>
            //   handleModalWorkDate(
            //     "Finish Date",
            //     row.original.Company,
            //     row.original.TaskID,
            //     row.original.TaskName,
            //     row.original.StartDate,
            //     row.original.FinishDate,
            //     row.original.ReqStartDate,
            //     row.original.ReqFinishDate
            //   )
            // }
          >
            {value}
          </span>
        </div>
      );
    } else if (id === "ReqStartDate") {
      return (
        <div className="table__req-start-date-wrapper">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ThemeProvider theme={themeForWorkDate}>
              <DatePicker
                disableToolbar
                variant="inline"
                value={value === null ? row.original.StartDate : value}
                format="MM/dd/yyyy"
                autoOk={true}
                className={
                  value === null
                    ? "table__req-start-date-wrapper__date-picker"
                    : "table__req-start-date-wrapper__date-picker-request"
                }
                onChange={selectReqStartDate}
              />
            </ThemeProvider>
          </MuiPickersUtilsProvider>
        </div>
        /* {value === null ? row.original.StartDate : value} */
      );
    } else if (id === "ReqFinishDate") {
      return (
        <div className="table__req-finish-date-wrapper">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ThemeProvider theme={themeForWorkDate}>
              <DatePicker
                disableToolbar
                variant="inline"
                value={value === null ? row.original.FinishDate : value}
                format="MM/dd/yyyy"
                autoOk={true}
                className={
                  value === null
                    ? "table__req-finish-date-wrapper__date-picker"
                    : "table__req-finish-date-wrapper__date-picker-request"
                }
                onChange={selectReqFinishDate}
              />
            </ThemeProvider>
          </MuiPickersUtilsProvider>
        </div>
      );
    } else if (id === "PreviousWork") {
      return (
        <div className="table__previous-work-wrapper">
          <span className="table__previous-work-wrapper__data">{value} %</span>
        </div>
      );
    } else if (id === "CurrentWork") {
      let previousWork;
      row.allCells.forEach(horizontalLine => {
        if (horizontalLine.column.Header === "Previous Work %") {
          previousWork = horizontalLine.value;
        }
      });
      return (
        <div className="table__current-work-wrapper">
          <span className="table__current-work-wrapper__data">
            {value === null ? (
              <input
                className="table__current-work-wrapper__input__previous-work"
                value={previousWork}
                type="number"
                onChange={onChangePercent}
                onBlur={onBlurForCurrentWork}
                min="0"
                max="100"
                step="5"
                onKeyDown={preventNegativeNumber}
              ></input>
            ) : (
              <input
                className="table__current-work-wrapper__input__current-work"
                value={value}
                type="number"
                onChange={onChangePercent}
                onBlur={onBlurForCurrentWork}
                min="0"
                max="100"
                step="5"
                onKeyDown={preventNegativeNumber}
              ></input>
            )}
            %
          </span>
        </div>
      );
    }
  };

  // Set our editable cell renderer as the default Cell renderer
  const defaultColumn = {
    Cell: EditableCell,
  };

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const updateReqStartDate = (rowIndex, columnId, value, date) => {
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            ReqStartDate: formatDate(date),
            NewReqStartDate: formatDate(date),
            ReqFinishDate:
              row.ReqFinishDate === null ? row.FinishDate : row.ReqFinishDate,
            NewReqFinishDate:
              row.NewReqFinishDate === null
                ? row.FinishDate
                : row.NewReqFinishDate,
          };
        }
        return row;
      })
    );
  };

  const updateReqFinishDate = (rowIndex, columnId, value, date) => {
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            ReqFinishDate: formatDate(date),
            NewReqFinishDate: formatDate(date),
            ReqStartDate:
              row.ReqStartDate === null ? row.StartDate : row.ReqStartDate,
            NewReqStartDate:
              row.NewReqStartDate === null
                ? row.StartDate
                : row.NewReqStartDate,
          };
        }
        return row;
      })
    );
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      updateMyData,
    },
    useBlockLayout
  );

  const now = new Date().toLocaleString({
    timeZone: "America/Los_Angeles",
  });

  const [selectedDate, setSelectedDate] = useState(now);

  const dateCheckEditable = str => {
    const getSunday = d => {
      d = new Date(d);
      let day = d.getDay(),
        diff = d.getDate() - day;
      return new Date(d.setDate(diff));
    };

    const date_diff_indays = (date1, date2) => {
      return Math.floor(
        (Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate()) -
          Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate())) /
          (1000 * 60 * 60 * 24)
      );
    };

    const toStr = str.toLocaleString();

    const newStr =
      toStr.split("/")[0] +
      "/" +
      toStr.split("/")[1] +
      "/" +
      toStr.split("/")[2];

    const dateFromStr = new Date(newStr);
    const sundayOfSelected = getSunday(dateFromStr);
    const sundayOfToday = getSunday(now);

    if (date_diff_indays(sundayOfToday, sundayOfSelected) >= 0) return true;
    else return false;
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleSaveBtn = () => {
    let promises = [];
    const fetchData = async () => {
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].NewReqStartDate !== null ||
          data[i].NewReqFinishDate !== null
        ) {
          promises.push(
            axios({
              method: "POST",
              url: `/api/project-date-change-request`,
              timeout: 3000, // 3 seconds timeout
              headers: {},
              data: {
                EmployeeID: status.cookies.employeeid,
                ProjectID: projectState,
                RequestType: "Task",
                RequestID: data[i].TaskID,
                StartDate: data[i].ReqStartDate,
                EndDate: data[i].ReqFinishDate,
                Reason: null,
              },
            })
          );
        }

        if (!(data[i].CurrentWork === null || data[i].CurrentWork === "")) {
          promises.push(
            axios({
              method: "put",
              url: `/api/project-tasks-progress`,
              timeout: 3000,
              headers: {},
              data: {
                TaskID: data[i].TaskID,
                Date: document.getElementById("datePickerDialog").value,
                WorkCompleted: data[i].CurrentWork,
              },
            })
          );
        }
      }

      noWork.forEach(item => {
        let reason = item.Note;
        if (reason === "") {
          reason = null;
        }
        if (item.OrderStatus === "3") {
          if (item.Status === "Request For New") {
            promises.push(
              axios({
                method: "POST",
                url: `/api/project-date-change-request`,
                timeout: 3000, // 3 seconds timeout
                headers: {},
                data: {
                  EmployeeID: status.cookies.employeeid,
                  ProjectID: projectState,
                  RequestType: "No Work",
                  RequestID: null,
                  StartDate: item.StartDate,
                  EndDate: item.FinishDate,
                  Reason: reason,
                },
              })
            );
          } else if (item.Status === "Request For Edit") {
            promises.push(
              axios({
                method: "POST",
                url: `/api/project-date-change-request`,
                timeout: 3000, // 3 seconds timeout
                headers: {},
                data: {
                  EmployeeID: status.cookies.employeeid,
                  ProjectID: projectState,
                  RequestType: "No Work Modify",
                  RequestID: item.RecordID,
                  StartDate: item.StartDate,
                  EndDate: item.FinishDate,
                  Reason: reason,
                },
              })
            );
          } else if (item.Status === "Request For Delete") {
            promises.push(
              axios({
                method: "POST",
                url: `/api/project-date-change-request`,
                timeout: 3000, // 3 seconds timeout
                headers: {},
                data: {
                  EmployeeID: status.cookies.employeeid,
                  ProjectID: projectState,
                  RequestType: "No Work Delete",
                  RequestID: item.RecordID,
                  StartDate: item.StartDate,
                  EndDate: item.FinishDate,
                  Reason: reason,
                },
              })
            );
          }
        }
      });
    };

    trackPromise(fetchData());

    trackPromise(
      Promise.all(promises).then(() => {
        toast.success(
          <div className="alert__complete">
            <strong>Save Complete</strong>
          </div>,
          {
            position: toast.POSITION.BOTTOM_CENTER,
            hideProgressBar: true,
          }
        );

        let tempData = [];

        data.forEach(item => {
          const singleItem = {
            ...item,
            NewReqStartDate: null,
            NewReqFinishDate: null,
          };
          tempData = [...tempData, singleItem];
        });
        setData(tempData);

        let tempNoWork = [];

        noWork.forEach(item => {
          let singleItem = { ...item };
          if (item.OrderStatus === "3") {
            singleItem = {
              ...item,
              OrderStatus: "2",
            };
          }

          tempNoWork = [...tempNoWork, singleItem];
        });
        setNoWork(tempNoWork);
      })
    );

    axios({
      method: "post",
      url: `/api/log-daily-reports`,
      timeout: 3000, // 5 seconds timeout
      headers: {},
      data: {
        EmployeeID: status.cookies.employeeid,
        ProjectID: projectState,
        Date: formatDate(selectedDate),
        Category: "Tasks",
        Action: "update",
      },
    });
  };

  useEffect(() => {
    if (status.cookies.username !== 0) {
      if (status.cookies.username !== undefined) {
        axios({
          method: "post",
          url: `/api/daily-report/signin`,
          timeout: 3000, // 2 seconds timeout
          headers: {},
          data: {
            Username: status.cookies.username,
            Password: status.cookies.password,
          },
        }).then(response => {
          const assignedProject = response.data.result.recordsets[1];

          if (status.permission === true && projectState !== undefined) {
            let check = 0;
            for (let i = 0; i < assignedProject.length; i++) {
              if (assignedProject[i].ProjectID.toString() === projectState) {
                check++;
                break;
              }
            }
            if (check === 0) {
              setStatus(prevState => ({
                ...prevState,
                permission: false,
              }));
            }
          }
        });
      }
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

    if (status.permission === true && projectState !== undefined) {
      const fetchData = async () => {
        let result1 = await axios({
          method: "get",
          url: `/api/project-tasks-progress?selectedDate=${formatDate(
            selectedDate
          )}&projectID=${projectState}`,
          timeout: 3000, // 5 seconds timeout
          headers: {},
        });

        // setData(result1.data.result[0]);
        setData([
          {
            TaskID: 464,
            ProjectID: 6102,
            RecordID: 1711,
            TaskName: "Notice to Proceed",
            Trade: null,
            Company: null,
            Section: null,
            StartDate: "10/02/2020",
            FinishDate: "10/02/2020",
            ReqStartDate: null,
            ReqFinishDate: null,
            NewReqStartDate: null,
            NewReqFinishDate: null,
            LastDate: "2021-01-14T00:00:00.000Z",
            CurrentWork: null,
            PreviousWork: 100,
          },
          {
            TaskID: 465,
            ProjectID: 6102,
            RecordID: 1713,
            TaskName: "Mobilization",
            Trade: null,
            Company: null,
            Section: null,
            StartDate: "01/11/2021",
            FinishDate: "01/11/2021",
            ReqStartDate: null,
            ReqFinishDate: null,
            NewReqStartDate: null,
            NewReqFinishDate: null,
            LastDate: "2021-01-14T00:00:00.000Z",
            CurrentWork: null,
            PreviousWork: 100,
          },
          {
            TaskID: 466,
            ProjectID: 6102,
            RecordID: 4086,
            TaskName: "Electrical & Other Repairs Carson Animal Care #3",
            Trade: "C4 HVAC",
            Company: "SOMA HVAC Inc",
            Section: 1,
            StartDate: "01/12/2021",
            FinishDate: "02/15/2021",
            ReqStartDate: null,
            ReqFinishDate: null,
            NewReqStartDate: null,
            NewReqFinishDate: null,
            LastDate: "2021-02-16T00:00:00.000Z",
            CurrentWork: null,
            PreviousWork: 100,
          },
          {
            TaskID: 467,
            ProjectID: 6102,
            RecordID: 4087,
            TaskName: "Demolition, Clean up and disposal",
            Trade: "C4 HVAC",
            Company: "SOMA HVAC Inc",
            Section: 1,
            StartDate: "02/12/2021",
            FinishDate: "02/19/2021",
            ReqStartDate: null,
            ReqFinishDate: null,
            NewReqStartDate: null,
            NewReqFinishDate: null,
            LastDate: "2021-02-16T00:00:00.000Z",
            CurrentWork: null,
            PreviousWork: 95,
          },
          {
            TaskID: 468,
            ProjectID: 6102,
            RecordID: 4130,
            TaskName: "Temp Power",
            Trade: "B General Building",
            Company: "Exbon Development Inc.",
            Section: 1,
            StartDate: "01/12/2021",
            FinishDate: "02/16/2021",
            ReqStartDate: null,
            ReqFinishDate: null,
            NewReqStartDate: null,
            NewReqFinishDate: null,
            LastDate: "2021-02-17T00:00:00.000Z",
            CurrentWork: null,
            PreviousWork: 100,
          },
          {
            TaskID: 469,
            ProjectID: 6102,
            RecordID: 3956,
            TaskName: "Concrete Patch",
            Trade: "B General Building",
            Company: "Exbon Development Inc.",
            Section: 1,
            StartDate: "02/19/2021",
            FinishDate: "02/19/2021",
            ReqStartDate: null,
            ReqFinishDate: null,
            NewReqStartDate: null,
            NewReqFinishDate: null,
            LastDate: "2021-02-12T00:00:00.000Z",
            CurrentWork: null,
            PreviousWork: 100,
          },
          {
            TaskID: 470,
            ProjectID: 6102,
            RecordID: 4276,
            TaskName: "Pre Final Inspection & Punchlist",
            Trade: null,
            Company: null,
            Section: null,
            StartDate: "02/22/2021",
            FinishDate: "02/23/2021",
            ReqStartDate: null,
            ReqFinishDate: null,
            NewReqStartDate: null,
            NewReqFinishDate: null,
            LastDate: "2021-02-19T00:00:00.000Z",
            CurrentWork: null,
            PreviousWork: 85,
          },
          {
            TaskID: 471,
            ProjectID: 6102,
            RecordID: 4371,
            TaskName: "Final Inspection",
            Trade: null,
            Company: null,
            Section: null,
            StartDate: "02/24/2021",
            FinishDate: "02/24/2021",
            ReqStartDate: null,
            ReqFinishDate: null,
            NewReqStartDate: null,
            NewReqFinishDate: null,
            LastDate: "2021-02-23T00:00:00.000Z",
            CurrentWork: null,
            PreviousWork: 40,
          },
        ]);

        projectInfoTab2 = result1.data.result[1];

        let result2 = await axios({
          method: "get",
          url: `/api/project-no-work?projectID=${projectState}`,
          timeout: 3000, // 5 seconds timeout
          headers: {},
        });

        setNoWork(result2.data);

        setPreviousProject(projectState);
      };

      trackPromise(fetchData());
    } else {
      setData([]);
    }

    // if (projectState !== undefined) {
    //   const fetchData = async () => {
    //     let result1 = await axios({
    //       method: "get",
    //       url: `/api/project-tasks-progress?selectedDate=${formatDate(
    //         selectedDate
    //       )}&projectID=${projectState}`,
    //       timeout: 1000, // 5 seconds timeout
    //       headers: {},
    //     });

    //     setData(result1.data);

    //     let result2 = await axios({
    //       method: "get",
    //       url: `/api/project-no-work?projectID=${projectState}`,
    //       timeout: 1000, // 5 seconds timeout
    //       headers: {},
    //     });

    //     setNoWork(result2.data);

    //     setPreviousProject(projectState);
    //   };

    //   initializeDeleteQueue();
    //   initializeUpdateQueue();

    //   trackPromise(fetchData());
    // }
    // setStatus((prevState) => ({
    //   ...prevState,
    //   cookies: {
    //     username: cookies.username,
    //     password: cookies.password,
    //     fullname: cookies.fullname,
    //     employeeid: cookies.employeeid,
    //   },
    // }));
  }, [selectedDate, projectState, status]);

  const { promiseInProgress } = usePromiseTracker();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  // Set No Work
  const customStylesNoWork = {
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const customStylesSaveNoWork = {
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [modalNoWork, setModalNoWork] = useState({ isOpen: false });

  const [modalSaveNoWork, setModalSaveNoWork] = useState({
    isOpen: false,
    Type: "",
    RecordID: 0,
    StartDate: new Date("2010/01/01"),
    FinishDate: new Date("2010/01/01"),
    Reason: "",
  });

  const openModalNoWork = () => {
    setModalNoWork({ isOpen: true });
  };

  const closeModalNoWork = () => {
    setModalNoWork({ isOpen: false });
  };

  const editNoWork = recordID => {
    let StartDate;
    let FinishDate;
    for (let i = 0; i < noWork.length; i++) {
      if (noWork[i].RecordID === recordID) {
        StartDate = noWork[i].StartDate;
        FinishDate = noWork[i].FinishDate;
        break;
      }
    }
    setModalSaveNoWork({
      isOpen: true,
      Type: "Edit",
      RecordID: recordID,
      StartDate,
      FinishDate,
      Reason: "",
    });
  };

  const deleteNoWork = recordID => {
    let StartDate;
    let FinishDate;
    for (let i = 0; i < noWork.length; i++) {
      if (noWork[i].RecordID === recordID) {
        StartDate = noWork[i].StartDate;
        FinishDate = noWork[i].FinishDate;
        break;
      }
    }
    setModalSaveNoWork({
      isOpen: true,
      Type: "Delete",
      RecordID: recordID,
      StartDate,
      FinishDate,
      Reason: "",
    });
  };

  const deleteRequestNoWork = deleteForIndex => {
    setNoWork(old =>
      old.filter((row, index) => {
        return index !== deleteForIndex;
      })
    );
  };

  const addNoWork = () => {
    let StartDate;
    let FinishDate;
    StartDate = formatDate(
      new Date().toLocaleString({
        timeZone: "America/Los_Angeles",
      })
    );
    FinishDate = formatDate(
      new Date().toLocaleString({
        timeZone: "America/Los_Angeles",
      })
    );

    setModalSaveNoWork({
      isOpen: true,
      Type: "New",
      RecordID: 0,
      StartDate,
      FinishDate,
      Reason: "",
    });
  };

  const closeModalSaveNoWork = () => {
    setModalSaveNoWork(prevState => ({ ...prevState, isOpen: false }));
  };

  const handleStartDateOfSaveNoWork = StartDate => {
    setModalSaveNoWork(prevState => ({ ...prevState, StartDate }));
  };

  const handleEndDateOfSaveNoWork = FinishDate => {
    setModalSaveNoWork(prevState => ({ ...prevState, FinishDate }));
  };

  const handleReasonOfSaveNoWork = event => {
    const reason = event.target.value;
    setModalSaveNoWork(prevState => ({ ...prevState, Reason: reason }));
  };

  const requestNoWorkDays = type => {
    let tempNoWork = [];

    tempNoWork = [
      ...noWork,
      {
        OrderStatus: "3",
        Status: `Request For ${type}`,
        RecordID: modalSaveNoWork.RecordID,
        ProjectID: projectState,
        StartDate: modalSaveNoWork.StartDate,
        FinishDate: modalSaveNoWork.FinishDate,
        NewReqFinishDate: modalSaveNoWork.StartDate,
        NewReqStartDate: modalSaveNoWork.FinishDate,
        Note: modalSaveNoWork.Reason,
      },
    ];
    setNoWork(tempNoWork);

    setModalSaveNoWork(prevState => ({ ...prevState, isOpen: false }));
  };

  // Work Date
  const [modalWorkDate, setModalWorkDate] = useState({
    rowIndex: 9999,
    type: "",
    isOpen: false,
    Company: "",
    TaskID: "",
    TaskName: "",
    StartDate: new Date("2010/01/01"),
    FinishDate: new Date("2010/01/01"),
  });

  const afterOpenModalWorkDate = () => {
    // references are now sync'd and can be accessed.
  };

  const closeModalWorkDate = () => {
    setModalWorkDate(prevState => ({ ...prevState, isOpen: false }));
  };

  const handleStartDateOfWorkDate = StartDate => {
    setModalWorkDate(prevState => ({ ...prevState, StartDate }));
  };

  const handleEndDateOfWorkDate = FinishDate => {
    setModalWorkDate(prevState => ({ ...prevState, FinishDate }));
  };

  const updateModalWorkDate = (
    index,
    type,
    Company,
    TaskID,
    TaskName,
    StartDate,
    FinishDate,
    ReqStartDate,
    ReqFinishDate
  ) => {
    setModalWorkDate({
      isOpen: true,
      rowIndex: index,
      type,
      Company,
      TaskID,
      TaskName,
      StartDate,
      FinishDate,
      ReqStartDate,
      ReqFinishDate,
    });
  };

  const requestModalWorkDate = () => {
    const StartDate = formatDate(modalWorkDate.StartDate);
    const FinishDate = formatDate(modalWorkDate.FinishDate);

    if (modalWorkDate.type === "Start Date") {
      setData(old =>
        old.map((row, index) => {
          if (index === modalWorkDate.rowIndex) {
            return {
              ...old[modalWorkDate.rowIndex],
              ReqStartDate: StartDate,
              ReqFinishDate: modalWorkDate.ReqFinishDate
                ? modalWorkDate.ReqFinishDate
                : FinishDate,
              NewReqStartDate: StartDate,
              NewReqFinishDate: modalWorkDate.ReqFinishDate
                ? modalWorkDate.ReqFinishDate
                : FinishDate,
            };
          }
          return row;
        })
      );
    } else {
      setData(old =>
        old.map((row, index) => {
          if (index === modalWorkDate.rowIndex) {
            return {
              ...old[modalWorkDate.rowIndex],
              ReqStartDate: modalWorkDate.ReqStartDate
                ? modalWorkDate.ReqStartDate
                : StartDate,
              ReqFinishDate: FinishDate,
              NewReqStartDate: modalWorkDate.ReqStartDate
                ? modalWorkDate.ReqStartDate
                : StartDate,
              NewReqFinishDate: FinishDate,
            };
          }
          return row;
        })
      );
    }

    // const fetchData = async () => {
    //   await axios({
    //     method: "POST",
    //     url: `/api/project-date-change-request`,
    //     timeout: 5000, // 5 seconds timeout
    //     headers: {},
    //     data: {
    //       EmployeeID: employeeInfo.EmployeeID,
    //       ProjectID: projectState,
    //       RequestType: "Task",
    //       RequestID: modalWorkDate.TaskID,
    //       StartDate: modalWorkDate.StartDate,
    //       EndDate: modalWorkDate.FinishDate,
    //       Reason: null,
    //     },
    //   });
    // };

    // trackPromise(fetchData());
    closeModalWorkDate();
    // toast.info(
    //   <div className={styles["alert__complete"]}>
    //     <strong>Request has been added.</strong>
    //   </div>,
    //   {
    //     position: toast.POSITION.BOTTOM_CENTER,
    //     hideProgressBar: true,
    //   }
    // );
  };

  const goMain = () => {
    Router.push({
      pathname: "/",
      query: { tab: "task-completion", project: projectState },
    });
  };

  const signin = async (username, password) => {
    await axios({
      method: "post",
      url: `/api/daily-report/signin`,
      timeout: 3000, // 5 seconds timeout
      headers: {},
      data: {
        Username: username,
        Password: password,
      },
    }).then(response => {
      if (response.data.result.recordset[0] !== undefined) {
        setCookie("username", username, { path: "/", maxAge: 3600 * 24 * 30 });
        setCookie("password", password, { path: "/", maxAge: 3600 * 24 * 30 });
        setCookie("fullname", response.data.result.recordset[0].FullName, {
          path: "/",
          maxAge: 3600 * 24 * 30,
        });
        setCookie("employeeid", response.data.result.recordset[0].EmployeeID, {
          path: "/",
          maxAge: 3600 * 24 * 30,
        });
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
    });
  };

  const logout = () => {
    setData([]);
    removeCookie("username", { path: "/" });
    removeCookie("password", { path: "/" });
    removeCookie("fullname", { path: "/" });
    removeCookie("employeeid", { path: "/" });
    setStatus(prevState => ({
      permission: true,
      cookies: {
        username: undefined,
        password: 0,
        fullname: "",
        employeeid: 0,
      },
    }));
  };

  return (
    <>
      {console.log(data)}
      {status.cookies.username === undefined ||
      status.cookies.employeeid === undefined ? (
        <Login signin={signin} />
      ) : !status.permission ? (
        <NotPermission />
      ) : (
        <div style={{ overflowX: "auto" }}>
          <div id="mainDiv">
            {promiseInProgress || !projectState || !(data.length > 0) ? (
              <div
                style={{
                  width: "100%",
                  height: "100",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Loader type="Audio" color="#4e88de" height="100" width="100" />
              </div>
            ) : (
              <>
                <div className="header">
                  <div className="header__left">
                    <h3 className="header__left__project-id">
                      <span
                        onClick={goMain}
                        className="header__left__project-id__value"
                      >
                        {projectState}
                      </span>
                    </h3>
                    {projectInfoTab2 !== undefined &&
                    projectInfoTab2.length !== 0 ? (
                      <>
                        <h4 className="header__left__project-group">
                          [{projectInfoTab2[0].ProjectGroup}]
                        </h4>
                        <h4 className="header__left__project-name">
                          {projectInfoTab2[0].ProjectName}
                        </h4>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="header__right">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className="header__right__save-btn"
                      startIcon={<SaveIcon />}
                      // onClick={handleSaveBtn}
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      startIcon={<EventBusyIcon />}
                      className="header__right__no-work-btn"
                      onClick={openModalNoWork}
                    >
                      Set No Work Days
                    </Button>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        margin="normal"
                        id="datePickerDialog"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="header__right__date-picker"
                        autoOk={true}
                        okLabel=""
                      />
                    </MuiPickersUtilsProvider>
                    <p className="header__right__label-date-picker">Date</p>
                    <Modal
                      isOpen={modalNoWork.isOpen}
                      onRequestClose={closeModalNoWork}
                      style={customStylesNoWork}
                      className="modal-no-work"
                    >
                      {/* <p className={styles["test"]}>
                  (This is a test, so NOT working yet. )
                </p> */}
                      <div className="modal-no-work__wrapper-title">
                        <h4 className="modal-no-work__wrapper-title__title">
                          Set No Work Days
                        </h4>
                      </div>
                      <div className="modal-no-work__wrapper-table">
                        <table className="modal-no-work__wrapper-table__table">
                          <thead>
                            <tr>
                              <td>ID</td>
                              <td>Status</td>
                              <td>Dates</td>
                              <td>Reason</td>
                              <td>Edit</td>
                              <td>Delete</td>
                            </tr>
                          </thead>
                          <tbody>
                            {noWork.map((item, index) => {
                              return item.Status === "Complete" ? (
                                <tr key={noWorkMapKey++}>
                                  <td>
                                    {item.RecordID > 0 ? item.RecordID : ""}
                                  </td>
                                  <td className="modal-no-work__wrapper-table__table__approval">
                                    Complete
                                  </td>
                                  <td>
                                    {formatDate(item.StartDate)} ~{" "}
                                    {formatDate(item.FinishDate)}
                                  </td>
                                  <td>&nbsp;{item.Note}</td>
                                  <td
                                    className="modal-no-work__wrapper-table__table__wrapper-icon-edit"
                                    onClick={() => editNoWork(item.RecordID)}
                                  >
                                    <EditTwoToneIcon className="modal-no-work__wrapper-table__table__wrapper-icon-edit__icon-edit" />
                                  </td>
                                  <td
                                    className="modal-no-work__wrapper-table__table__wrapper-icon-delete"
                                    onClick={() => deleteNoWork(item.RecordID)}
                                  >
                                    <DeleteTwoToneIcon className="modal-no-work__wrapper-table__table__wrapper-icon-edit__icon-delete" />
                                  </td>
                                </tr>
                              ) : (
                                <tr key={noWorkMapKey++}>
                                  <td></td>
                                  <td
                                    className={
                                      item.OrderStatus === "2"
                                        ? "modal-no-work__wrapper-table__table__pending"
                                        : "modal-no-work__wrapper-table__table__request"
                                    }
                                  >
                                    {item.Status}&nbsp;{" "}
                                    {item.RecordID ? (
                                      <div className="modal-no-work__wrapper-table__table__pending__id">
                                        # {item.RecordID}{" "}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </td>
                                  <td>
                                    {formatDate(item.StartDate)} ~{" "}
                                    {formatDate(item.FinishDate)}
                                  </td>
                                  <td>&nbsp;{item.Note}</td>
                                  <td></td>
                                  <td
                                    className={
                                      item.OrderStatus === "2"
                                        ? "modal-no-work__wrapper-table__table__wrapper-icon-delete__pending"
                                        : "modal-no-work__wrapper-table__table__wrapper-icon-delete__request"
                                    }
                                  >
                                    <DeleteTwoToneIcon
                                      className={
                                        item.OrderStatus === "2"
                                          ? "modal-no-work__wrapper-table__table__wrapper-icon-edit__icon-delete__pending"
                                          : "modal-no-work__wrapper-table__table__wrapper-icon-edit__icon-delete__request"
                                      }
                                      onClick={() => deleteRequestNoWork(index)}
                                    />
                                  </td>
                                </tr>
                              );
                            })}

                            <tr>
                              <td>
                                <div
                                  className="modal-no-work__wrapper-table__table__wrapper-btn-new"
                                  onClick={addNoWork}
                                >
                                  <Button>(+) NEW</Button>
                                </div>
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="modal-no-work__wrapper-btn-close">
                          <Button
                            className="modal-no-work__wrapper-btn-close__btn-close"
                            onClick={closeModalNoWork}
                          >
                            Close
                          </Button>
                        </div>
                      </div>
                    </Modal>

                    <Modal
                      isOpen={modalSaveNoWork.isOpen}
                      onRequesClose={closeModalSaveNoWork}
                      style={customStylesSaveNoWork}
                    >
                      <div className="modal-save-no-work__wrapper-content">
                        <h4 className="modal-save-no-work__wrapper-content__title">
                          {modalSaveNoWork.Type}
                        </h4>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <ThemeProvider theme={themeForNoWork}>
                            <DatePicker
                              disableToolbar
                              variant="inline"
                              disabled={
                                modalSaveNoWork.Type === "Delete" ? true : false
                              }
                              value={modalSaveNoWork.StartDate}
                              onChange={handleStartDateOfSaveNoWork}
                              format="MM/dd/yyyy"
                              label="Start Date"
                              className="modal-save-no-work__wrapper-content__start-date"
                              autoOk={true}
                            />
                            <DatePicker
                              disableToolbar
                              variant="inline"
                              disabled={
                                modalSaveNoWork.Type === "Delete" ? true : false
                              }
                              value={modalSaveNoWork.FinishDate}
                              onChange={handleEndDateOfSaveNoWork}
                              format="MM/dd/yyyy"
                              label="End Date"
                              className="modal-save-no-work__wrapper-content__end-date"
                              autoOk={true}
                            />
                          </ThemeProvider>
                        </MuiPickersUtilsProvider>
                      </div>
                      <div className="modal-save-no-work__wrapper-content__bottom">
                        <div className="modal-save-no-work__wrapper-content__bottom__wrapper-note">
                          <TextField
                            label="Reason"
                            multiline
                            rows={2}
                            onChange={handleReasonOfSaveNoWork}
                            value={modalSaveNoWork.Reason || ""}
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </div>
                        <Button
                          variant="outlined"
                          size="small"
                          className="modal-save-no-work__wrapper-content__bottom__btn-save"
                          onClick={() =>
                            requestNoWorkDays(modalSaveNoWork.Type)
                          }
                        >
                          Request
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          className="modal-save-no-work__wrapper-content__bottom__btn-cancel"
                          onClick={closeModalSaveNoWork}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Modal>
                  </div>
                </div>

                <div className="table">
                  <table {...getTableProps()}>
                    <thead>
                      {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map(column => (
                            <td {...column.getHeaderProps()}>
                              {column.render("Header")}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()} className="table__row">
                            {row.cells.map(cell => {
                              return (
                                <td {...cell.getCellProps()}>
                                  {cell.render("Cell")}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            <Modal
              isOpen={modalWorkDate.isOpen}
              onAfterOpen={afterOpenModalWorkDate}
              onRequestClose={closeModalWorkDate}
              style={customStyles}
              contentLabel="Example Modal"
              className="modal-work-date"
            >
              <div className="modal-work-date__wrapper">
                <div className="modal-work-date__wrapper-title">
                  <h4 className="modal-work-date__wrapper-title__title">
                    Change Task Date
                  </h4>
                  <h4 className="modal-work-date__wrapper-title__sub-title-task-name">
                    {modalWorkDate.TaskName}
                  </h4>
                  <h5 className="modal-work-date__wrapper-title__sub-title-company-name">
                    {modalWorkDate.Company ? "by " + modalWorkDate.Company : ""}
                  </h5>
                </div>
                <div className="modal-work-date__wrapper-date-picker">
                  <h4 className="modal-work-date__wrapper-date-picker__label">
                    {modalWorkDate.type}
                  </h4>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <div className="modal-work-date__wrapper-date-picker__wrapper-work-date">
                      <ThemeProvider theme={themeForWorkDate}>
                        <DatePicker
                          disableToolbar
                          variant="inline"
                          value={
                            modalWorkDate.type === "Start Date"
                              ? modalWorkDate.StartDate
                              : modalWorkDate.FinishDate
                          }
                          onChange={
                            modalWorkDate.type === "Start Date"
                              ? handleStartDateOfWorkDate
                              : handleEndDateOfWorkDate
                          }
                          format="MM/dd/yyyy"
                          className="modal-work-date__wrapper-date-picker__work-date"
                          autoOk={true}
                        />
                      </ThemeProvider>
                    </div>
                  </MuiPickersUtilsProvider>
                </div>
                <div className="modal-work-date__wrapper-btn">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={requestModalWorkDate}
                    className="modal-work-date__wrapper-btn__btn-request"
                  >
                    Request
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={closeModalWorkDate}
                    className="modal-work-date__wrapper-btn__btn-cancel"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Modal>
            <div id="modalForTasksTab"></div>
          </div>
        </div>
      )}
    </>
  );
};
TaskCompletion.layout = Admin;
export default TaskCompletion;