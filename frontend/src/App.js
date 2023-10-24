import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';


function App() {
	return (
		<main className="App">
			<Router>
				<Routes>
					<Route path="/" exact element={<Login />} />
					{/* <Route path="/home" element={<Home />} /> */}
				</Routes>
			</Router>
		</main>
	);
}

export default App;
