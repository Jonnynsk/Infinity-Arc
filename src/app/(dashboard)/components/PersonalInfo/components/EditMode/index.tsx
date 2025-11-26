import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Input } from "@/components/Input";

import { useStoreUsers } from "@/stores/domains/users";

export const EditMode = observer(() => {
  const { inputAboutMeHandler, inputNameHandler, myProfile } = useStoreUsers();

  useEffect(() => {
    inputNameHandler.setValue(myProfile.name);
    inputAboutMeHandler.setValue(myProfile.aboutMe);
  }, [myProfile.name, myProfile.aboutMe]);

  return (
    <>
      <Input
        label="Name"
        placeholder="Enter your name"
        value={inputNameHandler.value}
        onChange={inputNameHandler.onChange}
      />
      <Input
        label="About me"
        placeholder="Enter something about yourself"
        value={inputAboutMeHandler.value}
        onChange={inputAboutMeHandler.onChange}
        isTextarea
      />
    </>
  );
});
