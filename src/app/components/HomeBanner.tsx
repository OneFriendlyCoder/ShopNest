const HomeBanner = () => {
    return ( 
        <div className="relative bg-gradient-to-r from-sky-500 to-sky-700">
            <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly" >
                <div className="mb-8 md:mb-0 text-center">
                    <h1 className="text-4xl md:text-6xl text-white">Summer Sale</h1>
                    <p className="text-lg md:text-xl text-white mb-2">Enjoy dicounts on selected items</p>
                    <p className="text-2xl md:text-5xl text-yellow-400 font-bond">GET 50% OFF</p>
                </div>
            </div>
        </div>
    );
}
 
export default HomeBanner;