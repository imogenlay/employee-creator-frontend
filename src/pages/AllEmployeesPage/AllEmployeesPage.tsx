import { useMemo, useState } from "react";
import { type EmployeeQueryParams } from "../../services/employee/employee-services";
import SearchBar from "../../component/SearchBar/SearchBar";
import EmployeeList from "../../component/EmployeeList/EmployeeList";
import type { Sort } from "../../services/const";
import classes from "./AllEmployeesPage.module.scss";
import Button from "../../component/Button/Button";

export default function AllEmployeesPage() {
  const [namesFilter, setNamesFilter] = useState<string[]>([]);
  const [sortFilter, setSortFilter] = useState<Sort>("ASC");

  const searchQueryParams = useMemo<EmployeeQueryParams>(
    () => ({
      names: namesFilter,
      sort: sortFilter,
    }),
    [namesFilter, sortFilter],
  );

  const onSearch = (searchQuery: string) => {
    setNamesFilter(searchQuery.split(" ").filter(Boolean));
  };

  const toggleSort = () => {
    if (sortFilter === "ASC") setSortFilter("DESC");
    else setSortFilter("ASC");
  };

  return (
    <>
      <h2>Employee List</h2>
      <hr />
      <div className={classes.filter_area}>
        <SearchBar text="Search" onSearch={onSearch} />
        <Button onClick={toggleSort}>
          Sort {sortFilter === "ASC" ? "A-Z" : "Z-A"}
        </Button>
      </div>
      <EmployeeList searchQueryParams={searchQueryParams} />
    </>
  );
}
