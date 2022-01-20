import './App.css';
import TestPage from './app/TestPage';
import FrameworkApplication from './framework/FrameworkApplication';

function App() {
    FrameworkApplication.instance.initialize();

    return (
        <div className="App">
            <TestPage />
        </div>
    );
}

export default App;
