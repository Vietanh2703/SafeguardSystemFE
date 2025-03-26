import rockyVideo from '../../assets/videos/waves.mp4';
import ScrollDownButtonWhite from './ScrollDownButtonWhite';
import '../com-designs/HomeVideo.css';

const HomeVideo = () => {
    return (
        <div className="video-section" id="video">
            <video className="absolute inset-0 w-full h-full object-cover" src={rockyVideo} autoPlay loop muted />
            <div className="text-container p-8">
                <h1 className="artistic-font text-9xl font-bold text-white mb-2">MyGuard</h1>
                <h1 className="artistic-font text-3xl text-gray-300">#1 security assignment & management solution</h1>
            </div>
            <ScrollDownButtonWhite target="services" />
        </div>
    );
};

export default HomeVideo;