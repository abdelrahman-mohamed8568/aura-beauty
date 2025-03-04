"use client";
import "@/styles/productDetails.css";
import { useEffect, useMemo, useState } from "react";
import { addToCard } from "@/store/card/cardSlice";
import { useParams } from "next/navigation";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Image from "next/image";
import { Badge, Box, Collapsible, HStack, Textarea } from "@chakra-ui/react";
import { HiAtSymbol } from "react-icons/hi";
import Subtitle from "@/app/components/subtitle";
import { addHeart, removeHeart } from "@/app/store/wishlist/wishlistSlice";
import { ToastContainer, toast } from "react-toastify";
import ProductsCard from "@/app/components/productsCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/app/components/animations";
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
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
function ProductDetails() {
  const router = useTransitionRouter();
  const dispatch = useDispatch();
  const params = useParams();
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

  useEffect(() => {
    if (selectedProduct) {
      const productImages = [
        selectedProduct.cover,
        selectedProduct.img1,
        selectedProduct.img2,
      ].filter(Boolean);
      setImages(productImages);
      setMainImage(selectedProduct.cover || "");
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
      dispatch(addHeart(selectedProduct));
      toast.success("This product has been added to your wishlist.");
    }
    setActiveHeart(!activeHeart);
  };

  const addToCardHandler = () => {
    dispatch(addToCard(checkedProduct));
    toast(
      <div className="toast">
        <Image
          src={selectedProduct?.cover}
          alt={selectedProduct.name}
          width={98}
          height={98}
          className="toastImg"
          priority
        />
        <div className="toastInfo">
          <p>{selectedProduct.name}</p>
          <div className="homeBtn">
            <a
              onClick={(e) => {
                e.preventDefault();
                router.push("/shopping-cart", {
                  onTransitionReady: slideInOut,
                });
              }}
              className="mainBtn"
            >
              view Cart
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                router.push("/shopping-cart", {
                  onTransitionReady: slideInOut,
                });
              }}
              className="hoverBtn"
            >
              view Cart
            </a>
          </div>
        </div>
      </div>
    );
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("بيانات النموذج:", data);
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
              category={selectedProduct.category}
              name={selectedProduct.name}
            />
            <div className="productBox">
              <div className="productCover">
                <div className="sideImages">
                  {images.map(
                    (img, index) =>
                      img && (
                        <Image
                          key={index}
                          src={img}
                          alt={selectedProduct.name}
                          width={90}
                          height={90}
                          onMouseEnter={() => setMainImage(img)}
                          className={
                            mainImage === img ? "selectedImage" : "sideImage"
                          }
                          priority
                        />
                      )
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
                          priority
                          className="thumbnail"
                        />
                      </motion.div>
                    </DialogTrigger>
                    <DialogContent data-lenis-prevent className="overlayBox">
                      <DialogActionTrigger asChild>
                        <div className="overlay"></div>
                      </DialogActionTrigger>
                      <Image
                        src={mainImage || selectedProduct.cover}
                        alt={selectedProduct.name}
                        width={650}
                        height={650}
                        priority
                        className="zoomedImage"
                      />
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
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(
                            `/products/${selectedProduct.category.replace(
                              " ",
                              "-"
                            )}?page=1`,
                            { onTransitionReady: slideInOut }
                          );
                        }}
                        className="brandLink hoverText"
                      >
                        {selectedProduct.category}
                      </a>
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
                          <HStack>
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
                          <HStack>
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
                {selectedProduct.delivery && (
                  <div className="cashBox">
                    <div>
                      <h3>Delivery Charges</h3>
                      <p>Free delivery to any governorate in Egypt.</p>
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
                )}
                <div className="vat">
                  <p>*All prices are after 14% VAT.</p>
                </div>
              </div>
            </div>
            <div className="description">
              <h2>description</h2>
              <p>{selectedProduct.description}</p>
            </div>
            <div className="related">
              <h2>You May Also Like</h2>
              <Swiper
                spaceBetween={10}
                slidesPerView={4}
                loop={true}
                easing="ease-in-out"
                speed={2000}
                autoplay={{
                  delay: 10,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                modules={[Autoplay]}
                className="productsSwiper"
              >
                {relatedProducts.map((product) => (
                  <SwiperSlide className="productsSwiperSlide" key={product.id}>
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
              {/* <a
                className="contactBtn"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/contact", { onTransitionReady: slideInOut });
                }}
              >
                <span className="buttonIcon">
                  <svg
                    width="10"
                    className="buttonSvg"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 15"
                  >
                    <path
                      fill="currentColor"
                      d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                    ></path>
                  </svg>
                  <svg
                    className="buttonSvg svgCopy"
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    fill="none"
                    viewBox="0 0 14 15"
                  >
                    <path
                      fill="currentColor"
                      d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                    ></path>
                  </svg>
                </span>
                contact us
              </a> */}
            </div>
            <AccordionRoot className="sendMessage" collapsible variant="plain">
              <AccordionItem className="sendMessageHeader">
                <AccordionItemTrigger className="sendMessageText">
                  Send your message
                </AccordionItemTrigger>
                <AccordionItemContent className="sendMessageContent">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="formFlex">
                      <div className="field">
                        <label>Your name</label>
                        <input
                          type="text"
                          autoFocus={true}
                          {...register("name", {
                            required: "The field is required!",
                          })}
                        />
                        {errors.name && (
                          <span className="errorSpan">
                            {errors.name.message}
                          </span>
                        )}
                      </div>
                      <div className="field">
                        <label>phone number</label>
                        <Controller
                          name="phone"
                          control={control}
                          rules={{ required: "The field is required!" }}
                          render={({ field }) => (
                            <PhoneInput
                              className="myPhoneInput"
                              defaultCountry="EG"
                              value={field.value}
                              onChange={field.onChange}
                              international
                            />
                          )}
                        />
                        {errors.phone && (
                          <span className="errorSpan">
                            {errors.phone.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="field">
                      <label>
                        email address
                        <Badge
                          variant="subtle"
                          size="xs"
                          height={"15px"}
                          backgroundColor={"#707070"}
                        >
                          optional
                        </Badge>
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Email format is incorrect",
                          },
                        })}
                      />
                      {errors.email && (
                        <span className="errorSpan">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                    <div className="field">
                      <label>your inquiry</label>
                      <Textarea
                        placeholder="tell us your request or inquiry..."
                        minH={"150px"}
                        borderRadius="15px"
                        _focus={{
                          borderColor: "#707070",
                        }}
                        {...register("message", {
                          required: "The field is required!",
                        })}
                      />
                      {errors.message && (
                        <span className="errorSpan">
                          {errors.message.message}
                        </span>
                      )}
                    </div>
                    <div className="homeBtn">
                      <button className="mainBtn">send</button>
                      <button type="submit" className="hoverBtn">
                        send
                      </button>
                    </div>
                  </form>
                </AccordionItemContent>
              </AccordionItem>
            </AccordionRoot>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
