"use client";
import "@/styles/productDetails.css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import { useEffect, useMemo, useState } from "react";
import { addToCard } from "@/store/card/cardSlice";
import { useParams, usePathname } from "next/navigation";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Image from "next/image";
import { Badge, HStack } from "@chakra-ui/react";
import { HiAtSymbol } from "react-icons/hi";
import Subtitle from "@/app/components/common/subtitle";
import { addHeart, removeHeart } from "@/app/store/wishlist/wishlistSlice";
import { ToastContainer, toast } from "react-toastify";
import ProductsCard from "@/app/components/common/productsCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Zoom } from "swiper/modules";
import { motion } from "framer-motion";
import {
  DialogActionTrigger,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "@/components/ui/radio-card";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import ContactForm from "./contactForm";
import Link from "next/link";

function ProductsDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const FromPath = pathSegments[1];
  const productId = params?.productDetails;
  const [isAdded, setIsAdded] = useState(false);
  const [activeHeart, setActiveHeart] = useState(false);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [sizes, setSizes] = useState(null);
  const [colors, setColors] = useState(null);
  const products = useSelector(
    (state) => state.products.products || [],
    shallowEqual
  );
  const cardItems = useSelector(
    (state) => state.card?.items || [],
    shallowEqual
  );
  const wishlistItems = useSelector(
    (state) => state.wishlist?.items || [],
    shallowEqual
  );
  const selectedProduct = useMemo(() => {
    return (
      products.find((product) => product.id.toString() === productId) || null
    );
  }, [products, productId]);
  const relatedProducts = useMemo(() => {
    if (!selectedProduct || !selectedProduct.tag) return [];
    const tags = selectedProduct.tag;
    return products.filter((product) => {
      if (product.id === selectedProduct.id) return false;
      const productCategory = product.category;
      return tags.some((tag) => productCategory.includes(tag));
    });
  }, [products, selectedProduct]);
  const shuffledProducts = [...relatedProducts].sort(() => Math.random() - 0.5);
  useEffect(() => {
    if (selectedProduct) {
      let productImages = [];
      if (selectedProduct.cover) {
        productImages.push(selectedProduct.cover);
      }
      if (
        Array.isArray(selectedProduct.images) &&
        selectedProduct.images.length > 0
      ) {
        productImages = [...productImages, ...selectedProduct.images];
      }
      setImages(productImages);
      setMainImage(productImages[0] || "");
      setSizes(
        selectedProduct.size && selectedProduct.size.length > 0
          ? selectedProduct.size[0]
          : null
      );
      setColors(
        selectedProduct.color && selectedProduct.color.length > 0
          ? selectedProduct.color[0]
          : null
      );
    }
  }, [selectedProduct]);
  const checkedProduct = useMemo(() => {
    if (!selectedProduct) return null;
    return {
      ...selectedProduct,
      size:
        sizes !== null
          ? sizes
          : selectedProduct.size && Array.isArray(selectedProduct.size)
          ? selectedProduct.size[0]
          : null,
      color:
        colors !== null
          ? colors
          : selectedProduct.color && Array.isArray(selectedProduct.color)
          ? selectedProduct.color[0]
          : null,
    };
  }, [selectedProduct, sizes, colors]);
  const productMatches = (item, product, selectedSize, selectedColor) => {
    if (item.id !== product.id) return false;
    if (product.size) {
      const sizeToCompare =
        selectedSize ||
        (Array.isArray(product.size) ? product.size[0] : product.size);
      if (item.size !== sizeToCompare) return false;
    }
    if (product.color) {
      const colorToCompare =
        selectedColor ||
        (Array.isArray(product.color) ? product.color[0] : product.color);
      if (item.color !== colorToCompare) return false;
    }
    return true;
  };
  const isMatched = useMemo(() => {
    if (!selectedProduct) return false;
    return cardItems.some((item) =>
      productMatches(item, selectedProduct, sizes, colors)
    );
  }, [cardItems, selectedProduct, sizes, colors]);
  const isProductInWishlist = useMemo(() => {
    return wishlistItems.some((item) => item.id === selectedProduct?.id);
  }, [wishlistItems, selectedProduct]);
  useEffect(() => {
    setActiveHeart(isProductInWishlist);
    setIsAdded(isMatched);
  }, [isMatched, isProductInWishlist]);
  const heartHandler = () => {
    if (activeHeart) {
      dispatch(removeHeart(selectedProduct.id));
      toast.error("This product has been removed from the wishlist!");
    } else {
      dispatch(addHeart({ ...selectedProduct, fromPath: FromPath }));
      toast.success("This product has been added to your wishlist.");
    }
    setActiveHeart(!activeHeart);
  };
  const addToCardHandler = () => {
    dispatch(addToCard({ ...checkedProduct, fromPath: FromPath }));
    toast(
      <div className="toast">
        <img
          src={selectedProduct?.cover}
          alt={selectedProduct.name}
          width={98}
          height={98}
          className="toastImg"
        />
        <div className="toastInfo">
          <p>{selectedProduct.name}</p>
          <div className="homeBtn">
            <Link href={"/shopping-cart"} className="mainBtn">
              view Cart
            </Link>
            <Link href={"/shopping-cart"} className="hoverBtn">
              view Cart
            </Link>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="mainContainer">
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
      <div className="productContainer">
        {selectedProduct && (
          <>
            <Subtitle
              category={selectedProduct.category[0]}
              path={FromPath}
              name={selectedProduct.name}
            />
            <div className="productBox">
              <div className="productCover">
                <div className="sideImages">
                  {images.length > 3 ? (
                    <Swiper
                      spaceBetween={10}
                      navigation={true}
                      modules={[Navigation]}
                      breakpoints={{
                        320: {
                          direction: "horizontal",
                          slidesPerView: 3,
                        },
                        1024: {
                          direction: "vertical",
                          slidesPerView: 4,
                        },
                      }}
                      className="sideImagesSwiper"
                    >
                      {images.map((img, index) => (
                        <SwiperSlide
                          key={index}
                          className="sideImagesSwiperBox"
                        >
                          <Image
                            src={img}
                            alt="Product Image"
                            width={90}
                            height={90}
                            onMouseEnter={() => setMainImage(img)}
                            className={
                              mainImage === img ? "selectedImage" : "sideImage"
                            }
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <div className="sideImages">
                      {images.map((img, index) => (
                        <Image
                          key={index}
                          src={img}
                          alt="Product Image"
                          width={90}
                          height={90}
                          onMouseEnter={() => setMainImage(img)}
                          className={
                            mainImage === img ? "selectedImage" : "sideImage"
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="mainImage">
                  <DialogRoot>
                    <DialogTrigger asChild>
                      <motion.div
                        key={mainImage || selectedProduct.cover}
                        initial={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        exit={{ opacity: 0, translateY: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Image
                          src={mainImage || selectedProduct.cover}
                          alt={selectedProduct.name}
                          width={550}
                          height={550}
                          className="thumbnail"
                        />
                      </motion.div>
                    </DialogTrigger>
                    <DialogContent data-lenis-prevent className="overlayBox">
                      <DialogActionTrigger asChild>
                        <div className="overlay"></div>
                      </DialogActionTrigger>
                      <Swiper
                        zoom={true}
                        modules={[Zoom]}
                        className="zoomedImage"
                      >
                        <SwiperSlide>
                          <div className="swiper-zoom-container">
                            <Image
                              src={mainImage || selectedProduct.cover}
                              alt={selectedProduct.name}
                              width={650}
                              height={650}
                            />
                          </div>
                        </SwiperSlide>
                      </Swiper>
                    </DialogContent>
                  </DialogRoot>
                </div>
              </div>
              <div className="productInfo">
                <h1>{selectedProduct.name}</h1>
                {selectedProduct.price ? (
                  <h3>{selectedProduct.price} EGP</h3>
                ) : (
                  <p>indefinite price</p>
                )}
                {selectedProduct.store ? (
                  <div>
                    <Badge variant="solid" colorPalette="green">
                      In Stock
                      <HiAtSymbol />
                    </Badge>
                  </div>
                ) : (
                  <div>
                    <Badge variant="solid" colorPalette="red">
                      Out Of Stock
                      <HiAtSymbol />
                    </Badge>
                  </div>
                )}
                <div className="brand">
                  <div className="brandBox">
                    <h6>
                      Category:
                      {selectedProduct.category.map((item, index) => {
                        const category = item.toString();
                        return (
                          <Link
                            href={`/${FromPath}/${category.replace(
                              / /g,
                              "-"
                            )}?page=1`}
                            key={index}
                            className="brandLink hoverText"
                          >
                            {category}
                            {index < selectedProduct.category.length - 1 &&
                              ", "}
                          </Link>
                        );
                      })}
                    </h6>
                    {selectedProduct.brand && (
                      <h6>
                        Brand:
                        <span className="brandLink">
                          {selectedProduct.brand}
                        </span>
                      </h6>
                    )}
                    {selectedProduct.size &&
                      selectedProduct.size.length > 0 && (
                        <RadioCardRoot
                          orientation="vertical"
                          defaultValue={selectedProduct.size[0]}
                          className="sizes"
                        >
                          <RadioCardLabel
                            fontSize="14px"
                            fontWeight="500"
                            color="#707070"
                          >
                            Size:
                          </RadioCardLabel>
                          <HStack
                            style={{
                              flexWrap: "wrap",
                            }}
                          >
                            {selectedProduct.size.map((item) => (
                              <RadioCardItem
                                key={item}
                                label={item}
                                value={item}
                                onChange={() => setSizes(item)}
                                indicator={false}
                                _checked={{
                                  borderColor: "#d5ab42",
                                  color: "#d5ab42",
                                }}
                                className="radioCard"
                              />
                            ))}
                          </HStack>
                        </RadioCardRoot>
                      )}
                    {selectedProduct.color &&
                      selectedProduct.color.length > 0 && (
                        <RadioCardRoot
                          orientation="vertical"
                          defaultValue={selectedProduct.color[0]}
                          className="colors"
                        >
                          <RadioCardLabel
                            fontSize="14px"
                            fontWeight="500"
                            color="#707070"
                          >
                            Color:
                          </RadioCardLabel>
                          <HStack
                            style={{
                              flexWrap: "wrap",
                            }}
                          >
                            {selectedProduct.color.map((item) => (
                              <RadioCardItem
                                key={item}
                                label={item}
                                value={item}
                                onChange={() => setColors(item)}
                                indicator={false}
                                _checked={{
                                  borderColor: "#d5ab42",
                                  color: "#d5ab42",
                                }}
                                className="radioCard"
                              />
                            ))}
                          </HStack>
                        </RadioCardRoot>
                      )}
                  </div>
                </div>
                <div className="attentionBox">
                  <div className="wishlistBox" onClick={heartHandler}>
                    <button className="wishlistCard">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-heart"
                        viewBox="0 0 16 16"
                      >
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-heart-fill"
                        id={activeHeart ? "activeHeart" : "heartHover"}
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                        />
                      </svg>
                    </button>
                    <h2>add to wishlist</h2>
                  </div>
                  <button
                    className={`addCard ${isAdded ? "addedCard" : ""}`}
                    onClick={addToCardHandler}
                    disabled={isAdded || !selectedProduct.store}
                  >
                    {!isAdded && (
                      <div className="buySvg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="currentColor"
                          className="bi bi-cart3"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                      </div>
                    )}
                    {!selectedProduct.store && <p>Out Of Stock</p>}
                    <div className="btnText">
                      <p>
                        {selectedProduct.store
                          ? isAdded
                            ? "ADDED TO BAG"
                            : "ADD TO BAG"
                          : "OUT OF STOCK"}
                      </p>
                    </div>
                  </button>
                </div>
                <div className="cashBox">
                  <div>
                    <h3>Cash On Delivery</h3>
                    <p>Within (1-5) working days for all governorates.</p>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-truck"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                    </svg>
                  </div>
                </div>
                <div className="cashBox">
                  <div>
                    <h3>Delivery Charges</h3>
                    <p>Free delivery for purchases over 2,000 EGP.</p>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-currency-dollar"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z" />
                    </svg>
                  </div>
                </div>
                <div className="vat">
                  <p>*All prices are after 14% VAT.</p>
                </div>
              </div>
            </div>
            <div className="description">
              <h2>description</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: selectedProduct.description,
                }}
              />
            </div>
            <div className="related">
              <h2>You May Also Like</h2>
              <Swiper
                loop={true}
                easing="ease-in-out"
                speed={2000}
                autoplay={{
                  delay: 10,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                modules={[Autoplay]}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                  },
                }}
                className="productSwiper"
              >
                {shuffledProducts.map((product) => (
                  <SwiperSlide className="productSwiperSlide" key={product.id}>
                    <ProductsCard {...product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="inquiry">
              <div className="inquiryText">
                <h2>Didn't find what you were looking for here?</h2>
                <h3>
                  If you have any inquiries or requests regarding products or
                  quantities, our customer service team is ready to assist you.
                  You can easily contact us and our team will get back to you as
                  soon as possible.
                </h3>
              </div>
            </div>
            <AccordionRoot className="sendMessage" collapsible variant="plain">
              <AccordionItem className="sendMessageHeader">
                <AccordionItemTrigger className="sendMessageText">
                  Send your message
                </AccordionItemTrigger>
                <AccordionItemContent className="sendMessageContent">
                  <ContactForm />
                </AccordionItemContent>
              </AccordionItem>
            </AccordionRoot>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductsDetails;
