import LinkedIn from "./linkedin.png";
import Github from "./github.png";
import Front from "./frontend-mentor.jpeg";

export default function About(props) {
    return (
        <div className={`card container bg-${props.mode}`} >
            <div className="card-body" >
                <h4 className={`card-title text-${props.mode === 'light'? 'black':'white'}`} >About the app</h4>
                <p className={`card-text text-${props.mode === 'light'? 'black':'white'}`}>This is a handy text utility app for everyone with easy to use functions.</p>
                <hr />
                <h4 className={`card-title text-${props.mode === 'light'? 'black':'white'}`}>About me</h4>
                <p className={`card-text text-${props.mode === 'light'? 'black':'white'}`}>Hello, I am Himanshu Kaushik a front end developer from India working hard to become a good full-stack developer. Know more about me at...</p>
                <a href="https://www.linkedin.com/in/himanshu-kaushik-aa2003280/" rel="noreferrer" target="_blank"  className="text-decoration-none box"><img src={LinkedIn} alt="" className="hover-zoom" /></a>
                
                <a href="https://www.frontendmentor.io/profile/HIMANSHU6001" rel="noreferrer"  target="_blank" className="text-decoration-none box"><img src={Front} alt="" className="hover-zoom"  /></a>
                
                <a href="https://github.com/HIMANSHU6001" target="_blank" rel="noreferrer" className="text-decoration-none box" ><img src={Github} className="hover-zoom" alt=""  /></a>
            </div>
        </div>
    );
};
