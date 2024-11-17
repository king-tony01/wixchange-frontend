import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "/src/css/auth.css";
import { AuthContext } from "./AuthContext";
import Spinner from "../Spinner";
import ErrorModal from "../app/components/ErrorModal";
import { TEST_API_TOKEN, vtuUrl } from "../assets/urls";

function Login() {
  const [active, setActive] = useState(0);
  const [error, setError] = useState(null);
  const [complete, setComplete] = useState(true);
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState({
    type: "tel",
    placeholder: "Enter phone number",
  });
  const [user, setUser] = useState({ password: "", email: "", phone: "" });
  const switchTab = (index) => {
    setActive(index);
    setUser({ password: "", email: "", phone: "" });
    if (index == 1) {
      setTab({ type: "email", placeholder: "Enter email address" });
    } else {
      setTab({ type: "tel", placeholder: "Enter phone number" });
    }
  };
  const updatePassword = (input) => {
    setUser({ ...user, password: input });
  };
  const updatePhone = (input) => {
    setUser({ ...user, phone: input });
  };
  const updateEmail = (input) => {
    setUser({ ...user, email: input });
  };
  const { sendForm, loading, setLoading, info, setInfo } =
    useContext(AuthContext);

  useEffect(() => {
    async function getNumberOperator() {
      try {
        const response = await fetch(`${vtuUrl}fetch_data_plans`, {
          method: "POST",
          headers: {
            "Api-Token": TEST_API_TOKEN,
            "Request-Id": Date.now().toString(),
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            operator: "MTN",
          }),
          mode: "cors",
          credentials: "omit",
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    /* setComplete(
      (user.email !== "" && user.password !== "") ||
        (user.phone !== "" && user.password !== "")
    );*/
    getNumberOperator();
  }, []);

  return (
    <section className='auth'>
      {info.active ? (
        <ErrorModal
          message={info.message}
          title={info.title}
          icon={info.icon}
          className={info.className}
          state={info.active}
          action={setInfo}
        />
      ) : null}
      <h1 className='auth-title'>Login</h1>
      <div className='tabs'>
        {["Phone", "Email"].map((item, index) => (
          <button
            className={index == active ? "active" : ""}
            onClick={() => switchTab(index)}
          >
            {item}
          </button>
        ))}
      </div>
      <form action=''>
        <div className='input'>
          <i
            className={`fas fa-${tab.type == "tel" ? "phone" : "envelope"}`}
          ></i>
          <input
            type={tab.type}
            name=''
            id='phone'
            placeholder={tab.placeholder}
            value={tab.type == "tel" ? user.phone : user.email}
            onInput={(e) =>
              tab.type == "tel"
                ? updatePhone(e.target.value)
                : updateEmail(e.target.value)
            }
          />
        </div>
        <div className='input'>
          <i className='fas fa-key'></i>
          <input
            type={visible ? "text" : "password"}
            name=''
            id='password'
            placeholder='Set password'
            value={user.password}
            onInput={(e) => updatePassword(e.target.value)}
          />
          <i
            className={visible ? "fas fa-eye" : "fas fa-eye-slash"}
            onClick={() => setVisible(!visible)}
          ></i>
        </div>
        <small className='small-text'>
          Don't have an account? <Link to={"/signup"}>Create one now</Link>
        </small>
        <button
          className='action-btn'
          onClick={(e) => sendForm(e, user, "/api/auth/login")}
          //disabled={!complete}
        >
          {loading ? <Spinner /> : ` Login`}
        </button>
      </form>
      <div className='company'>
        <small>Powered By</small>
        <small>KingTony Technologies</small>
      </div>
    </section>
  );
}

export default Login;
