import { IoMdClose } from "react-icons/io";

import { useDialog } from "../contexts/DialogContext";
import { useAuthContext } from "../contexts/AuthContext";

function LogoutForm() {
  const { handleDialogClose, setIsDialogVisible } = useDialog();
  const { logoutUser } = useAuthContext();

  return (
    <div
      className="bg-dark-850 text-white px-8 py-4 rounded-xl
                  flex flex-col items-end"
    >
      <IoMdClose
        className="text-2xl opacity-50 hover:opacity-100 cursor-pointer"
        onClick={handleDialogClose}
      />
      <p className="text-2xl text-center w-full my-2">
        Are you sure you want to log out?
      </p>
      <p className="text-lg flex justify-end mb-4 mt-8">
        <span
          onClick={handleDialogClose}
          className="rounded-xl mx-2 xs:mx-4 p-3 xs:p-4 cursor-pointer w-64 xs:w-48
                    text-center bg-dark-800 hover:bg-dark-700"
        >
          Stay logged in
        </span>
        <span
          onClick={() => {
            setIsDialogVisible(false);
            logoutUser();
          }}
          className="rounded-xl mx-2 xs:mx-4 p-3 xs:p-4 cursor-pointer w-64 xs:w-48
                  bg-dark-900 hover:bg-dark-600 text-center"
        >
          Log out
        </span>
      </p>
    </div>
  );
}

export default LogoutForm;
