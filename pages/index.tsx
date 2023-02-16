import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header';
import Banner from '../components/Banner';
import SmallCard from '../components/SmallCard';
import MediumCard from '../components/MediumCard';
import LargeCard from '../components/LargeCard';
import Footer from '../components/Footer';

type cardsDataType = {
  img: string,
  title: string
}
const Home: NextPage = ({exploreData, cardsData} : any) => {

  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner/>
      <main className='max-w-7xl mx-auto px-8 sm:px-16'>
        <section className='pt-6'>
          <h2 className='text-4xl font-semibold pb-5'>Explore Nearby</h2>
          <div className="grid grid-cols-1 sm:grid-col-2  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {exploreData?.map((item : any) => (
            <SmallCard key={item.img} img={item.img} distance={item.distance} location={item.location}/>
          ))}
          </div>
        </section>
        <section>
          <h2 className='text-4xl font-semibold py-8'>Live anywhere</h2>
          <div className="flex space-x-5 overflow-scroll p-3 -ml-3 scrollbar-hide">
        {cardsData?.map(({ img, title }: cardsDataType) => (
          <MediumCard key={img} img={img} title={title} />
        ))}
      </div>
        </section>
        <LargeCard img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb"
          buttonText="Get Inspired"
          />
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}
export default Home;
export async function getStaticProps() {
    const exploreData = await fetch('https://www.jsonkeeper.com/b/4G1G').then((res) => res.json());
    const cardsData = await fetch('https://www.jsonkeeper.com/b/VHHT').then((res) => res.json());

    return {
      props: {
        exploreData,
        cardsData
      }
    }

}