import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "./animations";

const Subtitle = ({ name, category, path }) => {
  const router = useTransitionRouter();

  return (
    <div className="subtitle">
      <a
        onClick={(e) => {
          e.preventDefault();
          router.push("/", {
            onTransitionReady: slideInOut,
          });
        }}
        className="subtitleLink"
      >
        Home
      </a>
      ›
      <a
        onClick={(e) => {
          e.preventDefault();
          router.push(`/${path}/all?page=1`, {
            onTransitionReady: slideInOut,
          });
        }}
        className="subtitleLink"
      >
        {path}
      </a>
      ›
      <a
        onClick={(e) => {
          e.preventDefault();
          router.push(`/${path}/${category.replace(" ", "-")}?page=1`, {
            onTransitionReady: slideInOut,
          });
        }}
        className="subtitleLink"
      >
        {category}
      </a>
      ›<h4>{name}</h4>
    </div>
  );
};

export default Subtitle;
