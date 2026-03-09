import AllEmployeesPage from "./pages/AllEmployeesPage/AllEmployeesPage";
import CreateEmployeePage from "./pages/CreateEmployeePage/CreateEmployeePage";
import UpdateEmployeePage from "./pages/UpdateEmployeePage/UpdateEmployeePage";
import CalendarPage from "./pages/CalendarPage/CalendarPage";

import { BrowserRouter, Route, Routes } from "react-router";
import Frame from "./component/Frame/Frame";
import "./index.scss";
import {
  PAGE_CALENDAR,
  PAGE_CREATE,
  PAGE_EMPLOYEE,
  PAGE_HOME,
  PAGE_UPDATE,
} from "./services/const";
import EmployeePage from "./pages/EmployeePage/EmployeePage";

function App() {
  return (
    <BrowserRouter>
      <Frame>
        <Routes>
          <Route path={PAGE_HOME} element={<AllEmployeesPage />} />
          <Route path={PAGE_CREATE} element={<CreateEmployeePage />} />
          <Route path={PAGE_UPDATE} element={<UpdateEmployeePage />} />
          <Route path={PAGE_CALENDAR} element={<CalendarPage />} />
          <Route path={PAGE_EMPLOYEE} element={<EmployeePage />} />
        </Routes>
      </Frame>
    </BrowserRouter>
  );
}

export default App;
