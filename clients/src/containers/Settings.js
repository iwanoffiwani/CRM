import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Layout from "./Layout";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import EditFields from "./EditFields";
import EditStatuses from "./EditStatuses";

const useStyles = makeStyles(theme => ({
  box: {
    marginBottom: theme.spacing(4)
  },
  paper: {
    padding: "1em"
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
    fontSize: "1.5em"
  }
}));

const mapStateToProps = state => {
  return {
    fields: state.fields.payload,
    statuses: state.statuses.payload
  };
};

export const Settings = props => {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item lg={4} md={4} sm={12}>
            <Paper className={classes.paper} elevation={3}>
              <Typography className={classes.title} variant="h2" noWrap>
                Поля
              </Typography>
              <EditFields fields={props.fields} />
            </Paper>
          </Grid>
          <Grid item lg={4} md={4} sm={12}>
            <Paper className={classes.paper} elevation={3}>
              <Typography className={classes.title} variant="h2" noWrap>
                Статусы
              </Typography>
              <EditStatuses statuses={props.statuses} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

Settings.propTypes = {
  fields: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Settings);
