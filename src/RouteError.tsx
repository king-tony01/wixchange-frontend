import React from "react";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

function formatErrorData(error: unknown) {
  if (!error) {
    return "No additional error details.";
  }

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.stack || error.message;
  }

  try {
    return JSON.stringify(error, null, 2);
  } catch {
    return "Could not serialize error details.";
  }
}

function RouteError() {
  const error = useRouteError();

  let title = "Something went wrong";
  let summary = "An unexpected routing error occurred.";
  let details = formatErrorData(error);

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    summary =
      typeof error.data === "string"
        ? error.data
        : "A route request failed while loading this page.";
    details = formatErrorData(error.data);
  } else if (error instanceof Error) {
    summary = error.message;
  }

  return (
    <section className="notfound" role="alert" aria-live="assertive">
      <h1>{title}</h1>
      <p>{summary}</p>
      <pre
        style={{
          width: "100%",
          maxWidth: "760px",
          textAlign: "left",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          padding: "12px",
          borderRadius: "8px",
          background: "rgba(255,255,255,0.08)",
          color: "#f6f6f6",
        }}
      >
        {details}
      </pre>
      <Link to="/">Back to Home</Link>
    </section>
  );
}

export default RouteError;
