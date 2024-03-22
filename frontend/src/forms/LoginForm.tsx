import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";
import { useAuthContext } from "../contexts/AuthContext";
import { useDialog } from "../contexts/DialogContext";
import RegisterForm from "./RegisterForm";

function LoginForm() {
  const { loginUser } = useAuthContext();
  const { handleDialogClose, setDialogContent } = useDialog();

  // ------------------------ Handling outside click ------------------------ //
  const loginFormRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(e: any) {
      if (loginFormRef.current && !loginFormRef.current.contains(e.target))
        handleClose();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [loginFormRef]);
  // ------------------------------------------------------------------------ //

  function handleClose() {
    !showSpinner && handleDialogClose();
  }

  const [showSpinner, setShowSpinner] = useState(false);

  function handleSubmit(e: any) {
    e.preventDefault();
    setShowSpinner(true);
    setTimeout(() => {
      loginUser(e);
    }, 1000);
  }

  return (
    <div
      ref={loginFormRef}
      className="text-white rounded-xl p-4 xs:p-8 bg-dark-900 shadow
                  border border-white"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-end gap-4 xs:gap-6"
      >
        <button>
          <IoMdClose
            className="text-2xl opacity-50 hover:opacity-100 cursor-pointer"
            onClick={handleClose}
          />
        </button>
        <span className="text-xl xs:text-2xl text-center w-full">
          Welcome back
        </span>
        <input
          autoFocus={true}
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          className="input"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="input"
        />
        {showSpinner ? (
          <p
            className="rounded-xl mx-2 xs:mx-4 p-3 xs:p-4 cursor-pointer text-center
                      bg-cyan-700 hover:bg-cyan-600 w-64 xs:w-80"
          >
            <FaSpinner size={20} className="inline-block animate-spin mr-2" />
            Logging in...
          </p>
        ) : (
          <input
            type="submit"
            value="Log in"
            className="rounded-xl mx-2 xs:mx-4 p-3 xs:p-4 cursor-pointer
            bg-cyan-700 hover:bg-cyan-600 w-64 xs:w-80 text-center"
          />
        )}

        <p className="text-center w-full">
          <span className="opacity-50 mr-1">Not joined yet?</span>
          <button
            disabled={showSpinner && true}
            className={`text-cyan-500 hover:text-cyan-400 cursor-pointer`}
            onClick={() => setDialogContent(<RegisterForm />)}
          >
            REGISTER
          </button>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
