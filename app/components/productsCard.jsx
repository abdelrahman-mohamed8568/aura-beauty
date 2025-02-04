import Image from "next/image";
import cardImg from "@/images/product_demo.jpg";
function ProductsCard() {
  return (
    <div className="productCard">
      <Image
        width={230}
        height={230}
        src={cardImg}
        alt="Green double couch with wooden legs"
        className="cardImg"
      />
      <div className="cardBody">
        <p>filler</p>
        <div className="productsCardInfo">
          <h3>Living room Sofa</h3>
          <h5>$450</h5>
        </div>
      </div>
      <div>
        <button>Buy now</button>
        <button>Add to cart</button>
      </div>
    </div>
  );
}

export default ProductsCard;
