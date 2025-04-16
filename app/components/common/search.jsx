import React, { useEffect, useState } from "react";
import {
  DialogActionTrigger,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/products/productsSlice";
import { CloseButton } from "@/components/ui/close-button";
import "swiper/css";
import "swiper/css/scrollbar";
import Link from "next/link";

function Search() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [value, setValue] = useState("");
  const filter = products.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase())
  );
  const filtered = React.useMemo(() => {
    const searchValue = value.toLowerCase();
    const startsWith = filter.filter((item) =>
      item.name.toLowerCase().startsWith(searchValue)
    );
    const includes = filter.filter(
      (item) => !item.name.toLowerCase().startsWith(searchValue)
    );
    return [...startsWith, ...includes];
  }, [filter, value]);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <button className="navLink">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </DialogTrigger>
      <DialogContent data-lenis-prevent className="overlayBox">
        <DialogActionTrigger asChild>
          <div className="hiddenOverlay"></div>
        </DialogActionTrigger>
        <div className="searchBox">
          <div className="search">
            <input
              type="search"
              autoFocus={true}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            {value !== "" && (
              <CloseButton
                className="searchClear"
                size={"xs"}
                onClick={() => setValue("")}
              />
            )}
          </div>
          <Swiper
            direction="vertical"
            slidesPerView="3.5"
            freeMode={true}
            scrollbar={true}
            mousewheel={true}
            modules={[FreeMode, Scrollbar, Mousewheel]}
            className="results"
          >
            {value !== "" ? (
              filtered.length > 0 ? (
                filtered.map((item) => (
                  <SwiperSlide key={item.id} className="resultsSlide">
                    <div className="resultsBox">
                      <DialogActionTrigger asChild>
                        <Link
                          href={`/products/${item.category[0]
                            .toString()
                            .replace(/ /g, "-")}/${item.id}`}
                        >
                          <Image
                            src={item.cover}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="resultsImage"
                            priority
                          />
                        </Link>
                      </DialogActionTrigger>
                      <DialogActionTrigger asChild>
                        <Link
                          href={`/products/${item.category[0]
                            .toString()
                            .replace(/ /g, "-")}/${item.id}`}
                        >
                          <p>{item.name}</p>
                        </Link>
                      </DialogActionTrigger>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide className="resultsSlide">
                  <h1 className="emptyResults">No matching product found!</h1>
                </SwiperSlide>
              )
            ) : (
              <SwiperSlide className="resultsSlide">
                <h1 className="emptyResults">Find your product here!</h1>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </DialogContent>
    </DialogRoot>
  );
}

export default Search;
