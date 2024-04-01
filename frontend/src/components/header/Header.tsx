import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useDisclosure } from "@mantine/hooks";
import { Button, Modal, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import ProfileMenu from "./ProfileMenu";

export default function Header() {
  return (
    <div className="flex justify-between bg-dark-900 h-full text-white px-4 xs:px-8 py-2 items-center">
      <Link to="/" className="no-underline">
        <p className="text-base xs:text-2xl">Shredded</p>
      </Link>
      <Authenticated />
    </div>
  );
}

// THERE IS AN ANNOYING BUG WHERE SAVING FROM LOGINFORM, REGISTERFORM AND
// LOGOUTFORM CAUSE THIS FUCKER TO HAVE A NULL USER WHEN USING AUTHCONTEXT.
// THAT IS WHY THIS LITTLE SHIT HAS ITS OWN IMPLEMENTATION OF INITIALIZING
// THE USER FROM THE LOCALSTORAGE. THIS CAN'T BE A SOLUTION TO THAT BUG!!!
function Authenticated() {
  const { user, loginUser } = useAuthContext();
  const [opened, { open, close }] = useDisclosure();
  const loginForm = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  return user ? (
    <ProfileMenu />
  ) : (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        radius={12}
        shadow="xs"
        keepMounted={false}
      >
        <form onSubmit={loginForm.onSubmit((values) => loginUser(values))}>
          <p className="text-2xl text-center">Welcome back</p>
          <Stack gap="xl" p="md">
            <TextInput
              maxLength={32}
              size="lg"
              data-autofocus
              radius={12}
              {...loginForm.getInputProps("username")}
              placeholder="Username"
            />
            <PasswordInput
              size="lg"
              data-autofocus
              radius={12}
              placeholder="Password"
              {...loginForm.getInputProps("password")}
            />
            <Button
              className="bg-cyan-700 hover:bg-cyan-600 p-3 rounded-xl text-lg h-12"
              type="submit"
            >
              Log in
            </Button>
          </Stack>
        </form>
      </Modal>
      <button onClick={open}>Log in</button>
    </>
  );
}
