import React from "react";
import ReactDOM from "react-dom";
import Container from "react-bootstrap/Container";
import { createStore } from "redux";
import movieApp from "./reducers/reducers";

import MainView from "./components/main-view/main-view";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

const store = createStore(movieApp);

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <MainView className="bg-black" />
        </Container>
      </Provider>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName("app-container")[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
