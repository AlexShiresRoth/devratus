"use client";
import axios from "axios";
import React from "react";
import useSWR from "swr";
import Heading2 from "../text/heading-2";

const fetcher = (url: string) =>
  axios({ method: "POST", url }).then((res) => res.data);

const GroupLengthDisplay = () => {
  const { data: groups, error } = useSWR("/api/groups/fetch-groups", fetcher);

  console.log("groups: ", groups);

  if (error) return null;

  return <Heading2>{groups?.groups?.length}</Heading2>;
};

export default GroupLengthDisplay;
