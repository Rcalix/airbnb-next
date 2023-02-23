import { format } from "date-fns";
import { useRouter } from "next/router";
import Footer from "../components/Footer"
import Header from "../components/Header"
import InfoCard from "../components/InfoCard";

type ISearch = {
    location?: string,
    startDate?: string,
    endDate?: string,
    numberOfGuess?: number
}
export type ISearchResults = {
    description: string,
    img: string
    lat:  number
    location: string
    long: number
    price: string
    star: number
    title: string
    total: string 
}
type ISearchProps  = { 
    searchResults: ISearchResults[]
}
function Search ({searchResults}: ISearchProps) {
    const router = useRouter();
    const { location, startDate, numberOfGuess, endDate }: ISearch = router.query;
    const formattedStartDate = format(new Date(startDate ? startDate : new Date()), 'dd MMMM yyyy')
    const formattedEndDate = format(new Date(endDate ? endDate : new Date()), 'dd MMMM yyyy')
    const range = `${formattedStartDate} - ${formattedEndDate}`
    return (
        <div>
           <Header placeholder={`${location} | ${range} | ${numberOfGuess} guess`}/>     
           <main className="flex">
            <section className="flex-grow pt-14 px-6">
                <p className="text-xs">300 + Stays {range} for {numberOfGuess} guess</p>
                <h1 className="text-3xl font-semibold mt-2 mb-6"> Stays in {location}</h1>

                <div className="hidden lg:inline-flex  mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                    <p className="button">Cancellation Flexibility</p>
                    <p className="button">Type of place</p>
                    <p className="button">Price</p>
                    <p className="button">Rooms and Beds</p>
                </div>
                {searchResults.length && searchResults?.map((item: ISearchResults) =>
                    <InfoCard {...item}/>
                )}
            </section>
           </main>
           <Footer/>
        </div>
    )
}

export default Search;

export async function getStaticProps() {
    const searchResults = await fetch('https://www.jsonkeeper.com/b/5NPS').then(res => res.json()) satisfies ISearchResults[];
    return {
        props: {
            searchResults,
        }
    }
}