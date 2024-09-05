"use client";

import ErrorPageTemplate from "../_ui/general/error-page-template";

export default function Error() {
  return (
    <ErrorPageTemplate
      text="Something went wrong!"
      linkHref="/dashboard"
      linkText="Return to dashboard"
    ></ErrorPageTemplate>
  );
}
