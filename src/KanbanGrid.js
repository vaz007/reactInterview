import React, { useEffect, useState } from "react";
import { Grid, makeStyles, Button } from "@material-ui/core";
// import { Send } from "@mui/icons-material";
import TaskCard from "./TaskCard";
import {
  // filterTicketsByStatus,
  groupTicketsByUser,
  groupTicketsByStatus,
  filterTicketsByUser,
  groupTicketsByPriority,
  sortTicketsByPriorityDescending,
  sortTicketsByTitleAscending,
} from "./operations";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minHeight: "10px",
  },
  gridContainer: {
    paddingTop: "1%",
  },
}));

const KanbanGrid = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [error, setError] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const [filteredDataByPriority, setFilteredDataByPriority] = useState([]);
  const [filteredDataByUser, setFilteredDataByUser] = useState({});

  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    console.log("RESULT Filter Priority: ", filteredDataByPriority);
  }, [filteredDataByPriority]);
  useEffect(() => {
    console.log("RESULT Filter Status : ", filteredData);
  }, [filteredData]);

  useEffect(() => {
    console.log("RESULT Filter Status : ", filteredDataByUser);
  }, [filteredDataByUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        setData(response.data);
        setHeaders(["Backlog", "Todo", "In Progress", "Done", "Canceled"]);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);



  const handleFilterTicketsByStatus = () => {
    const result = groupTicketsByStatus(data);
    setHeaders(["Backlog", "Todo", "InProgress", "Done", "Canceled"]);
    setFilteredDataByPriority([]);
    setFilteredData(result)
    return ;
  };



  const handleFilterTicketsByPriority = () => {
    const result = groupTicketsByPriority(data);
    setFilteredData([]);
    setHeaders(["NoPriority", "Urgent", "Low", "Medium", "High"]);
    setFilteredDataByPriority(result);
    return;
  };



  const handleFilterTicketsByUser = () => {
    const result = groupTicketsByUser(data);
    setFilteredData([]);
    const tempheader = [];
      
    // if(data['users']) {
    //   data.users.map(item => {
    //     tempheader.push(item.name);
    //   })
    // }
    // setHeaders(tempheader);
    setFilteredData([]);
    setFilteredDataByPriority([]);
    setFilteredDataByUser(result);
    console.log('filteredDataUser', filteredDataByUser);
    return;
  };

  return (
    <>
      <Grid
        container
        spacing={4}
        align="center"
        justifyContent="center"
        className={classes.gridContainer}
      >
        <Grid item xs={2}>
          <Button
            variant="contained"
            onClick={handleFilterTicketsByStatus}
            //endIcon={<Send />}
          >
            filter Tickets By Stauts
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            onClick={handleFilterTicketsByPriority}
            //endIcon={<Send />}
          >
            By Priority
          </Button>
        </Grid>

        <Grid
          item
          xs={2}
          // onDragOver={(e) => handleDragOver(e)}
          // onDrop={(e) => handleDrop(e, "done")}
        >
          <Button
            variant="contained"
            onClick={handleFilterTicketsByUser}
            //endIcon={<Send />}
          >
            filter Tickets By User
          </Button>
        </Grid>
        <Grid
          item
          xs={2}
          // onDragOver={(e) => handleDragOver(e)}
          // onDrop={(e) => handleDrop(e, "done")}
        >
          <Button
            variant="contained"
            //endIcon={<Send />}
          >
            sortTicketsByPriorityDescending,
          </Button>
        </Grid>
        <Grid
          item
          xs={2}
          // onDragOver={(e) => handleDragOver(e)}
          // onDrop={(e) => handleDrop(e, "done")}
        >
          <Button
            variant="contained"
            //endIcon={<Send />}
          >
            sortTicketsByTitleAscending
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={4} align="center" justifyContent="center">
        {headers.length !== 0 ? (
          headers.map((item) => (
            <Grid item xs={2}>
              <h1>{item}</h1>
            </Grid>
          ))
        ) : (
          <></>
        )}
      </Grid>


      <Grid
        container
        spacing={4}
        align="center"
        justifyContent="center"
        className={classes.gridContainer}
      >
        <Grid item xs={2}>
          <Grid container spacing={2}>

        {filteredData !== null && filteredData.Backlog ? (
              filteredData["Backlog"].map((item) => (
                <Grid item xs={12}>
                  {" "}
                  <TaskCard
                    avatar={item.userId.charAt(0).toUpperCase()}
                    ticketData={item.data}
                    title={item.tag}
                    priority={item.title}
                  />
                </Grid>
              ))
            ) : (
              <></>
            )}



            {filteredData !== null && filteredData.Backlog ? (
              filteredData["Backlog"].map((item) => (
                <Grid item xs={12}>
                  {" "}
                  <TaskCard
                    avatar={item.userId.charAt(0).toUpperCase()}
                    ticketData={item.data}
                    title={item.tag}
                    priority={item.title}
                  />
                </Grid>
              ))
            ) : (
              <></>
            )}

            {filteredDataByPriority !== null &&
            filteredDataByPriority.NoPriority ? (
              filteredDataByPriority["NoPriority"].map((item) => (
                <Grid item xs={12}>
                  {" "}
                  <TaskCard
                    avatar={item.userId.charAt(0).toUpperCase()}
                    ticketData={item.data}
                    title={item.tag}
                    priority={item.title}
                  />
                </Grid>
              ))
            ) : (
              <></>
            )}
          </Grid>
        </Grid>

        <Grid item xs={2}>
          <Grid
            container
            spacing={2} // Add spacing between items
          >
            {filteredData !== null && filteredData.Todo ? (
              filteredData["Todo"].map((item) => (
                <Grid item xs={12}>
                  {" "}
                  <TaskCard
                    avatar={item.userId.charAt(0).toUpperCase()}
                    ticketData={item.data}
                    title={item.tag}
                    priority={item.title}
                  />
                </Grid>
              ))
            ) : (
              <></>
            )}

            {filteredDataByPriority !== null && filteredDataByPriority.Urgent ? (
              filteredDataByPriority["Urgent"].map((item) => (
                <Grid item xs={12}>
                  {" "}
                  <TaskCard
                    avatar={item.userId.charAt(0).toUpperCase()}
                    ticketData={item.data}
                    title={item.tag}
                    priority={item.title}
                  />
                </Grid>
              ))
            ) : (
              <></>
            )}
          </Grid>
        </Grid>

        <Grid item xs={2}>
          <Grid
            container
            spacing={2} // Add spacing between items
          >
            {filteredData !== null && filteredData.InProgress ? (
              filteredData["InProgress"].map((item) => (
                <Grid item xs={12}>
                  {" "}
                  <TaskCard
                    avatar={item.userId.charAt(0).toUpperCase()}
                    ticketData={item.data}
                    title={item.tag}
                    priority={item.title}
                  />
                </Grid>
              ))
            ) : (
              <></>
            )}

            {filteredDataByPriority !== null &&
            filteredDataByPriority.Low ? (
              filteredDataByPriority["Low"].map((item) => (
                <Grid item xs={12}>
                  {" "}
                  <TaskCard
                    avatar={item.userId.charAt(0).toUpperCase()}
                    ticketData={item.data}
                    title={item.tag}
                    priority={item.title}
                  />
                </Grid>
              ))
            ) : (
              <></>
            )}
          </Grid>
        </Grid>

        <Grid item xs={2}>
        <Grid
            container
            spacing={2} // Add spacing between items
          >
            {filteredData !== null && filteredData.Done ? (
              filteredData["Done"].map((item) => (
                <Grid item xs={12}>
                  {" "}
                  <TaskCard
                    avatar={item.userId.charAt(0).toUpperCase()}
                    ticketData={item.data}
                    title={item.tag}
                    priority={item.title}
                  />
                </Grid>
              ))
            ) : (
              <></>
            )}

            {filteredDataByPriority !== null && filteredDataByPriority.Medium ? (
              filteredDataByPriority["Medium"].map((item) => (
                <Grid item xs={12}>
                  {" "}
                  <TaskCard
                    avatar={item.userId.charAt(0).toUpperCase()}
                    ticketData={item.data}
                    title={item.tag}
                    priority={item.title}
                  />
                </Grid>
              ))
            ) : (
              <></>
            )}
          </Grid>
        
        </Grid>
        <Grid item xs={2}>
        <Grid
            container
            spacing={2} // Add spacing between items
          >
            {filteredData !== null && filteredData.Canceled ? (
              filteredData["Canceled"].map((item) => (
                <Grid item xs={12}>
                  {" "}
                  <TaskCard
                    avatar={item.userId.charAt(0).toUpperCase()}
                    ticketData={item.data}
                    title={item.tag}
                    priority={item.title}
                  />
                </Grid>
              ))
            ) : (
              <></>
            )}

            {filteredDataByPriority !== null && filteredDataByPriority.High ? (
              filteredDataByPriority["High"].map((item) => (
                <Grid item xs={12}>
                  {" "}
                  <TaskCard
                    avatar={item.userId.charAt(0).toUpperCase()}
                    ticketData={item.data}
                    title={item.tag}
                    priority={item.title}
                  />
                </Grid>
              ))
            ) : (
              <></>
            )}
          </Grid>
        
        </Grid>

        <div>
          {error && <p>Error: {error}</p>}
          {data && (
            <div>
              <p>Data: {JSON.stringify(data)}</p>
            </div>
          )}
        </div>
      </Grid>

    </>
  );
};

export default KanbanGrid;
