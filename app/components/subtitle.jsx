import Link from "next/link";

const Subtitle = ({ name, category }) => {
  return (
    <div className="subtitle">
      <Link href={"/"} className="subtitleLink">
        Home
      </Link>
      ›
      <Link href="/products/all?page=1#0" className="subtitleLink">
        products
      </Link>
      ›
      <Link href={`/products/${category}#1`} className="subtitleLink">
        {category}
      </Link>
      ›<h4>{name}</h4>
    </div>
  );
};

export default Subtitle;
