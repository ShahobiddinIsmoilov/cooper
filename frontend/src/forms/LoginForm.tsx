import { Box } from "@mui/material";
import { IoMdClose } from "react-icons/io";

import { useContext } from "react";
import { AuthContext, AuthContextProps } from "../contexts/AuthContext";
import { useDialogue } from "../contexts/DialogueContext";
import RegisterForm from "./RegisterForm";

function LoginForm() {
  const { loginUser } = useContext(AuthContext) as AuthContextProps;
  const { handleDialogueClose, setDialogueContent } = useDialogue();

  return (
    <Box
      className="text-white rounded-xl p-4 xs:p-8 bg-dark-900 shadow
                  border border-white border-opacity-50"
    >
      <form
        onSubmit={loginUser}
        className="flex flex-col items-end gap-4 xs:gap-6"
      >
        <IoMdClose
          className="text-2xl opacity-50 hover:opacity-100 cursor-pointer"
          onClick={handleDialogueClose}
        />
        <span className="text-xl xs:text-2xl text-center w-full">
          Welcome back
        </span>
        <input
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
        <input
          type="submit"
          value="Sign in"
          className="rounded-xl mx-2 xs:mx-4 p-3 xs:p-4 cursor-pointer bg-cyan-700 hover:bg-cyan-600
                      w-64 xs:w-80"
        />
        <p className="text-center w-full">
          <span className="opacity-50">Not joined yet?</span>
          <span
            className="text-cyan-500 hover:text-cyan-400 cursor-pointer"
            onClick={() => setDialogueContent(<RegisterForm />)}
          >
            {" "}
            SIGN UP
          </span>
        </p>
      </form>
    </Box>
  );
}

export default LoginForm;
