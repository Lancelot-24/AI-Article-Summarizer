import {useState, useEffect} from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery, isFetchBaseQueryErrorType } from '../services/article'


const Demo = () => {
   const [article, setArticle] = useState<any>({
         url: '',
         summary: '',    
   })

   const [allArticles, setAllArticles] = useState<any>([])
   const [copied, setCopied] = useState<any>("")

    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery()

    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(
            localStorage.getItem('articles') || '[]'
              )

        if(articlesFromLocalStorage != '[]') {
            setAllArticles(articlesFromLocalStorage)
        }

    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        //get summary from url inputted
        const { data } = await getSummary({ articleUrl: article.url})


        if(data?.summary) {
            const newArticle  = { ...article, summary: data.summary }
            setArticle(newArticle)

            //push new article to article history
            const updatedAllArticles = [newArticle, ...allArticles]
            setAllArticles(updatedAllArticles)

            //save to local storage
            localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
        }
    }

    const handleCopy = (copyUrl: any) => {
        setCopied(copyUrl)
        navigator.clipboard.writeText(copyUrl)

        setTimeout(() => setCopied(false), 1000)
    }

  return (
    <section className="mt-16 w-full max-w-xl">
        { /* Search */}
        <div className="flex flex-col w-full gap-2">
            <form className="relative flex justify-center items-center"
            onSubmit={handleSubmit}>
                <img 
                src={linkIcon} 
                alt="link icon" 
                className="absolute left-0 my-2 ml-3 w-5" 
                />

                <input 
                    type="url"
                    placeholder="Enter your link here" 
                    value ={article.url}
                    onChange={(e) => setArticle(
                        { 
                            ...article, 
                            url: e.target.value }
                        )}
                    required
                    className="url_input peer"
                    />

                <button
                    type="submit"
                    className="submit_btn 
                    peer-focus:border-gray-700
                    peer-focus:text-gray-700"
                    >
                      ↵  
                </button>
            </form>

            {/* Browse URL History */}
            <div className ="flax flex-col gap-1 max-h-60 overflow-y-auto">
                {allArticles.map(
                    (item: any, index: number) => 
                    (
                    <div key={`link-${index}`}
                    onClick={() => setArticle(item)}
                    className="link_card">
                        <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                            <img 
                            src={copied === item.url ? tick : copy} 
                            alt="copy icon" 
                            className="w-[40%] h-[40%] object-contain" 
                            />
                            </div>
                            <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                                {item.url}
                            </p>
                        
                    </div>

                    ))}
            </div>
        </div>

        {/*Display Results */}
        <div className="my-10 max-w-full flex justify-center items-center">
                {isFetching ? (
                    <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
                ): error ? ( 
                    <p className="font-inter font-bold text-black text-center"> 
                        Well, that shouldn't happen...  
                    <br/>
                    <span className="font-satoshi font-normal text-gray-700">
                        {isFetchBaseQueryErrorType(error) && JSON.stringify(error.data)}
                    </span>
                    </p>
                    ) : ( 
                        article.summary && (
                        <div className="flex flex-col gap-3">
                            <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                                Article <span 
                                className="blue_gradient">Summary</span>
                            </h2>

                            <div className="summary_box">
                                <p className="font-inter font-medium text-sm text-gray-700">
                                    {article.summary}
                                </p>
                            </div>
                        </div>
                    ))
                    }
            </div>
    </section>
  )
}

export default Demo