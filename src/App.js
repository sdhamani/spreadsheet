import Sheet from "./components/Sheet";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Sheet noOfColumns={10000} noOfRows={10000} />
    </div>
  );
}
