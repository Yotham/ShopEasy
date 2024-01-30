// pages/generate.js
import Homepage from '../app/HomePageComponent'; // Adjust the path as necessary to point to your FAQ component

const HomePage = () => {
    return <Homepage 
    updateCurrentUser={setCurrentUser}
    isRegModalOpen={isRegModalOpen}
    setRegModalOpen={setRegModalOpen}
    isLoginModalOpen={isLoginModalOpen}
    setLoginModalOpen={setLoginModalOpen}
     />;
};

export default HomePage;
