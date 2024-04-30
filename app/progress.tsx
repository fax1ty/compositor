"use client";

import { AppProgressBar } from "next-nprogress-bar";

export const ProgressBar = () => {
  return (
    <AppProgressBar
      height="4px"
      color="#000"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};
