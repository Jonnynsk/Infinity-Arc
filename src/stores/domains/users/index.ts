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

import { getProfile, updateProfile } from "@/api/requests";

import { TProfileRequest, TProfileResponse } from "@/api/requests/users/types";

import FollowersIcon from "@/public/icons/socials/followers.svg";
import FollowingIcon from "@/public/icons/socials/following.svg";
import PostsIcon from "@/public/icons/socials/posts.svg";
import LikesIcon from "@/public/icons/socials/likes.svg";
import CommentsIcon from "@/public/icons/socials/comments.svg";
import TelegramIcon from "@/public/icons/socialMedia/telegram.png";
import YouTubeIcon from "@/public/icons/socialMedia/youtube.png";
import InstagramIcon from "@/public/icons/socialMedia/instagram.png";
import XIcon from "@/public/icons/socialMedia/twitter.png";

const StoreUsers = types
  .model("StoreUsers", {
    myProfile: types.optional(ProfileModel, {}),
    isMyProfileLoading: types.optional(types.boolean, false),
    name: types.optional(InputModel, {}),
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

    const onChangeName = (value: string) => {
      self.name.setValue(value);
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

    const updateMyProfile = flow(function* (data: Partial<TProfileRequest>) {
      setIsMyProfileLoading(true);

      try {
        const response: TProfileResponse = yield updateProfile(data);

        if (response) {
          setMyProfile(response);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("updateMyProfile", error.response);
        }
      } finally {
        setIsMyProfileLoading(false);
      }
    });

    return {
      getMyProfile,
      onChangeAboutMe,
      onChangeName,
      updateMyProfile,
    };
  })
  .views((self) => ({
    get inputAboutMeHandler() {
      return {
        value: self.aboutMe.value,
        onChange: self.onChangeAboutMe,
        errors: self.aboutMe.errors,
        clear: self.aboutMe.clear,
        setValue: self.aboutMe.setValue,
      };
    },
    get inputNameHandler() {
      return {
        value: self.name.value,
        onChange: self.onChangeName,
        errors: self.name.errors,
        clear: self.name.clear,
        setValue: self.name.setValue,
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
    get socialLinks() {
      return [
        {
          id: 0,
          title: "Telegram",
          icon: TelegramIcon,
          link: "https://t.me/infinity_arc",
        },
        {
          id: 1,
          title: "YouTube",
          icon: YouTubeIcon,
          link: "",
        },
        {
          id: 2,
          title: "Instagram",
          icon: InstagramIcon,
          link: "https://www.instagram.com/infinity_arc",
        },
        {
          id: 3,
          title: "X (Twitter)",
          icon: XIcon,
          link: "https://x.com/infinity_arc",
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
