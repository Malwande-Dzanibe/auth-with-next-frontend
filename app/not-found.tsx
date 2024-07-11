import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <div>it seems like you got lost</div>{" "}
      <Link
        style={{
          color: "blue",
          textDecoration: "underline",
        }}
        href={"/"}
      >
        go back home
      </Link>
    </>
  );
};
export default NotFound;
