import {
  applySnapshot,
  flow,
  Instance,
  SnapshotIn,
  types,
} from "mobx-state-tree";
import { AxiosError } from "axios";

import { IProfileModel, ProfileModel } from "@/stores/models/Profile";

import { errorDev } from "@/helpers";

import { getProfile } from "@/api/requests";

import { TProfileResponse } from "@/api/requests/users/types";

const StoreUsers = types
  .model("StoreUsers", {
    myProfile: types.optional(ProfileModel, {}),
    isMyProfileLoading: types.optional(types.boolean, false),
  })
  .actions((self) => {
    const setMyProfile = (value: IProfileModel) => {
      self.myProfile = value;
    };

    const setIsMyProfileLoading = (value: boolean) => {
      self.isMyProfileLoading = value;
    };

    const getMyProfile = flow(function* () {
      setIsMyProfileLoading(true);

      try {
        const response: TProfileResponse = yield getProfile();

        if (response) {
          setMyProfile(response);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("getMyProfile", error.response);
        }
      } finally {
        setIsMyProfileLoading(false);
      }
    });

    return {
      getMyProfile,
    };
  });

interface IStoreUsers extends Instance<typeof StoreUsers> {}
interface IStoreUsersSnapshotIn extends SnapshotIn<typeof StoreUsers> {}

let store: IStoreUsers;

function useStoreUsers(snapshot?: IStoreUsersSnapshotIn): IStoreUsers {
  if (!store) {
    store = StoreUsers.create();
  }

  if (snapshot) {
    applySnapshot(store, snapshot);
  }

  return store;
}

export { StoreUsers, useStoreUsers };
export type { IStoreUsers, IStoreUsersSnapshotIn };
