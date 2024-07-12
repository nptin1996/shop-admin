import NavBar from "./components/NavBar";
function App() {
  return (
    <div className="container">
      <NavBar />
      <p>{process.env.REACT_APP_API_URL}</p>
    </div>
  );
}

export default App;
