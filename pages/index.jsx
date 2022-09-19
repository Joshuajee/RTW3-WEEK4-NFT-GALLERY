import axios from 'axios';
import { useState } from 'react'
import NFTCard from '../component/NftCard'


const Home = () => {

  const [wallet, setWalletAddress] = useState(null);
  const [collection, setCollectionAddress] = useState(null);
  const [NFTs, setNFTs] = useState([])
  const [fetchForCollection, setFetchForCollection] = useState(false)
  const [chainId, setChainId] = useState(1)
  const [fetch, setFetch] = useState({wallet, collection, fetchForCollection, chainId})
  const [pageKey, setPageKey] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingShow, setLoadingShow] = useState(false)


  const fetchNFTsOwner = async () => {

    setLoading(true)

    try {

      setPageKey(null)

      const res = await axios.get(`/api/get-nfts?chainId=${chainId}&owner=${wallet}&contractAddresses=${collection}`)

      const data = res.data.data

      setNFTs(data.ownedNfts)

      setPageKey(data.pageKey)

      setFetch({wallet, collection, fetchForCollection, chainId})

    } catch (e) {
      console.error(e)
    }

    setLoading(false)

  }

  const fetchNFTsCollection = async () => {

    setLoading(true)

    try {

      setPageKey(null)

      const res = await axios.get(`/api/get-nfts-collection?chainId=${chainId}&contractAddress=${collection}`)

      const data = res.data.data

      setNFTs(data.nfts)

      setPageKey(data.nextToken)

      setFetch({wallet, collection, fetchForCollection, chainId})

    } catch (e) {
      console.error(e)
    }

    setLoading(false)

  }

  const showMoreOwner = async () => {

    setLoadingShow(true)

    try {

      const res = await axios.get(`/api/get-nfts?chainId=${fetch.chainId}&owner=${fetch.wallet}&contractAddresses=${fetch.collection}&pageKey=${pageKey}`)

      setNFTs([...NFTs, ...res.data.data.ownedNfts])

      setPageKey(res.data.data.pageKey)

    } catch (e) {
      console.error(e)
    }

    setLoadingShow(false)

  }

  const showMoreCollection = async () => {

    setLoadingShow(true)

    try {

      const res = await axios.get(`/api/get-nfts-collection?chainId=${fetch.chainId}&contractAddress=${fetch.collection}&pageKey=${pageKey}`)

      const data = res.data.data

      setNFTs([...NFTs, ...data.nfts])

      setPageKey(data.nextToken)

    } catch (e) {
      console.error(e)
    }

    setLoadingShow(false)

  }

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input disabled={fetchForCollection}  className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" onChange={(e)=>{setWalletAddress(e.target.value)}} value={wallet} type={"text"} placeholder="Add your wallet address"></input>
        <input className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" onChange={(e)=>{setCollectionAddress(e.target.value)}} value={collection} type={"text"} placeholder="Add the collection address"></input>
        <label className="text-gray-600 "><input onChange={(e)=>{setFetchForCollection(e.target.checked)}} type={"checkbox"} className="mr-2"></input>Fetch for collection</label>
        <button disabled={loading} className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} 
          onClick={ fetchForCollection ? fetchNFTsCollection : fetchNFTsOwner }>
           { loading ? "Please Wait..." : "Let's go!" } 
        </button>
      </div>
      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 justify-around'>
        {
          NFTs.map(nft => {
            return (
              <NFTCard nft={nft}></NFTCard>
            )
          })
        }
      </div>
      
      {

        (pageKey) && (
          <button
            disabled={loadingShow}
            onClick={fetch.fetchForCollection ? showMoreCollection : showMoreOwner}
            className="disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
            >
            { loadingShow ? "Please Wait..." : "Show More" } 
          </button> 
        )

      }

    </div>
  )
}

export default Home