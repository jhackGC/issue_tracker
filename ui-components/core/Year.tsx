// This file is a client component, so it should start with "use client"
// we want this to run on the client side as it uses useLayoutEffect
// to get the current year and display it.
// This component will be hydrated on the client side after the parent rendered on the server side.
"use client";

import { useLayoutEffect, useState } from "react";

export function Year() {
  const [year, setYear] = useState<number | null>(null);
  useLayoutEffect(() => {
    // This logic will only be run on the client side.
    // It is a year value, we could have done this in the server component,
    // but this is just an example of how to use useLayoutEffect and "use client".
    // If it was a date and year value, we would have to use a client component
    // so its updated every year this component renders
    // and not just when its built/deployed.

    // You can determine when and how often to update
    // the year here. In this example we update it only once
    setYear(new Date().getFullYear());
  }, []);
  if (year) {
    return year;
  }
  return null;
}
