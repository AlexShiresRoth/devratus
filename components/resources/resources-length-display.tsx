"use client";

import axios from "axios";
import React from "react";
import useSWR from "swr";
import Heading2 from "../text/heading-2";

const fetcher = (url: string) =>
  axios({ method: "POST", url }).then((res) => res.data);

const ResourcesLengthDisplay = () => {
  const { data: resources, error } = useSWR(
    "/api/resources/resources",
    fetcher
  );

  console.log("resources?: ", resources);
  return <Heading2>{resources?.resources?.length}</Heading2>;
};

export default ResourcesLengthDisplay;
