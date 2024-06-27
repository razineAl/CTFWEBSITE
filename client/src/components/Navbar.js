import image from '../Elmore.png';
function Navbar(){
    return(
        <>
            <nav id="main-navbar">
                <div><img src={image} alt=""></img></div>
                <div><p>you haven't already created an account ?</p><button className='btn'>Sign up</button></div>
            </nav>
        </>
    );
}

export default Navbar;