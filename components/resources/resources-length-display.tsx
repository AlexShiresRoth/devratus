"use client";

import axios from "axios";
import React from "react";
import useSWR from "swr";

const fetcher = (url: string) =>
  axios({ method: "POST", url }).then((res) => res.data);

const ResourcesLengthDisplay = () => {
  const { data: resources, error } = useSWR(
    "/api/resources/resources",
    fetcher
  );

  console.log("resources?: ", resources);
  return <div>ResourcesLengthDisplay</div>;
};

export default ResourcesLengthDisplay;
