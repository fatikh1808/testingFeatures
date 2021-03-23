import "./App.css";
import "rsuite/dist/styles/rsuite-default.css";
import { Button, IconButton } from "rsuite";
import { Icon } from "rsuite";
import "./fontello2/css/hm-icons.css";

function App() {
    const test = `highlight> Fotikh`;

    return (
        <div className="App">
            <Button>killer</Button>

            <Icon className="hm-eye" size="3x" />

            <IconButton icon={<Icon className={"hm-eye"} />} />

            <i className="hm-eye" style={{ fontSize: 80 }} />
        </div>
    );
}

export default App;
