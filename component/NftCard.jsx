const NFTCard = ({ nft }) => {


    return (
        <div style={{width: "300px"}}>

            <div className="rounded-md">
                <img  width={"300"} src={nft.media[0].gateway} ></img>
            </div>

            <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
               
                <div className="">
                    <h2 className="text-xl text-gray-800">{nft.title}</h2>
                    <p className="text-gray-600">Id: {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}</p>
                    <p className="text-gray-600" >{`${nft.contract.address.substr(0, 4)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`} 
                    <button className="bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm"
                    onClick={() => navigator.clipboard.writeText(nft.contract.address)}>Copy</button></p>
                </div>

                <div className="flex-grow mt-2">
                    <p className="text-gray-600">{nft.description?.substr(0, 150)}</p>
                </div>

                <div className="flex justify-center mb-1">
                    <a target={"_blank"} href={`https://etherscan.io/token/${nft.contract.address}`} className="py-2 px-4 bg-blue-500 w-1/2 text-center rounded-m text-white cursor-pointer">View on etherscan</a>
                </div>

            </div>

        </div>
    )
}

export default NFTCard;