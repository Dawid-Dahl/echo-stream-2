import {History} from "history";
import history from "./history";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Route, Router, Switch} from "react-router";
import App from "./App";
import store from "./store/store";
import Stream from "./components/stream/Stream";

ReactDOM.render(
	<Provider store={store}>
		<Router history={history as History<History>}>
			<Switch>
				<Route path="/streams/:echoStreamHashtag" component={Stream} />
				<Route path="/" component={App} />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById("root")
);
