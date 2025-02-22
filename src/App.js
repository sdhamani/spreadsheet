import Sheet from "./components/Sheet";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Sheet noOfColumns={20} noOfRows={20} />
    </div>
  );
}
