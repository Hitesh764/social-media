import { Modal, useMantineTheme } from "@mantine/core";
import "@mantine/core/styles.css";

import Postshare from '../postShare/Postshare'

function Sharemodal({ modalOpened, setmodalOpened }) {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.85}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setmodalOpened(false)}
    >

    <Postshare />
      
    </Modal>
    
  );
}

export default Sharemodal;
