import React from 'react'

class Tips extends React.Component {

render() {
    return(
        <div>
            <div className="jumbotron">
                <p>This week's challenge is to improve your pushup form. Get started by watching the video below. 
                    Please ask any additional questions in the trainers' group chat after logging in.   </p>
            </div>
            <div className="tips">
                <iframe className="tips-video" width="560" height="315" src="https://www.youtube-nocookie.com/embed/i9sTjhN4Z3M" 
                frameborder="0" allow="accelerometer; autoplay; encrypted-media; 
                gyroscope; picture-in-picture" allowfullscreen>    
                </iframe>
            </div>
        </div>
      )
    }
}

export default Tips

