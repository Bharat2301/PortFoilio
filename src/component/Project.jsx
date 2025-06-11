

import React from 'react';
import { Nav, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import ProjectCard from './ProjectCard';

import Food from "../assets/Food/Food.png";
import Spotify from "../assets/Spotify/Spotify.png";
import GifCreator from "../assets/Gifcreator/Gifcreator.png";
const Project = () => {
    const Projects =[
        {
            title: "Food",
            description:"Online food delivery app",
            url : Food,
            id : 1,
            websiteUrl : "https://food-4wl8skd02-bharattejwani123456gmailcoms-projects.vercel.app/"


        },

        {
            title: "Spotify",
        description:"Spotify Music website",
            url : Spotify,
            id : 1,
            websiteUrl : "https://spotify-clone-chi-rosy.vercel.app/"


        },
        {
            title: "GifCreator",
        description:"GifCreator",
            url : GifCreator,
            id : 1,
            websiteUrl : "https://gifcreater5.vercel.app/"


        },
        
        
        
    
        
       
    ]


    return (
  <section className='project' id='projects'>
    <div className="conitaner px-9">
        <div className="row">
            <div className="col text-center">
            <div className='w-full text-4xl'> Project </div>
             <p>please click on the project to check the project sites </p>
                          
            </div>
            <TabContainer id="projects-tab" defaultActiveKey="first">

            <Nav variant='pills'  className='mb-8'>              
            <Nav.Item >
                    <Nav.Link eventKey="first">Tab one</Nav.Link>
                </Nav.Item>
                <Nav.Item >
                    <Nav.Link eventKey="second">Tab two</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="third">Tab three</Nav.Link>
                </Nav.Item>
            </Nav>
        
            <TabContent>
                <TabPane eventKey="first">
                    
                    <div className="row">
                    {
                        Projects.map((p,index)=>{
                            return (
                              <ProjectCard
                              key = {index}
                              {...p}
                              />
                            )
                        })
                    }
                    </div>
                    
                </TabPane>
                <TabPane eventKey="second">

                </TabPane>
                <TabPane eventKey="third">
             </TabPane>
            </TabContent> 
            </TabContainer>
        </div>
        
    </div>
    {/* <img className='left' src="https://ik.imagekit.io/b80sh2n2k/color-sharp2.png?updatedAt=1679470985047" alt="" /> */}

  </section>
    );
}

export default Project;

