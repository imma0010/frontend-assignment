'use client'
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Product { id: number, title: string, price: number, description: string, category: string, image: string, rating: { rate: number, count: number } }

async function getData() {
    const res = await fetch("https://fakestoreapi.com/products");

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default function Search() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[] | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        const getProduct = async () => {
            const data = await getData();
            setProducts(data);
        }
        getProduct();
    }, []);

    const productDetail = (id: number) => {
        router.push("/products/" + id);
    }

    const filteredProducts = products?.filter((product) => {
        return product.title.toLowerCase().includes(searchQuery.toLowerCase());
    })
    return (
        <>
            <Header />

            <form>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative w-1/2 mx-auto m-20">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for Products"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        required />
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
            <div className="mx-10 mb-5">
                <div className="flex flex-row justify-center my-5">
                    <h2 className="text-3xl">{searchQuery != null || searchQuery != "" ? "Search result for '" + searchQuery + "'" : "Enter keyword to search for product"}</h2>
                </div>
                <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {filteredProducts?.map((item: { id: number, title: string, price: number, description: string, category: string, image: string, rating: { rate: number, count: number } }, i: number) => (
                        <div className="shadow-lg rounded-lg" key={i} onClick={() => productDetail(item.id)}>
                            {/* <a href="#"> */}
                            <img src={item.image} className="w-full h-80 object-contain rounded-tl-lg rounded-tr-lg" />
                            {/* </a> */}
                            <div className="p-5">
                                <h3><a href="#">{item.title}</a></h3>
                                <div className="flex flex-row my-3">
                                    <div className="bg-black rounded-full h-5 w-5 shadow-md mr-2"></div>
                                    <div className="bg-blue-800 rounded-full h-5 w-5 shadow-md mr-2"></div>
                                    <div className="bg-white rounded-full h-5 w-5 shadow-md mr-2"></div>
                                    <div className="bg-red-800 rounded-full h-5 w-5 shadow-md mr-2"></div>
                                    <div className="bg-green-700 rounded-full h-5 w-5 shadow-md mr-2"></div>
                                </div>
                                <div className="flex flex-row my-3">
                                    <a className="border-gray-300 border-2 text-gray-400 rounded-md px-2 py-1 mr-2 text-xs" href="#">XL</a>
                                    <a className="border-gray-300 border-2 text-gray-400 rounded-md px-2 py-1 mr-2 text-xs" href="#">XXL</a>
                                    <a className="border-gray-300 border-2 text-gray-400 rounded-md px-2 py-1 mr-2 text-xs" href="#">L</a>
                                    <a className="border-gray-300 border-2 text-gray-400 rounded-md px-2 py-1 mr-2 text-xs" href="#">M</a>
                                    <a className="border-gray-300 border-2 text-gray-400 rounded-md px-2 py-1 mr-2 text-xs" href="#">S</a>
                                </div>
                                <div className="flex flex-col xl:flex-row justify-between">
                                    <a className="bg-gradient-to-r from-red-600 to-pink-500 rounded-full py-2 px-4 my-2 text-sm text-white hover:bg-pink-600 hover:from-pink-600 hover:to-pink-600 flex flex-row justify-center" href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Add to cart
                                    </a>
                                    <a className="bg-purple-600 rounded-full py-2 px-4 my-2 text-sm text-white hover:bg-purple-700 flex flex-row justify-center" href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        View Details
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}