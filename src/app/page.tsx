import { caller } from "@/trpc/server";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const page = async () => {
  const data = await caller.hello({
    text: "Hello from the server!",
  });
  return <div>{JSON.stringify(data)}</div>;
};

export default page;
