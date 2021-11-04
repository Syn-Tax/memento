/** 
* @function Welcome - Component that provides the welcome message on the home screen
* @return {JSX} - The JSX for the component
*/
function Welcome() {
    return (
        <div style={{ width: "100%", height: "25%", backgroundColor: "#548BDF", zIndex: 0, position: 'absolute' }}>
            <p style={{ paddingTop: "4%", fontSize: 50, color: 'white', fontFamily: 'Roboto' }}>Welcome Back</p>
        </div>
    );
}

export default Welcome;
