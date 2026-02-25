import React, { useState } from 'react';
import '../assets/styles/Contact.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';


function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Format detection for email/phone indicator
  const emailRegexLocal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneDigitsLocal = email.replace(/\D/g, '');
  const phoneRegexLocal = /^[+()0-9\s-.]{7,20}$/;
  const isEmailDetected = emailRegexLocal.test(email);
  const isPhoneDetected = phoneRegexLocal.test(email) && phoneDigitsLocal.length >= 7 && phoneDigitsLocal.length <= 15;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setNameError(!name);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = email.replace(/\D/g, '');
    const phoneRegex = /^[+()0-9\s-.]{7,20}$/;

    const isEmail = emailRegex.test(email);
    const isPhone = phoneRegex.test(email) && phoneDigits.length >= 7 && phoneDigits.length <= 15;

    setEmailError(!email || (!isEmail && !isPhone));
    setMessageError(!message);

    if (!name || !email || !message || (!isEmail && !isPhone)) {
      setError(true);
      setErrorMessage('Please complete all fields and provide a valid email or phone number.');
      return;
    }

    setLoading(true);
    setError(false);
    setErrorMessage(null);
    setSuccess(false);

    try {
      const payload: any = { name, message };
      if (isEmail) {
        payload.email = email;
        payload._replyto = email;
      } else if (isPhone) {
        payload.phone = email;
      }

      const res = await fetch('https://formspree.io/f/xeeovnge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        setSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        console.error('Formspree error:', res.status, data);
        const msg = data?.error || data?.message || (data?.errors ? JSON.stringify(data.errors) : null);
        setErrorMessage(msg || 'There was an error sending your message. Please try again.');
        setError(true);
      }
    } catch (err: any) {
      console.error('Network error sending contact form', err);
      setErrorMessage(err?.message || 'Network error. Please try again.');
      setError(true);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <h1>Contact Me</h1>
          <p>Got a project waiting to be realized? Let's collaborate and make it happen!</p>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            className="contact-form"
          >
            <div className="form-flex">
              <TextField
                required
                label="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError}
                helperText={nameError ? 'Please enter your name' : ''}
              />

              <TextField
                required
                label="Email / Phone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                helperText={emailError ? 'Please enter a valid email or phone number' : ''}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {isEmailDetected && (
                        <span className="format-indicator"><EmailIcon fontSize="small" sx={{ mr: 0.5 }} />Email</span>
                      )}
                      {(!isEmailDetected && isPhoneDetected) && (
                        <span className="format-indicator"><PhoneIcon fontSize="small" sx={{ mr: 0.5 }} />Phone</span>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <TextField
              required
              label="Message"
              multiline
              rows={10}
              className="body-form"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              error={messageError}
              helperText={messageError ? 'Please enter the message' : ''}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              endIcon={!loading && <SendIcon />}
            >
              {loading ? <CircularProgress size={22} color="inherit" /> : 'Send'}
            </Button>

            <br/><br/>
            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Message sent successfully!
              </Alert>

            )}

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errorMessage ?? 'There was an error sending your message. Please try again.'}
              </Alert>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
  
}

export default Contact;
