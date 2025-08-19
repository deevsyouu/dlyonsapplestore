import React from "react";

const NotFound = () => {
    return(
        <div 
        style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            height:'100vh',
            backgroundColor:'#f8f9fa',
            textAlign:'center',
            flexDirection:'column',
        }}
        >
            <div style={{fontSize:'96px',fontWeight:'bold',color:'#dc3545'}}>
                404
            </div>
            <div style={{fontSize:'24px',marginBottom:'10px'}}>
                Oops! Page not found
            </div>
            <div style={{fontSize:'18px',marginBottom:'20px'}}>
                The page you're looking for doesn't exist or has been moved.
            </div>
            <a href="/" className="btn btn-primary">
            Go to Homepage
            </a>

        </div>
    )
}
export default NotFound;
