import React from 'react';
// import img from "../assets/images/not.png"
const styles = {
  errorPageWrap: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background:'#fff',
    color: '#fff',
    textAlign: 'center',
    fontFamily: "'Poppins', sans-serif",
    overflow: 'hidden',
  },
  errorPage: {
    padding: '20px',
    borderRadius: '10px',
    background: 'rgba(0, 0, 0, 0)',
    boxShadow: '#fff',
    position: 'relative',
  },
  h1: {
    fontSize: '140px',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, #f97316, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0',
    animation: 'fadeIn 2s ease-in-out',
  },
  h2: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '20px 0',
    color: '#f97316', // Orange color
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.6)', // Subtle shadow to enhance readability
    animation: 'fadeIn 2s ease-in-out 0.5s',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    background: 'linear-gradient(to right, #f97316, #3b82f6)',
    borderRadius: '5px',
    textDecoration: 'none',
    marginTop: '20px',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#fffff',
  },
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
};

const ErrorPage: React.FC = () => {
  return (
    <div style={styles.errorPageWrap}>
      <div style={styles.errorPage}>
        <h1 style={styles.h1}>404</h1>
        <h2 style={styles.h2}>Internal Server Error</h2>
       {/* <div className="w-full h-full"> {img}</div> */}
        <a 
          href="#" 
          title="Back to site" 
          style={styles.button}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)} 
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ffff')}
        >
          Go Back
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
