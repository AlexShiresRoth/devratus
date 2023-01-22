"use client";
import axios from "axios";
import React from "react";
import useSWR from "swr";
import Heading2 from "../text/heading-2";

//@TODO need to dedupe tasks, tasks were saved twice into account
const fetcher = ({ ...args }) =>
  axios({ method: "POST", url: args.url }).then((res) => res.data);

const TasksLengthDisplay = () => {
  const { data: tasks, error } = useSWR(
    { url: "/api/tasks/current-tasks" },
    fetcher
  );

  console.log("fetched tasks?", tasks, "error?", error);
  return <Heading2>{tasks?.tasks?.length}</Heading2>;
};

export default TasksLengthDisplay;
