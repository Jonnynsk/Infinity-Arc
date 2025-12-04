import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Input } from "@/components/Input";

import { MAX_TEXTAREA_LENGTH } from "@/constants";

import { useStoreUsers } from "@/stores/domains/users";

export const EditMode = observer(() => {
  const {
    inputAboutMeHandler,
    inputNameHandler,
    inputLocationHandler,
    myProfile,
  } = useStoreUsers();

  useEffect(() => {
    inputNameHandler.setValue(myProfile.name);
    inputAboutMeHandler.setValue(myProfile.aboutMe);
    inputLocationHandler.setValue(myProfile.location);
  }, [myProfile.name, myProfile.aboutMe, myProfile.location]);

  return (
    <>
      <Input
        label="Name"
        placeholder="Enter your name"
        value={inputNameHandler.value}
        onChange={inputNameHandler.onChange}
      />
      <Input
        label="Location"
        placeholder="Enter your location"
        value={inputLocationHandler.value}
        onChange={inputLocationHandler.onChange}
      />
      <Input
        label="About me"
        placeholder="Enter something about yourself"
        value={inputAboutMeHandler.value}
        onChange={inputAboutMeHandler.onChange}
        isTextarea
        maxLength={MAX_TEXTAREA_LENGTH}
      />
    </>
  );
});
