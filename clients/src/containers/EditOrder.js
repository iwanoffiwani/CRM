import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { fetchUpdateOrderList } from "../redux/actions";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: "flex",
    padding: "2rem 0"
  },
  error: {
    margin: 0,
    marginBottom: theme.spacing(1)
  },
  success: {
    margin: 0,
    marginBottom: theme.spacing(1),
    color: green[500]
  },
  formControl: {
    margin: 0
  },
  textField: {
    margin: 0,
    marginBottom: theme.spacing(1)
  },
  title: {
    marginBottom: theme.spacing(4),
    fontWeight: "bold",
    fontSize: "1.5em"
  },
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(6)
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  comment: {
    width: 720
  },
  list: {
    padding: 0,
    height: 500,
    overflowX: "hidden"
  },
  listItem: {
    paddingRight: 0,
    paddingLeft: 0
  },
  data: {
    display: "block",
    marginTop: theme.spacing(1)
  },
  hiddenInput: {
    visibility: "hidden"
  }
}));

export const EditOrder = props => {
  const classes = useStyles();

  // Поле changes содержит объект с полем prevState в которое падаем объект с данными заявки,
  // для последующего сохранения и отражения изменений.
  // Поле nextState остаеться пустым так как в него будут записываеться изменения
  const initialState = {
    response: {
      success: {},
      error: {}
    },
    edit: {
      ...props.editOrder
    },
    comment: "",
    changes: {
      prevState: {
        ...props.editOrder
      },
      nextState: {}
    }
  };

  const [state, setState] = useState(initialState);

  const changeNameHandler = e => {
    return setState({
      ...state,
      edit: {
        ...state.edit,
        name: e.target.value
      },
      changes: {
        ...state.changes,
        nextState: {
          ...state.changes.nextState,
          name: e.target.value
        }
      }
    });
  };

  const changeStatusHandler = e => {
    const { id: _id } = e._targetInst.stateNode;

    return setState({
      ...state,
      edit: {
        ...state.edit,
        status: {
          _id,
          name: e.target.value
        }
      },
      changes: {
        ...state.changes,
        nextState: {
          ...state.changes.nextState,
          status: e.target.value
        }
      }
    });
  };

  const changeFieldsHandler = e => {
    return setState({
      ...state,
      edit: {
        ...state.edit,
        fields: state.edit.fields.map(field => {
          if (field.name === e.target.name)
            return {
              ...field,
              value: e.target.value
            };
          else return field;
        })
      },
      changes: {
        ...state.changes,
        nextState: {
          ...state.changes.nextState,
          fields: state.edit.fields.map(field => {
            if (field.name === e.target.name)
              return {
                ...field,
                value: e.target.value
              };
            else return field;
          })
        }
      }
    });
  };

  const submitHandler = e => {
    e.preventDefault();

    const changes = state.changes;

    const previousState = changes.prevState;

    const nextState = changes.nextState;

    let filter = {
      user: props.user.data.login,
      previousState: {},
      nextState: {}
    };

    // Проходим по полям которые могли быть изменены и сравниваем значения полей предыдущего состояния с новым,
    // после записываем данные в массив и готово
    if (nextState.name && nextState.name !== previousState.name)
      filter = {
        ...filter,
        previousState: {
          // Свойство должно именоваться именно так, иначе будут серьезные проблемы
          name: previousState.name
        },
        nextState: {
          name: nextState.name
        }
      };

    if (nextState.status && nextState.status !== previousState.status)
      filter = {
        ...filter,
        previousState: {
          ...filter.previousState,
          status: previousState.status.name
        },
        nextState: {
          ...filter.nextState,
          status: nextState.status
        }
      };

    if (nextState.fields)
      filter = {
        ...filter,
        previousState: {
          ...filter.previousState,
          fields: previousState.fields.filter(
            (change, index) => change.value !== nextState.fields[index].value
          )
        },
        nextState: {
          ...filter.nextState,
          fields: nextState.fields.filter(
            (change, index) =>
              change.value !== previousState.fields[index].value
          )
        }
      };

    return axios({
      method: "PATCH",
      url: `/api/orders/`,
      params: {
        id: state.edit._id
      },
      data: {
        ...state.edit,
        changes: [...state.edit.changes, { ...filter }]
      }
    })
      .then(res =>
        setState({
          ...state,
          response: {
            ...initialState.response,
            success: {
              status: res.status,
              message: `Ваша заявка успешно отредактирована`
            }
          },
          edit: {
            ...res.data
          },
          changes: {
            prevState: {
              ...res.data
            },
            nextState: {}
          }
        })
      )
      .catch(err =>
        setState({
          ...initialState,
          response: {
            ...initialState.response,
            error: {
              status: err.response.status,
              message: `Oops, что то пошло не так.`
            }
          }
        })
      )
      .then(() => props.update());
  };

  const changeComment = e => {
    return setState({
      ...state,
      comment: e.target.value
    });
  };

  const submitComment = e => {
    e.preventDefault();

    return axios({
      method: "PATCH",
      url: `/api/orders/`,
      params: {
        id: state.edit._id
      },
      data: {
        comments: [
          ...state.edit.comments,
          {
            user: props.user.data.login,
            content: state.comment
          }
        ]
      }
    })
      .then(res =>
        setState({
          ...state,
          response: {
            ...initialState.response,
            success: {
              status: res.status,
              message: `Ваш комментарий успешно отправлен`
            }
          },
          edit: {
            ...state.edit,
            comments: [...res.data.comments]
          },
          comment: ""
        })
      )
      .catch(err =>
        setState({
          ...state,
          response: {
            ...initialState.response,
            error: {
              status: err.response.status,
              message: `Oops, что то пошло не так.`
            }
          }
        })
      )
      .then(() => props.update());
  };

  const comments = [...state.edit.changes, ...state.edit.comments]
    .sort((a, b) => Date.parse(a.data) - Date.parse(b.data))
    .map((comment, index) => {
      if (comment.nextState) {
        if (comment.nextState.name) {
          return (
            <ListItem key={index} className={classes.listItem}>
              <ListItemText
                primary={`Пользователь ${comment.user} внес изменения в имени заявки`}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    ></Typography>
                    {` — ${comment.previousState.name} -> ${comment.nextState.name}`}
                    <small className={classes.data}>{comment.data}</small>
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        }
        if (comment.nextState.status) {
          return (
            <ListItem key={index} className={classes.listItem}>
              <ListItemText
                primary={`Пользователь ${comment.user} внес изменения в поле статус`}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    ></Typography>
                    {` — ${comment.previousState.status} -> ${comment.nextState.status}`}
                    <small className={classes.data}>{comment.data}</small>
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        }
        if (comment.nextState.fields) {
          return comment.nextState.fields.map((field, index) => (
            <ListItem key={index} className={classes.listItem}>
              <ListItemText
                primary={`Пользователь ${comment.user} внес изменения в поле ${field.name}:`}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    ></Typography>
                    {` — ${comment.previousState.fields[index].value} -> ${field.value}`}
                    <small className={classes.data}>{field.data}</small>
                  </React.Fragment>
                }
              />
            </ListItem>
          ));
        }
      } else {
        return (
          <ListItem key={index} className={classes.listItem}>
            <ListItemText
              primary={`Пользователь ${comment.user} оставил комментарий`}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  ></Typography>
                  {` — ${comment.content}`}
                  <small className={classes.data}>{comment.data}</small>
                </React.Fragment>
              }
            />
          </ListItem>
        );
      }

      return false;
    });

  const commentsList = React.createRef();

  useEffect(() => {
    commentsList.current.scrollTop = commentsList.current.scrollHeight;
  });

  const fields = state.edit.fields.map((field, index) => (
    <TextField
      className={classes.textField}
      key={index}
      type="text"
      label={field.name}
      name={field.name}
      value={field.value}
      variant="outlined"
      onChange={changeFieldsHandler}
      fullWidth={true}
    />
  ));

  const statuses = props.statuses.map((status, index) => (
    <MenuItem id={status._id} key={index} value={status.name}>
      {status.name}
    </MenuItem>
  ));

  return (
    <Box className={classes.wrapper}>
      <form onSubmit={submitHandler}>
        <Container>
          {state.response.error.status ? (
            <Typography
              color="error"
              className={classes.error}
              variantMapping={{ h3: "h3" }}
            >
              {state.response.error.message}
            </Typography>
          ) : (
            false
          )}
          {state.response.success.status ? (
            <Typography
              color="error"
              className={classes.success}
              variantMapping={{ h3: "h3" }}
            >
              {state.response.success.message}
            </Typography>
          ) : (
            false
          )}
          <Typography className={classes.title} variant="h2" noWrap>
            Редактирование
          </Typography>
          <TextField
            label="Название заявки"
            type="text"
            name="name"
            value={state.edit.name}
            margin="normal"
            variant="outlined"
            onChange={changeNameHandler}
            fullWidth={true}
            className={classes.textField}
          />
          <Divider className={classes.divider} />
          <Typography className={classes.title} variant="h3" noWrap>
            Статус заявки
          </Typography>
          <Select
            id="demo-simple-select-outlined"
            value={state.edit.status.name}
            variant="outlined"
            onChange={changeStatusHandler}
            fullWidth={true}
            inputProps={{ name: "status" }}
          >
            {statuses}
          </Select>
          <Divider className={classes.divider} />
          <Typography className={classes.title} variant="h3" noWrap>
            Произвольные поля
          </Typography>
          {fields}
          <Divider className={classes.divider} />
          {state.edit.name.length < 1 ? (
            <Button variant="contained" disabled>
              Редактировать заявку
            </Button>
          ) : (
            <Button variant="contained" color="primary" type="submit">
              Редактировать заявку
            </Button>
          )}
        </Container>
      </form>
      <Container>
        <Typography className={classes.title} variant="h2" noWrap>
          Комментарии
        </Typography>
        <List className={classes.list} ref={commentsList}>
          {comments}
        </List>
        <form className={classes.comment} onSubmit={submitComment}>
          <TextField
            id="name"
            type="text"
            label="Комментарий"
            name="comment"
            margin="dense"
            value={state.comment}
            onChange={changeComment}
            fullWidth
          />
          <Divider className={classes.divider} />
          {state.comment.length < 1 ? (
            <Button variant="contained" disabled>
              Добавить
            </Button>
          ) : (
            <Button variant="contained" color="primary" type="submit">
              Добавить
            </Button>
          )}
        </form>
      </Container>
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    user: state.authorization.payload,
    statuses: state.statuses.payload
  };
};

const mapDispatchToProps = dispatch => {
  return {
    update: () => dispatch(fetchUpdateOrderList())
  };
};

EditOrder.propTypes = {
  user: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  statuses: PropTypes.array.isRequired,
  editOrder: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(EditOrder);
