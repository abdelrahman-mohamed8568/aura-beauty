import "@/styles/products.css";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import { Box, Flex, Tabs } from "@chakra-ui/react";
import ProductsCard from "../components/productsCard";
function Products() {
  const accordionItems = [
    { value: "a", title: "First Item", text: "Some value 1..." },
    { value: "b", title: "Second Item", text: "Some value 2..." },
    { value: "c", title: "Third Item", text: "Some value 3..." },
  ];
  const tabsItems = [
    {
      title: "all product",
    },
    {
      title: "botox",
    },
    {
      title: "filler",
    },
    {
      title: "facial machines",
    },
    {
      title: "laser machines",
    },
  ];
  return (
    <div className="mainContainer">
      <div className="productsHeader">
        <h1>our products</h1>
        <h3>simplicity of beauty at your fingertips</h3>
      </div>
      <div className="productsContainer">
        <div className="filter">
          <AccordionRoot multiple defaultValue={[""]}>
            {accordionItems.map((item, index) => (
              <AccordionItem key={index} value={item.value}>
                <AccordionItemTrigger>{item.title}</AccordionItemTrigger>
                <AccordionItemContent>{item.text}</AccordionItemContent>
              </AccordionItem>
            ))}
          </AccordionRoot>
        </div>
        <div className="productsCards">
          <Flex minH="dvh">
            <Tabs.Root defaultValue="all product" className="productsCardsBox">
              <Tabs.List className="tabList" borderBottom={"none"}>
                {tabsItems.map((item, index) => (
                  <Tabs.Trigger
                    key={index}
                    value={item.title}
                    fontWeight="400"
                    borderColor="#707070"
                    className="tabText"
                    _selected={{
                      color: "#707070",
                      fontWeight: "bold",
                    }}
                    transition="all .3s ease"
                  >
                    {item.title}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
              <Box className="productsGrid">
                {tabsItems.map((item, index) => (
                  <Tabs.Content
                    key={index}
                    value={item.title}
                    _open={{
                      animationName: "fade-in, scale-in",
                      animationDuration: "1000ms",
                    }}
                    _closed={{
                      animationName: "fade-out, scale-out, ",
                      animationDuration: "1000ms",
                    }}
                    className="productsBox"
                  >
                    <ProductsCard />
                    <ProductsCard />
                    <ProductsCard />
                    <ProductsCard />
                    <ProductsCard />
                    <ProductsCard />
                    <ProductsCard />
                    <ProductsCard />
                    <ProductsCard />
                    <ProductsCard />
                    <ProductsCard />
                    <ProductsCard />
                  </Tabs.Content>
                ))}
              </Box>
            </Tabs.Root>
          </Flex>
          <div></div>
          <div className="card"></div>
        </div>
      </div>
    </div>
  );
}

export default Products;
