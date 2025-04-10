"use client";
import "swiper/css";
import "@/styles/checkout.css";
import "swiper/css/scrollbar";
import "react-phone-number-input/style.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Textarea } from "@chakra-ui/react";
import { clearCart, getTotalPrice } from "../store/card/cardSlice";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "@/lib/supabase";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
function Checkout() {
  const dispatch = useDispatch();
  const cardItems = useSelector((state) => state.card.items);
  const total = useSelector(getTotalPrice);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (cardItems.length === 0) {
      router.push("/products/all?page=1");
    }
  }, [cardItems, router]);

  const onSubmit = async (data) => {
    try {
      const items = cardItems.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        brand: item.brand,
        quantity: item.quantity,
        price: item.price,
        cover: item.cover,
        size: item.size,
        color: item.color,
      }));
      const orderData = {
        first_name: data.firstName,
        last_name: data.lastName || null,
        email: data.email || null,
        phone: data.phone,
        governorate: data.governorate,
        city: data.city,
        address: data.address,
        note: data.note || null,
        products: items,
        total: total,
        created_at: new Date().toISOString(),
      };
      const { error } = await supabase.from("orders").insert([orderData]);
      if (error) {
        toast.error("An error occurred while sending the order!");
      } else {
        toast.success("Your order has been sent successfully!");
        setTimeout(() => {
          router.push("/products/all?page=1");
        }, 2000);
        setTimeout(() => {
          dispatch(clearCart());
        }, 3000);
        window.history.replaceState(null, "", "/products/all?page=1");
      }
    } catch (err) {
      toast.error("An unexpected error occurred!");
    }
  };
  const governorates = [
    { value: "", label: "Select Governorate", disabled: true },
    { value: "Cairo", label: "Cairo" },
    { value: "Giza", label: "Giza" },
    { value: "Alexandria", label: "Alexandria" },
    { value: "Dakahlia", label: "Dakahlia" },
    { value: "Red Sea", label: "Red Sea" },
    { value: "Beheira", label: "Beheira" },
    { value: "Fayoum", label: "Fayoum" },
    { value: "Gharbia", label: "Gharbia" },
    { value: "Ismailia", label: "Ismailia" },
    { value: "Kafr El Sheikh", label: "Kafr El Sheikh" },
    { value: "Matrouh", label: "Matrouh" },
    { value: "Minya", label: "Minya" },
    { value: "Monufia", label: "Monufia" },
    { value: "New Valley", label: "New Valley" },
    { value: "North Sinai", label: "North Sinai" },
    { value: "Port Said", label: "Port Said" },
    { value: "Qalyubia", label: "Qalyubia" },
    { value: "Qena", label: "Qena" },
    { value: "Sohag", label: "Sohag" },
    { value: "South Sinai", label: "South Sinai" },
    { value: "Suez", label: "Suez" },
    { value: "Aswan", label: "Aswan" },
    { value: "Beni Suef", label: "Beni Suef" },
    { value: "Damietta", label: "Damietta" },
    { value: "Luxor", label: "Luxor" },
    { value: "Sharkia", label: "Sharkia" },
    { value: "Assiut", label: "Assiut" },
  ];
  return (
    <div className="buyContainer">
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
      <div className="checkoutContainer">
        <div className="info">
          <div className="formInfo">
            <h2>Order Information</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="formFlex">
                <div className="field">
                  <label>First Name</label>
                  <input
                    type="text"
                    autoFocus={true}
                    {...register("firstName", {
                      required: "The field is required!",
                    })}
                  />
                  {errors.firstName && (
                    <span className="errorSpan">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
                <div className="field">
                  <label>
                    Last Name
                    <Badge
                      variant="subtle"
                      size="xs"
                      height={"15px"}
                      backgroundColor={"#707070"}
                    >
                      optional
                    </Badge>
                  </label>
                  <input type="text" {...register("lastName")} />
                </div>
              </div>
              <div className="field">
                <label>
                  Email Address
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
                  <span className="errorSpan">{errors.email.message}</span>
                )}
              </div>
              <div className="field">
                <label>Phone Number</label>
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
                  <span className="errorSpan">{errors.phone.message}</span>
                )}
              </div>
              <div className="field">
                <label>Country</label>
                <input type="text" placeholder="Egypt (EG)" disabled={true} />
              </div>
              <div className="formFlex">
                <div className="field">
                  <label>Governorate</label>
                  <select
                    defaultValue=""
                    {...register("governorate", {
                      required: "The field is required!",
                    })}
                  >
                    {governorates.map((gov) => (
                      <option
                        key={gov.value}
                        value={gov.value}
                        disabled={gov.disabled || false}
                      >
                        {gov.label}
                      </option>
                    ))}
                  </select>
                  {errors.governorate && (
                    <span className="errorSpan">
                      {errors.governorate.message}
                    </span>
                  )}
                </div>
                <div className="field">
                  <label>City</label>
                  <input
                    type="text"
                    {...register("city", {
                      required: "The field is required!",
                    })}
                  />
                  {errors.city && (
                    <span className="errorSpan">{errors.city.message}</span>
                  )}
                </div>
              </div>
              <div className="field">
                <label>Address</label>
                <input
                  type="text"
                  {...register("address", {
                    required: "The field is required!",
                  })}
                />
                {errors.address && (
                  <span className="errorSpan">{errors.address.message}</span>
                )}
              </div>
              <div className="field">
                <label>
                  Note
                  <Badge
                    variant="subtle"
                    size="xs"
                    height={"15px"}
                    backgroundColor={"#707070"}
                  >
                    optional
                  </Badge>
                </label>
                <Textarea
                  placeholder="Let us know if you have any comments or requests..."
                  minH={"80px"}
                  borderRadius="15px"
                  _focus={{
                    borderColor: "#707070",
                  }}
                  {...register("note")}
                />
              </div>
              <h2>Payment Method</h2>
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
              <div className="homeBtn">
                <button className="mainBtn">Order Now</button>
                <button type="submit" className="hoverBtn">
                  Order Now
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="bagInfo">
          <Swiper
            direction={"vertical"}
            slidesPerView={"3.5"}
            freeMode={true}
            scrollbar={true}
            mousewheel={true}
            modules={[FreeMode, Scrollbar, Mousewheel]}
            className="infoSwiper"
            data-lenis-prevent
          >
            {cardItems.map((item, index) => (
              <SwiperSlide key={index} className="infoSwiperSlide">
                <div className="bagProduct">
                  <div className="bagImage">
                    <Image
                      src={item.cover}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="image"
                      priority
                    />
                    <span>{item.quantity}</span>
                  </div>
                  <p>
                    {item.name}
                    <br /> {item.size && ` -  ${item.size}`}
                    {item.color && ` -  ${item.color}`}
                  </p>
                  {item.price ? <h6>EGP: {item.price}</h6> : <h6></h6>}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="bagTotal">
            <div className="totalBox">
              <h6>Total:</h6>
              <h6>EGP: {total}</h6>
            </div>
          </div>
          <p>Free delivery for purchases over 2,000 EGP.</p>
          <p>*All prices are after 14% VAT.</p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
