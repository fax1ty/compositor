"use client";

import HyperDXScript from "@hyperdx/browser";
import { useEffect } from "react";

export const HyperDX = () => {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_HYPERDX_TOKEN) return;
    HyperDXScript.init({
      apiKey: process.env.NEXT_PUBLIC_HYPERDX_TOKEN,
      service: "compositor",
      //   tracePropagationTargets: [/api.myapp.domain/i], // Set to link traces from frontend to backend requests
      consoleCapture: true, // Capture console logs (default false)
      advancedNetworkCapture: true, // Capture full HTTP request/response headers and bodies (default false)
    });
  }, []);

  return null;
};
