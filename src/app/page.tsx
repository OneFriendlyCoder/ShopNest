export const revalidate = 0;

import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import { products } from "@/utils/dummydata";
import { TruncateText } from "@/utils/truncatestring";
import ProductCard from "./components/products/ProductCard";
import getProducts, { IProductsParams } from "../../actions/getProducts";
import NullData from "./components/NullData";

interface HomeProps{
  searchParams: IProductsParams
}
export default async function Home({searchParams}: HomeProps) {

  const pdts = await getProducts(searchParams);
  if(pdts.length === 0) {
    return (<NullData title="No products found !!! Click 'All' to clear filters" />)
  }
  function shuffleArray(array: any){
    for(let i = array.length-1; i > 0; i--){
      const j = Math.floor(Math.random() * (i+1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledPdts = shuffleArray(pdts);

  return (
    <div>
      <Container>
        <div>
            <HomeBanner/>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:frid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {shuffledPdts.map((product:any)=> {
            return <ProductCard data={product} key={product.id}></ProductCard>
          })}
        </div>
      </Container>
    </div>
  );
}
