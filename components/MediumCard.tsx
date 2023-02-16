import Image from "next/image"

type MediumCard= {
    img: string,
    title: string
}
const MediumCard = ({img, title}: MediumCard) => {
    return (
        <div className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out">
            <div className="relative h-80 w-80">
                <Image alt="small image" src={img}
                    layout="fill" className="rounded-xl"
                />
            </div>
            <h3 className="te xt-2xl mt-3">{title}</h3>
        </div>
    )
}

export default MediumCard