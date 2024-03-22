import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDialog } from "../contexts/DialogContext";
import { useAuthContext } from "../contexts/AuthContext";
import { ImSpinner4 } from "react-icons/im";

function LogoutForm() {
  const { handleDialogClose, setIsDialogVisible } = useDialog();
  const { logoutUser } = useAuthContext();
  const [showSpinner, setShowSpinner] = useState(false);

  // ------------------------ Handling outside click ------------------------ //
  const logoutFormRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(e: any) {
      if (logoutFormRef.current && !logoutFormRef.current.contains(e.target))
        handleClose();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [logoutFormRef, showSpinner]);
  // ------------------------------------------------------------------------ //

  function handleClose() {
    !showSpinner && handleDialogClose();
  }

  function handleLogout() {
    setShowSpinner(true);
    setTimeout(() => {
      setIsDialogVisible(false);
      logoutUser();
    }, 1000);
  }

  return (
    <div
      tabIndex={0}
      autoFocus={true}
      ref={logoutFormRef}
      className="bg-dark-850 text-white px-8 py-4 rounded-xl
                  flex flex-col items-end border border-white"
    >
      <button>
        <IoMdClose
          className="text-2xl opacity-50 hover:opacity-100 cursor-pointer"
          onClick={handleClose}
        />
      </button>
      <p className="text-2xl text-center w-full my-2">
        {showSpinner ? "Logging out..." : "Are you sure you want to log out?"}
      </p>
      <p className="text-lg flex justify-end mb-4 mt-8">
        <button
          onClick={handleClose}
          className="rounded-xl mx-2 xs:mx-4 p-3 xs:p-4 cursor-pointer w-64 xs:w-48
                    text-center bg-dark-800 hover:bg-dark-700"
        >
          Stay logged in
        </button>
        <button
          disabled={showSpinner && true}
          onClick={handleLogout}
          className={`rounded-xl mx-2 xs:mx-4 p-3 xs:p-4 ${
            showSpinner
              ? "cursor-not-allowed bg-dark-600"
              : "cursor-pointer bg-dark-900 hover:bg-dark-600"
          } w-64 xs:w-48 flex justify-center items-center`}
        >
          {showSpinner ? (
            <ImSpinner4 size={22} className="animate-spin" />
          ) : (
            "Log out"
          )}
        </button>
      </p>
    </div>
  );
}

export default LogoutForm;
