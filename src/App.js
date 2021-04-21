import logo from './logo.svg';
import './App.css';
import UserProfile from './Requests';

function App() {
	return (
		[<div class="form" id='form'>
			<input placeholder="Token here" id="input"/>
			<button onClick={UserProfile}> Request </button>
		</div>,
		
		<div class="profile" id="profile"> </div>,
		<div class="media" id='media'> </div>]
	);
}

export default App;
