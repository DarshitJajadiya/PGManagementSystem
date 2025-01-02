import React, { useContext, useState,useEffect,useRef} from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import Searchbar from '../components/Searchbar';
import './Homepage.css';
import RoomCard from '../components/RoomCard';
import PGContext from '../context/PgContext';
import About from '../components/about';
import gsap from 'gsap';


function Homepage() {
  const { pgData } = useContext(PGContext); // Access PG data from context
  const navigate = useNavigate(); // Hook for navigation
  const [loading, setLoading] = useState(false); // Loading state

  const features = [
    { title: 'Spacious Rooms', description: 'Fully furnished rooms with all amenities.' },
    { title: 'Healthy Meals', description: 'Nutritious and delicious meals served daily.' },
    { title: 'Prime Location', description: 'Located near top colleges and transportation hubs.' },
  ];
  const welcomeRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 }); // Infinite loop with repeat: -1
    tl.fromTo(
      welcomeRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
      }
    )
      .to(welcomeRef.current, {
        opacity: 0,
        y: -50,
        duration: 1.5,
        ease: "power3.in",
      })
      .fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=2" // Overlap timing by 1 second
      )
      .to(subtitleRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power3.in",
      });

    return () => {
      tl.kill(); // Clean up GSAP animations when the component unmounts
    };
  }, []);

  const handleExploreMore = () => {
    setLoading(true);
    navigate('/pg-details'); // Navigate to PG details page
    setLoading(false);
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <Searchbar />
        <h1 ref={welcomeRef}>Welcome </h1> 
        <h2 ref={subtitleRef} id="subtitle">Vidyashram PG</h2>
        <p>Comfortable, affordable, and student-friendly accommodation.</p>
        <button onClick={handleExploreMore} disabled={loading} id="explore">
          {loading ? 'Loading...' : 'Explore PGs'}
        </button>
      </section>

   
      {/* <div className="cards">
        {pgData && pgData.length > 0 ? (
          pgData.slice(0, 3).map((room, index) => (
            <RoomCard key={index} name={room.name} price={room.price} image={room.images} />
          ))
        ) : (
          <p>No PGs available at the moment.</p>
        )}
      </div>  */}
      
                <About />


      <section id="features" className="features">
        <h3>Why Choose Us?</h3>
        <div className="feature-cards">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}

        </div>
      </section>







    </div>
  );
}

export default Homepage;
