import AllEmployeesPage from "./pages/AllEmployeesPage/AllEmployeesPage";
import CreateEmployeePage from "./pages/CreateEmployeePage/CreateEmployeePage";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import EmployeePage from "./pages/EmployeePage/EmployeePage";
import UpdateEmployeePage from "./pages/UpdateEmployeePage/UpdateEmployeePage";
import { BrowserRouter, Route, Routes } from "react-router";
import Frame from "./component/Frame/Frame";
import "./index.scss";
import {
  PAGE_CALENDAR,
  PAGE_CHAT,
  PAGE_CONTRACT,
  PAGE_CREATE,
  PAGE_EMPLOYEE,
  PAGE_HOME,
  PAGE_UPDATE,
} from "./services/const";
import AllContractsPage from "./pages/AllContractsPage/AllContractsPage";
import ChatPage from "./pages/ChatPage/ChatPage";

function App() {
  return (
    <BrowserRouter>
      <Frame>
        <Routes>
          <Route path={PAGE_HOME} element={<AllEmployeesPage />} />
          <Route path={PAGE_CREATE} element={<CreateEmployeePage />} />
          <Route path={PAGE_UPDATE} element={<UpdateEmployeePage />} />
          <Route path={PAGE_EMPLOYEE} element={<EmployeePage />} />
          <Route path={PAGE_CONTRACT} element={<AllContractsPage />} />
          <Route path={PAGE_CALENDAR} element={<CalendarPage />} />
          <Route path={PAGE_CHAT} element={<ChatPage />} />
        </Routes>
      </Frame>
    </BrowserRouter>
  );
}

export default App;
