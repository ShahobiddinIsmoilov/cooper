import { Box } from "@mui/material";
import { IoMdClose } from "react-icons/io";

import { useAuthContext } from "../contexts/AuthContext";
import { useDialog } from "../contexts/DialogContext";
import LoginForm from "./LoginForm";

function RegisterForm() {
  const { registerUser } = useAuthContext();
  const { handleDialogClose, setDialogContent } = useDialog();

  return (
    <Box
      className="text-white rounded-xl p-4 xs:p-8 bg-dark-900 shadow 
                  border border-white"
    >
      <form
        onSubmit={registerUser}
        className="flex flex-col items-end gap-4 xs:gap-6"
      >
        <IoMdClose
          className="text-2xl opacity-50 hover:opacity-100 cursor-pointer"
          onClick={handleDialogClose}
        />
        <span className="text-xl xs:text-2xl text-center w-64 xs:w-80 mx-2 xs:mx-4">
          It's time to speak your mind. Join Shredded.
        </span>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          className="input"
          autoComplete="off"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input"
          autoComplete="new-password"
        />
        <input
          type="password"
          name="confirm-password"
          placeholder="Confirm Password"
          className="input"
          autoComplete="new-password"
        />
        <input
          type="submit"
          value="Sign up"
          className="rounded-xl mx-2 xs:mx-4 p-3 xs:p-4 cursor-pointer bg-cyan-700 hover:bg-cyan-600
                      w-64 xs:w-80"
        />
        <p className="text-center w-full">
          <span className="opacity-50">Already joined? </span>
          <span
            className="text-cyan-500 hover:text-cyan-400 cursor-pointer"
            onClick={() => {
              setDialogContent(<LoginForm />);
            }}
          >
            {" "}
            SIGN IN
          </span>
        </p>
      </form>
    </Box>
  );
}

export default RegisterForm;
