import React, { useState } from 'react';

const Contact = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [btnText, setBtnText] = useState('Send');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBtnText('Sending...');

    // Use environment variable or fallback for backend URL
    const backendUrl =
      process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/contact';

    try {
      let response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Fixed: correct header
        },
        body: JSON.stringify(formDetails),
      });

      setBtnText('Send');

      if (!response.ok) {
        // Check for non-JSON response
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Server returned non-JSON response');
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let result = await response.json();
      setFormDetails(formInitialDetails);

      if (result.code === 200) {
        setStatus({ success: true, message: 'Message sent successfully' });
      } else {
        setStatus({ success: false, message: 'Failed to send message' });
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setBtnText('Send');
      setStatus({
        success: false,
        message: `An error occurred: ${error.message}`,
      });
    }
  };

  return (
    <div className="contact bg-contact-bg py-32" id="connect">
      <div className="container">
        <div className="row items-center">
          <div className="col-md-6">
            <img
              src="https://ik.imagekit.io/b80sh2n2k/contact-img.svg?updatedAt=1679470984116"
              alt="Contact"
            />
          </div>
          <div className="col-md-6">
            <h2>Get In Touch</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-6 px-1">
                  <input
                    className="focus:outline-none focus:bg-white focus:text-black"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formDetails.firstName}
                    onChange={(e) => onFormUpdate('firstName', e.target.value)}
                  />
                </div>
                <div className="col-sm-6 px-1">
                  <input
                    className="focus:outline-none focus:bg-white focus:text-black"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formDetails.lastName}
                    onChange={(e) => onFormUpdate('lastName', e.target.value)}
                  />
                </div>
                <div className="col-sm-6 px-1">
                  <input
                    className="focus:outline-none focus:bg-white focus:text-black"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formDetails.email}
                    onChange={(e) => onFormUpdate('email', e.target.value)}
                  />
                </div>
                <div className="col-sm-6 px-1">
                  <input
                    className="focus:outline-none focus:bg-white focus:text-black"
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formDetails.phone}
                    onChange={(e) => onFormUpdate('phone', e.target.value)}
                  />
                </div>
                <div className="col-sm-12 px-1">
                  <textarea
                    name="message"
                    className="h-[150px] focus:outline-none focus:bg-white focus:text-black"
                    placeholder="Message"
                    value={formDetails.message}
                    onChange={(e) => onFormUpdate('message', e.target.value)}
                  />
                  <button
                    className="py-3 px-6 my-5 bg-white text-black font-bold"
                    type="submit"
                  >
                    {btnText}
                  </button>
                </div>
              </div>
            </form>
            {status.message && (
              <div className="col">
                <p className={status.success ? 'success' : 'danger'}>
                  {status.message}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;