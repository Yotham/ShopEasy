import UserDropdown from './UserDropdown';

function Navbar({ currentUser, setCurrentUser, setLoginModalOpen, setRegModalOpen }) {
    return (
        <div className="navbar">
            <div></div> {/* This is a placeholder div to maintain space between items */}
            <h1 className="navbar-title">ShopEasy</h1>
            {currentUser ? (
                 <UserDropdown setCurrentUser={setCurrentUser} />
            ) : (
                <div className="auth-buttons">
                    <button className="nav-btn" onClick={() => setLoginModalOpen(true)}>Login</button>
                    <button className="nav-btn" onClick={() => setRegModalOpen(true)}>Register</button>
                </div>
            )}
        </div>
    );
}

export default Navbar;
