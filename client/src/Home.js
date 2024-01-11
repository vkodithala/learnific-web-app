import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useStepperContext } from "./contexts/StepperContext"; 
import 'tailwindcss/tailwind.css';
import backgroundImage from './backgrounds/landingPage.png';
import logoImage from './logos/logo.png';
import heroImage from './logos/hero.png';
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.REACT_APP_SUPA_URL, process.env.REACT_APP_SUPA_PK);


const Home = () => {
  const { userData, setUserData } = useStepperContext();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const submitEmail = async () => {
    const { error } = await supabase.from('emails').insert([{ 'email': userData['email'] }]);
    console.log(error);
  };
  
  return (
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <header style={{
        position: 'absolute',
        top: 0,
        width: '100%',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Link to="/">
          <img src={logoImage} alt="Logo" style={{ height: '50px' }} />
        </Link>
      </header>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        maxWidth: '1200px',
      }}>
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          '@media (max-width: 600px)': {
            marginBottom: '20px',
          }
        }}>
          <div class="flex justify-between flex-col gap-2 m-3">
            {/* <div class="flex items-center justify-center">
              <img src={ heroImage } alt="origin-mascot-img" class="hidden my-10 lg:block justify-center" style={{ height: '200x', width: '225px' }} />
            </div> */}
            <div class="">
              <h1 class="font-bold text-5xl text-buttonColor mb-4">Unleash the Superpower of <span class="text-highlightColor">Knowledge</span></h1>
              <p class="text-xl leading-normal mb-4">Get your daily, ultra-personalized email newsletter, combining the latest in research, news, and social media.</p>
              <div class="flex flex-col lg:flex-row gap-2 justify-center">
                <input onChange={handleChange} value={userData["email"] || ""} name="email" type="text" class="border-2 rounded-xl border-slate-200 p-3" placeholder="Your Email"></input>
                <Link to="/onboarding">
                  <button onClick={submitEmail} disabled={!userData["email"]} class="border-2 rounded-xl bg-buttonColor border-transparent text-slate-100 font-semibold p-3 hover:bg-inherit hover:border-buttonColor hover:text-buttonColor transition duration-500">Join Waitlist →</button>
                </Link>
              </div>
            </div>
          </div>
          <div class="flex flex-col md:flex-row mt-5 gap-3">
            <div class="flex flex-col text-left border-2 rounded-lg bg-inherit border-buttonColor p-3 w-1/2 hidden lg:block">
              <div class="m-2 font-bold text-2xl text-buttonColor">
                The latest in research, delivered to <span class="text-highlightColor italic">you.</span>
              </div>
              <div class="m-2 text-md text-buttonColor">
                We search from 200M+ research publications (and growing!) to deliver summaries of papers that are relevant to you to your inbox every morning.
              </div>
            </div>
            <div class="flex flex-col text-left border-2 rounded-lg bg-inherit border-buttonColor p-3 w-1/2 hidden lg:block">
              <div class="m-2 font-bold text-2xl text-buttonColor">
                <span class="text-highlightColor italic">Get the latest</span> on the topics that you care about.
              </div>
              <div class="m-2 text-md text-buttonColor">
                Be the first to know about recent developments in your field. Right to your inbox. We'll find the most relevant recent news articles in your field and extract the most relevant information for you.
              </div>
              <div class="m-2 text-md text-buttonColor">
              We'll get news directly from your favorite sources, like the New York Times, Wall Street Journal, Reuters, Ars Technica, and more.
              </div>
            </div>
            <div class="flex flex-col text-left border-2 rounded-lg bg-inherit border-buttonColor p-3 w-1/2 hidden lg:block">
              <div class="m-2 font-bold text-2xl text-buttonColor">
                See what the buzz is about on <span class="text-highlightColor italic">social media.</span>
              </div>
              <div class="m-2 text-md text-buttonColor">
                The Origin finds the most relevant tweets and posts from your favorite influencers and experts in your field. 
              </div>
              <div class="m-2 text-md text-buttonColor">
                We'll find posts directly related to the latest research articles that we find for you, so you're always up-to-date.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
