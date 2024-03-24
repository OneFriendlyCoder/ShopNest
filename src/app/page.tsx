import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import { products } from "@/utils/dummydata";
import { TruncateText } from "@/utils/truncatestring";
import ProductCard from "./components/products/ProductCard";
export default function Home() {
  return (
    <div>
      <Container>
        <div>
            <HomeBanner/>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:frid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {products.map((product:any)=> {
            return <ProductCard data={product}></ProductCard>
          })}
        </div>
      </Container>
    </div>
  );
}
