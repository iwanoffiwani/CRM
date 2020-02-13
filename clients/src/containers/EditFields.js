import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { fetchUpdateOrderList, fetchFields } from "../redux/actions/";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import ListItemText from "@material-ui/core/ListItemText";
import ClearIcon from "@material-ui/icons/Clear";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  icon: {
    width: 42,
    height: 42,
    marginRight: theme.spacing(2)
  }
}));

const mapDispatchToProps = dispatch => {
  return {
    ordersListUpdate: () => dispatch(fetchUpdateOrderList()),
    fieldsUpdate: () => dispatch(fetchFields())
  };
};

export const EditFields = props => {
  const classes = useStyles();

  const initialState = {
    field: {
      edit: {
        id: null
      },
      delete: {
        id: null
      },
      create: {
        init: false
      }
    },
    changes: {
      field: {
        name: {
          value: ""
        }
      },
      create: {
        name: {
          value: ""
        }
      }
    }
  };

  const [state, setState] = useState(initialState);

  const editFieldNameHandler = e => {
    return setState({
      ...state,
      changes: {
        ...state.changes,
        field: {
          ...state.changes.field,
          name: {
            value: e.target.value
          }
        }
      }
    });
  };

  const setFieldNameHandler = e => {
    return setState({
      ...state,
      changes: {
        ...state.changes,
        create: {
          ...state.changes.create,
          name: {
            value: e.target.value
          }
        }
      }
    });
  };

  const createHandler = () => {
    return setState({
      ...state,
      field: {
        ...state.field,
        create: {
          init: true
        }
      }
    });
  };

  const editHandler = (id, value) => {
    return setState({
      ...state,
      field: {
        ...state.field,
        edit: {
          id
        }
      },
      changes: {
        ...state.changes,
        field: {
          name: {
            value
          }
        }
      }
    });
  };

  const deleteHandler = id => {
    return setState({
      ...state,
      field: {
        ...state.field,
        delete: {
          id
        }
      }
    });
  };

  const def = () => setState({ ...initialState });

  const fetchCreateField = e => {
    e.preventDefault();

    const {
      create: {
        name: { value: name }
      }
    } = state.changes;

    return axios({
      method: "POST",
      url: `/api/fields/`,
      data: {
        name
      }
    })
      .then(() => props.ordersListUpdate())
      .then(() => props.fieldsUpdate())
      .then(def());
  };

  const fetchEditField = e => {
    e.preventDefault();

    const {
      field: {
        edit: { id }
      },
      changes: {
        field: {
          name: { value: name }
        }
      }
    } = state;

    return axios({
      method: "PATCH",
      url: `/api/fields/`,
      params: {
        id
      },
      data: {
        name
      }
    })
      .then(() => props.fieldsUpdate())
      .then(() => props.ordersListUpdate())
      .then(def());
  };

  const fetchDeleteField = e => {
    e.preventDefault();

    const {
      field: {
        delete: { id }
      }
    } = state;

    return axios({
      method: "DELETE",
      url: `/api/fields/`,
      params: {
        id
      }
    })
      .then(() => props.fieldsUpdate())
      .then(() => props.ordersListUpdate())
      .then(def());
  };

  return (
    <List>
      {(() => {
        const {
          field: { edit, delete: del },
          changes: {
            field: {
              name: { value }
            }
          }
        } = state;

        if (edit.id !== null)
          return props.fields.map((field, index) => {
            return edit.id !== field._id ? (
              <ListItem disabled key={index}>
                <Fab className={classes.icon}>
                  <EditIcon />
                </Fab>
                <Fab className={classes.icon}>
                  <DeleteOutlineIcon />
                </Fab>
                <ListItemText primary={field.name} />
              </ListItem>
            ) : (
              <ListItem key={index}>
                <Fab className={classes.icon} onClick={fetchEditField}>
                  <CheckIcon />
                </Fab>
                <Fab className={classes.icon} onClick={def}>
                  <ClearIcon />
                </Fab>
                <TextField
                  value={value}
                  onChange={editFieldNameHandler}
                  placeholder="Введите новое имя"
                />
              </ListItem>
            );
          });
        else if (del.id !== null)
          return props.fields.map((field, index) => {
            return del.id !== field._id ? (
              <ListItem disabled key={index}>
                <Fab className={classes.icon}>
                  <EditIcon />
                </Fab>
                <Fab className={classes.icon}>
                  <DeleteOutlineIcon />
                </Fab>
                <ListItemText primary={field.name} />
              </ListItem>
            ) : (
              <ListItem key={index}>
                <Fab className={classes.icon} onClick={fetchDeleteField}>
                  <CheckIcon />
                </Fab>
                <Fab className={classes.icon} onClick={def}>
                  <ClearIcon />
                </Fab>
                <ListItemText primary="Вы уверены, что хотите удалить это поле безвозвратно?" />
              </ListItem>
            );
          });
        else if (!edit.id && !del.id)
          return props.fields.map((field, index) => {
            return (
              <ListItem key={index}>
                <Fab
                  className={classes.icon}
                  onClick={() => editHandler(field._id, field.name)}
                >
                  <EditIcon />
                </Fab>
                <Fab
                  className={classes.icon}
                  onClick={() => deleteHandler(field._id)}
                >
                  <DeleteOutlineIcon />
                </Fab>
                <ListItemText primary={field.name} />
              </ListItem>
            );
          });
      })()}
      {(() => {
        const {
          field: { create },
          changes: {
            create: {
              name: { value }
            }
          }
        } = state;

        if (create.init)
          return (
            <ListItem>
              <Fab className={classes.icon} onClick={fetchCreateField}>
                <CheckIcon />
              </Fab>
              <Fab className={classes.icon} onClick={def}>
                <ClearIcon />
              </Fab>
              <TextField
                value={value}
                onChange={setFieldNameHandler}
                placeholder="Введите имя поля"
              />
            </ListItem>
          );
        else
          return (
            <ListItem>
              <Fab className={classes.icon} onClick={createHandler}>
                <AddIcon />
              </Fab>
              <ListItemText primary="Добавить поле" />
            </ListItem>
          );
      })()}
    </List>
  );
};

EditFields.propTypes = {
  fields: PropTypes.array.isRequired,
  fieldsUpdate: PropTypes.func.isRequired,
  ordersListUpdate: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(EditFields);
