import {
  applySnapshot,
  flow,
  Instance,
  SnapshotIn,
  types,
} from "mobx-state-tree";
import { AxiosError } from "axios";

import { IProfileModel, ProfileModel } from "@/stores/models/Profile";
import { InputModel } from "@/stores/models/Input";

import { errorDev } from "@/helpers";

import { getProfile } from "@/api/requests";

import { TProfileResponse } from "@/api/requests/users/types";

import FollowersIcon from "@/public/icons/socials/followers.svg";
import FollowingIcon from "@/public/icons/socials/following.svg";
import PostsIcon from "@/public/icons/socials/posts.svg";
import LikesIcon from "@/public/icons/socials/likes.svg";
import CommentsIcon from "@/public/icons/socials/comments.svg";

const StoreUsers = types
  .model("StoreUsers", {
    myProfile: types.optional(ProfileModel, {}),
    isMyProfileLoading: types.optional(types.boolean, false),
    aboutMe: types.optional(InputModel, {}),
  })
  .actions((self) => {
    const setMyProfile = (value: IProfileModel) => {
      self.myProfile = value;
    };

    const setIsMyProfileLoading = (value: boolean) => {
      self.isMyProfileLoading = value;
    };

    const onChangeAboutMe = (value: string) => {
      self.aboutMe.setValue(value);
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
      onChangeAboutMe,
    };
  })
  .views((self) => ({
    get inputAboutMeHandler() {
      return {
        value: self.aboutMe.value,
        onChange: self.onChangeAboutMe,
        errors: self.aboutMe.errors,
      };
    },
    get socialStats() {
      return [
        {
          id: 0,
          title: "Followers",
          value: 1247,
          icon: FollowersIcon,
        },
        {
          id: 1,
          title: "Following",
          value: 342,
          icon: FollowingIcon,
        },
        {
          id: 2,
          title: "Posts",
          value: 156,
          icon: PostsIcon,
        },
        {
          id: 3,
          title: "Likes Received",
          value: 8924,
          icon: LikesIcon,
        },
        {
          id: 4,
          title: "Comments",
          value: 2145,
          icon: CommentsIcon,
        },
      ];
    },
  }));

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
