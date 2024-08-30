export default function SearchBar() {
  return (
    <form
      className="flex border-stone-900 border-solid border-b h-16 justify-center p-2"
      action="/dashboard/search"
      method="get"
    >
      <input
        name="query"
        placeholder="Search for items"
        className="styled-input !w-[50vw]"
      ></input>
      <button type="submit" className="styled-input !w-auto !border-l-0">
        Search
      </button>
      <button type="button" className="styled-input !w-auto !border-l-0">
        QR search
      </button>
    </form>
  );
}
