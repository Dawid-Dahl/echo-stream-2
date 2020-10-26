import {History} from "history";
import history from "./history";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Route, Router, Switch} from "react-router";
import App from "./App";
import store from "./store/store";
import ActiveEchoFeed from "./components/ActiveEchoFeed";

ReactDOM.render(
	<Provider store={store}>
		<Router history={history as History<History>}>
			<Switch>
				<Route path="/streams/:echoStreamId" component={ActiveEchoFeed} />
				<Route path="/" component={App} />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById("root")
);
