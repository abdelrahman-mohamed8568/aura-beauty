import Link from "next/link";

const Subtitle = ({ name, category, path }) => {
  return (
    <div className="subtitle">
      <Link href={"/"} className="subtitleLink">
        Home
      </Link>
      ›
      <Link href={`/${path}/all?page=1`} className="subtitleLink">
        {path}
      </Link>
      ›
      <Link
        href={`/${path}/${category.replace(/ /g, "-")}?page=1`}
        className="subtitleLink"
      >
        {category}
      </Link>
      ›<h4>{name}</h4>
    </div>
  );
};

export default Subtitle;
