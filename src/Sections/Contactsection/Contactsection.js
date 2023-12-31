import React, { useState, useRef } from "react";
import "./contactsection.scss";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { Player } from "@lottiefiles/react-lottie-player";
import { Icon, Button } from "semantic-ui-react";
import 'semantic-ui-css/components/button.min.css';
// import 'semantic-ui-css/components/icon.min.css';

export function Contactsection(props) {
  const { language } = props
  const [isLoading, setIsLoading] = useState(false);
  const captcha = useRef(null);
  const [messagealert, SetMessageAlert] = useState("");
  const [typeclass, SetTypeClass] = useState("alert error");
  const [isVerified, setIsVerified] = useState(false);
  const [isSent, SetIsSent] = useState(true);
  const handleCaptchaChange = () => {
    if (captcha.current.getValue()) {
      SetMessageAlert("");
      setIsVerified(true);
      captcha.reset();
    }
  };
  const sendContactForm = (e) => {
    e.preventDefault();
    setIsLoading(true)
    emailjs.init("");
    let templateParams = {
      user_name: e.target.email.value,
      user_email: e.target.user.value,
      message: e.target.message.value,
    };
    if (isVerified) {
      if (isSent) {
        SetIsSent(false);
        emailjs
          .send("", "", templateParams)
          .then(function () {
            SetTypeClass("alert success");
            SetMessageAlert("Tu correo fue enviado");
            setIsLoading(false)
          });
      } else {
        SetTypeClass("alert error");
        SetMessageAlert("Tu correo ya fue enviado");
        setIsLoading(false)
      }
    } else {
      SetTypeClass("alert error");
      SetMessageAlert("Completa el captcha por favor");
      setIsLoading(false)
    }
  };
  return (
    <>
    <div id="contact" ></div>
    <div data-aos="fade-up" data-aos-anchor-placement="center-bottom" className="contact_section">
      <h4 className="title_content">{language.title}</h4>
      <div className="contact_content">
        <div className="form_contact">
        <form onSubmit={sendContactForm}>
          <input
            type="text"
            placeholder={language.name}
            className="contact_input"
            name="user"
            required
          />
          <input
            type="email"
            placeholder={language.mail}
            className="contact_input"
            name="email"
            required
          />
          <textarea
            name="message"
            className="contact_textarea"
            placeholder={language.content}
            required
          ></textarea>
          <ReCAPTCHA
            ref={captcha}
            className="recaptcha_class"
            sitekey=""
            onChange={handleCaptchaChange}
          />

          <Button loading={isLoading} type="submit" color='violet'>
            <Icon name="send"/>
            {language.button}
          </Button>
        </form>
        {messagealert && (
        <label>
          <input type="checkbox" className="alertCheckbox" />
          <div className={typeclass}>
            <span className="alertClose">X</span>
            <span className="alertText">
              {messagealert}
              <br className="clear" />
            </span>
          </div>
        </label>
      )}
        </div>
        <div className="contact_info">
          <Player
            className="contact_player"
            src="https://lottie.host/1d4a413a-a510-4b26-a63f-0aeeb8e0f561/MPkHLJM8qN.json"
            background="transparent"
            speed="1"
            loop
            controls
            autoplay
            direction="1"
            mode="normal"
          ></Player>
        </div>
      </div>
    </div>
    </>
  );
}
