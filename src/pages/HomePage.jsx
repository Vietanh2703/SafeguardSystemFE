import React from 'react';
import HomeNavBar from '../components/home/HomeNavBar.jsx';
import VideoSection from '../components/home/HomeVideo.jsx';
import ServicesSlide from '../components/home/HomeServiceSlide.jsx';
import PackagesSlide from '../components/home/HomePackageSlide';
import ReviewsSlide from '../components/home/HomeReviewPage.jsx';
import Footer from '../components/home/Footer.jsx';
import '../components/com-designs/HomeNavBar.css';
import '../designs/HomePage.css'; // Import the new CSS file

const HomePage = () => {
    return (
        <div>
            <HomeNavBar />
            <VideoSection />
            <ServicesSlide />
            <PackagesSlide />
            <ReviewsSlide />
            <Footer />
        </div>
    );
};

export default HomePage;