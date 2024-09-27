import { ChakraBaseProvider } from "@chakra-ui/react";
import "./App.css";
import Routes from "./routes/Routes";
import theme from "./theme/theme";


function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <Routes />
    </ChakraBaseProvider>
  )
}

export default App;

