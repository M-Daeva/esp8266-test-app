import { createStore } from "redux";
import { connect } from "react-redux";
import initialState from "./initial-state";
import { imup } from "../../utils";

const UPDATE_STATE = "UPDATE_STATE";

const actionCreators = {
  updateState: payload => ({ type: UPDATE_STATE, payload })
};

function reducer(state = { store: initialState }, action = {}) {
  const { type, payload } = action;
  return type === UPDATE_STATE ? imup(state, payload) : state;
}

const store = createStore(reducer);

const connectToStore = Component =>
  connect(
    state => state,
    actionCreators
  )(Component);

export { store, connectToStore };
