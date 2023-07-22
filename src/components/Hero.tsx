import {logo} from '../assets';

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
        <nav className="flex justify-between item-center w-full mb-10 pt-3">
            <img src={logo} alt="sumz_logo" className="w-28 object-contain" />

            <button 
                type="button" 
                onClick={() => window.open('https://github.com/Lancelot-24/AI-Article-Summarizer')}
                className="black_btn">
                Github
            </button>
        </nav>

        <h1 className="head_text"> Summarize with <br className="max-md:hidden"/>
            <span className="orange_gradient"> OpenAI GPT-4</span>
        </h1>

        <h2 className="desc">
            An article, website, or document summarizer that uses the power of OpenAI's GPT-4 to summarize any text you give it.
        </h2>
    </header>
  )
}

export default Hero