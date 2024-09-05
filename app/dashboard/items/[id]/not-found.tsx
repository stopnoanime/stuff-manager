import ErrorPageTemplate from "@/app/_ui/general/error-page-template";

export default function NotFound() {
  return (
    <ErrorPageTemplate
      text="Could not find item with given ID."
      linkHref="/dashboard/items"
      linkText="Return to item list"
    ></ErrorPageTemplate>
  );
}
