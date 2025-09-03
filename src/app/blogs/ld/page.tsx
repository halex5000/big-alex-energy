"use client";

import { useEffect } from "react";

export default function LaunchDarklyAlias() {
  useEffect(() => {
    window.location.href = "/blogs/launchdarkly";
  }, []);

  return null;
}
