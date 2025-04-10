"use client";
import "@/styles/shoppingCart.css";
import Image from "next/image";
import {
  removeCard,
  plusQuantity,
  minusQuantity,
  getTotalPrice,
} from "../store/card/cardSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import { motion } from "framer-motion";

function ShoppingCart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.card.items);
  const total = useSelector(getTotalPrice);
  const plus = (item) =>
    dispatch(plusQuantity({ id: item.id, size: item.size, color: item.color }));
  const minus = (item) =>
    dispatch(
      minusQuantity({ id: item.id, size: item.size, color: item.color })
    );
  const removeItem = (item) => {
    dispatch(removeCard({ id: item.id, size: item.size, color: item.color }));
    toast.error("This product has been removed from your bag !");
  };
  console.log(items);

  return (
    <div className="buyContainer">
      <div className="shoppingCartHeader">
        <h1>YOUR BAG</h1>
      </div>
      <div className="shoppingCartContainer">
        {!items.length == 0 && (
          <div className="total">
            <div className="totalBox">
              <h2>Total: EGP {total}</h2>
              <div className="homeBtn">
                <Link href={"/checkout"} className="mainBtn">
                  CHECKOUT
                </Link>
                <Link href={"/checkout"} className="hoverBtn">
                  CHECKOUT
                </Link>
              </div>
            </div>
          </div>
        )}
        <div className="wishlistContainer">
          {items.length === 0 ? (
            <div className="empty">
              <h1>The bag is empty!</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="empty-cart"
                viewBox="0 0 650 512"
              >
                <circle
                  cx="337.969"
                  cy="243.395"
                  r="167.695"
                  fill="#dbe8ec"
                ></circle>
                <path
                  fill="#dbe8ec"
                  d="M574.58343,223.75715V205.64747a13.02087,13.02087,0,0,0-13.02086-13.02087H505.60333a13.02086,13.02086,0,0,1-13.02086-13.02086V161.49606a13.02087,13.02087,0,0,1,13.02086-13.02087h21.45112a13.02087,13.02087,0,0,0,13.02086-13.02087V117.34464a13.02087,13.02087,0,0,0-13.02086-13.02087H143.13523a13.02087,13.02087,0,0,0-13.02087,13.02087v18.10968a13.02087,13.02087,0,0,0,13.02087,13.02087h0a13.02087,13.02087,0,0,1,13.02086,13.02087v18.10968a13.02086,13.02086,0,0,1-13.02086,13.02086H82.7824a13.02087,13.02087,0,0,0-13.02087,13.02087v18.10968A13.02087,13.02087,0,0,0,82.7824,236.778h59.75769A13.02087,13.02087,0,0,1,155.561,249.79889v18.10976c.31905,16.57135-35.82964,13.02087-43.02086,13.02087h-.04775a13.02087,13.02087,0,0,0-13.02087,13.02087V312.06a13.02087,13.02087,0,0,0,13.02087,13.02087h32.85852a13.02087,13.02087,0,0,1,13.02087,13.02087v18.10976a13.02087,13.02087,0,0,1-13.02087,13.02087H108.43743a13.02087,13.02087,0,0,0-13.02086,13.02087V400.3629a13.02086,13.02086,0,0,0,13.02086,13.02086H524.045a13.02087,13.02087,0,0,0,13.02087-13.02086V382.25322A13.02087,13.02087,0,0,0,524.045,369.23235H502.75526a13.02087,13.02087,0,0,1-13.02087-13.02087V338.10172a13.02087,13.02087,0,0,1,13.02087-13.02087h36.62008A13.02087,13.02087,0,0,0,552.39621,312.06V293.95039a13.02087,13.02087,0,0,0-13.02087-13.02087H521.30005a13.02087,13.02087,0,0,1-13.02087-13.02087V249.79889A13.02087,13.02087,0,0,1,521.30005,236.778h40.26252A13.02087,13.02087,0,0,0,574.58343,223.75715Z"
                ></path>
                <circle
                  cx="340.677"
                  cy="148.55"
                  r="46.959"
                  fill="#3086a3"
                ></circle>
                <path
                  fill="none"
                  stroke="#f9ae2b"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M324.05253,138.77179q-.00092-.08715-.00092-.17432a16.62566,16.62566,0,1,1,16.86682,16.62391v15.09678"
                ></path>
                <line
                  x1="419.668"
                  x2="451.971"
                  y1="116.939"
                  y2="116.939"
                  fill="none"
                  stroke="#3086a3"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="3"
                ></line>
                <line
                  x1="419.668"
                  x2="451.971"
                  y1="126.25"
                  y2="126.25"
                  fill="none"
                  stroke="#3086a3"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="3"
                ></line>
                <line
                  x1="419.668"
                  x2="451.971"
                  y1="135.56"
                  y2="135.56"
                  fill="none"
                  stroke="#3086a3"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="3"
                ></line>
                <line
                  x1="119.153"
                  x2="151.456"
                  y1="293.762"
                  y2="293.762"
                  fill="none"
                  stroke="#3086a3"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="3"
                ></line>
                <line
                  x1="119.153"
                  x2="151.456"
                  y1="303.072"
                  y2="303.072"
                  fill="none"
                  stroke="#3086a3"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="3"
                ></line>
                <line
                  x1="119.153"
                  x2="151.456"
                  y1="312.383"
                  y2="312.383"
                  fill="none"
                  stroke="#3086a3"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="3"
                ></line>
                <line
                  x1="481.64"
                  x2="513.943"
                  y1="360.156"
                  y2="360.156"
                  fill="none"
                  stroke="#3086a3"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="3"
                ></line>
                <line
                  x1="481.64"
                  x2="513.943"
                  y1="369.467"
                  y2="369.467"
                  fill="none"
                  stroke="#3086a3"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="3"
                ></line>
                <line
                  x1="481.64"
                  x2="513.943"
                  y1="378.777"
                  y2="378.777"
                  fill="none"
                  stroke="#3086a3"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="3"
                ></line>
                <circle
                  cx="520.577"
                  cy="300.496"
                  r="13.807"
                  fill="#b9d4db"
                ></circle>
                <circle
                  cx="484.141"
                  cy="310.461"
                  r="7.159"
                  fill="#b9d4db"
                ></circle>
                <circle
                  cx="502.32"
                  cy="266.711"
                  r="10.228"
                  fill="#b9d4db"
                ></circle>
                <circle
                  cx="206.393"
                  cy="389.674"
                  r="16.428"
                  fill="#b9d4db"
                ></circle>
                <circle
                  cx="175.001"
                  cy="377.974"
                  r="8.557"
                  fill="#b9d4db"
                ></circle>
                <circle
                  cx="182.861"
                  cy="348.886"
                  r="4.936"
                  fill="#b9d4db"
                ></circle>
                <circle
                  cx="210.185"
                  cy="352.378"
                  r="11.833"
                  fill="#b9d4db"
                ></circle>
                <circle
                  cx="218.423"
                  cy="143.059"
                  r="16.428"
                  fill="#b9d4db"
                ></circle>
                <circle
                  cx="219.09"
                  cy="109.564"
                  r="8.557"
                  fill="#b9d4db"
                ></circle>
                <circle
                  cx="276.085"
                  cy="114.564"
                  r="7.406"
                  fill="#b9d4db"
                ></circle>
                <circle
                  cx="249.141"
                  cy="107.367"
                  r="4.936"
                  fill="#b9d4db"
                ></circle>
                <circle
                  cx="254.877"
                  cy="134.31"
                  r="11.833"
                  fill="#b9d4db"
                ></circle>
                <path
                  fill="#409cb5"
                  d="M480.85793,233.2431H202.6215L193.549,210.24282h287.309a2.72176,2.72176,0,0,1,2.72176,2.72176v17.55676A2.72176,2.72176,0,0,1,480.85793,233.2431Z"
                ></path>
                <path
                  fill="#f9ae2b"
                  d="M440.32266,354.08924H251.1267a4.53627,4.53627,0,0,1-4.24692-2.94208L202.6215,233.2431h268.547l-26.4204,117.30658A4.53627,4.53627,0,0,1,440.32266,354.08924Z"
                ></path>
                <path
                  fill="#3086a3"
                  d="M457.56233,293.66888c-19.355,1.24146-38.71,1.89087-58.065,2.33216-9.6775.27637-19.355.33777-29.03251.50036l-29.0325.16578q-29.0325.02636-58.065-.65723c-19.355-.43945-38.71-1.09216-58.065-2.34107,19.355-1.2489,38.71-1.90148,58.065-2.34106q29.03249-.65185,58.065-.6571l29.0325.16565c9.6775.16259,19.355.224,29.03251.50048C418.8523,291.778,438.20731,292.42755,457.56233,293.66888Z"
                ></path>
                <path
                  fill="#3086a3"
                  d="M419.70359 233.2431c-1.1026 10.54578-2.78772 20.96045-4.64789 31.33558q-2.82669 15.55462-6.30877 30.96154-3.46357 15.41108-7.56577 30.67835c-1.38006 5.08618-2.80926 10.16137-4.33484 15.21484-.78927 2.52075-1.54083 5.05-2.361 7.56384l-.632 1.90967a4.91879 4.91879 0 0 1-1.18194 1.85889 4.67456 4.67456 0 0 1-3.81363 1.32349 4.373 4.373 0 0 0 3.11981-1.90845 3.91413 3.91413 0 0 0 .633-1.61035l.25211-1.93872c.3367-2.62269.742-5.22986 1.10959-7.84571.78815-5.21948 1.6727-10.41736 2.60638-15.60412q2.82738-15.55444 6.31671-30.95972 3.47562-15.40833 7.57367-30.67664C413.23631 253.37482 416.17866 243.24335 419.70359 233.2431ZM311.58605 354.0893a4.68121 4.68121 0 0 1-3.92411-1.458 6.69642 6.69642 0 0 1-1.156-1.8822l-.89646-1.85706c-1.1946-2.47632-2.32068-4.97827-3.4844-7.46619-2.27786-4.9945-4.463-10.02368-6.60287-15.06994q-6.39166-15.14906-12.15434-30.53431-5.78044-15.37866-10.948-30.9873c-3.41577-10.41675-6.65956-20.89807-9.33894-31.59119 5.01886 9.815 9.47332 19.8418 13.75582 29.93323q6.391 15.14941 12.14673 30.53723 5.76888 15.38306 10.94045 30.99012c1.70927 5.20788 3.37323 10.43273 4.94449 15.69238.76086 2.63916 1.55934 5.26416 2.28932 7.91479l.54693 1.98828a5.88655 5.88655 0 0 0 .66687 1.77539A4.37022 4.37022 0 0 0 311.58605 354.0893Z"
                ></path>
                <circle
                  cx="298.105"
                  cy="428.058"
                  r="18.743"
                  fill="#409cb5"
                ></circle>
                <circle
                  cx="298.105"
                  cy="428.058"
                  r="8.651"
                  fill="#dbe8ec"
                ></circle>
                <circle
                  cx="406.224"
                  cy="428.058"
                  r="18.743"
                  fill="#409cb5"
                ></circle>
                <circle
                  cx="406.224"
                  cy="428.058"
                  r="8.651"
                  fill="#dbe8ec"
                ></circle>
                <path
                  fill="#3086a3"
                  d="M343.09231,233.2431c1.83931,9.99671,3.08253,20.02881,4.14664,30.07178q1.55889,15.06646,2.44714,30.173.9072,15.1053,1.161,30.24952c.13792,10.098.0925,20.207-.55473,30.35193-1.84722-9.99622-3.09265-20.02833-4.15473-30.07129q-1.5582-15.06666-2.43905-30.17347-.89487-15.106-1.15285-30.25012C342.40978,253.49628,342.453,243.38739,343.09231,233.2431Z"
                ></path>
                <path
                  fill="#409cb5"
                  d="M437.93777,399.80133H268.38406a3.00011,3.00011,0,0,1-2.801-1.92578L167.38479,141.898H115.37112a3,3,0,0,1,0-6h54.07593a3.0001,3.0001,0,0,1,2.801,1.92578l98.19824,255.97754H437.93777a3,3,0,0,1,0,6Z"
                ></path>
                <rect
                  width="39.6"
                  height="18.36"
                  x="103.858"
                  y="130.248"
                  fill="#409cb5"
                  rx="2"
                ></rect>
                <circle cx="340.677" cy="179.6" r="2.7" fill="#f9ae2b"></circle>
              </svg>
            </div>
          ) : (
            items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -20 }}
                transition={{ duration: 0.3 }}
                key={index}
              >
                <div className="shoppingCart">
                  <div className="shoppingCartDetails">
                    <div className="shoppingCartOption">
                      <Link
                        href={`/${item.fromPath}/${item.category[0]
                          .toString()
                          .replace(" ", "-")}/${item.id}`}
                      >
                        <Image
                          src={item.cover}
                          alt={"product image"}
                          className="shoppingCartImg"
                          width={150}
                          height={150}
                          priority
                        />
                      </Link>
                    </div>
                    <div className="shoppingCartInfo">
                      <h3>
                        <Link
                          href={`/${item.fromPath}/${item.category[0]
                            .toString()
                            .replace(" ", "-")}/${item.id}`}
                          className="hoverText"
                        >
                          {item.name}
                          {item.size && <span> {item.size} </span>}
                          {item.color && <span> {item.color}</span>}
                        </Link>
                      </h3>
                      {item.category.map((items, index) => {
                        const category = items.toString();
                        return (
                          <p key={index}>
                            <Link
                              href={`/${item.fromPath}/${category.replace(
                                " ",
                                "-"
                              )}?page=${1}`}
                              className="hoverText"
                            >
                              {category}
                            </Link>
                          </p>
                        );
                      })}
                      {item.price ? (
                        <h3>EGP {item.price}</h3>
                      ) : (
                        <h4>indefinite</h4>
                      )}

                      <div className="quantity">
                        <button
                          onClick={() => minus(item)}
                          disabled={item.quantity == item.minQuantity}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => plus(item)}
                          disabled={item.quantity >= item.maxQuantity}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-trash3"
                    viewBox="0 0 16 16"
                    onClick={() => removeItem(item)}
                  >
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                  </svg>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={2}
        theme="dark"
      />
    </div>
  );
}

export default ShoppingCart;
