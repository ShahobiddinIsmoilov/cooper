import { ReactNode, createContext, useContext, useState } from "react";

interface DialogueProps {
  isDialogueVisible: boolean;
  setIsDialogueVisible: (e: boolean) => void;
  handleDialogueClose: () => void;
  dialogueContent: ReactNode;
  setDialogueContent: (e: ReactNode) => void;
}

const DialogueContext = createContext<DialogueProps | null>(null);

export function useDialogue() {
  return useContext(DialogueContext) as DialogueProps;
}

interface DialogueProviderProps {
  children: ReactNode;
}

function DialogueProvider({ children }: DialogueProviderProps) {
  const [isDialogueVisible, setIsDialogueVisible] = useState(false);
  const [dialogueContent, setDialogueContent] = useState<ReactNode | null>(
    null
  );

  function handleDialogueClose() {
    setIsDialogueVisible(false);
  }

  let contextData = {
    isDialogueVisible: isDialogueVisible,
    setIsDialogueVisible: setIsDialogueVisible,
    handleDialogueClose: handleDialogueClose,
    dialogueContent: dialogueContent,
    setDialogueContent: setDialogueContent,
  };

  return (
    <DialogueContext.Provider value={contextData}>
      {children}
    </DialogueContext.Provider>
  );
}

export default DialogueProvider;
