import {
  applySnapshot,
  flow,
  getSnapshot,
  Instance,
  SnapshotIn,
  types,
} from "mobx-state-tree";
import { ChangeEvent } from "react";
import { AxiosError } from "axios";
import z from "zod";

import { ProfileModel } from "@/stores/models/Profile";
import { InputModel } from "@/stores/models/Input";

import { errorDev } from "@/helpers";
import { ALLOWED_TYPES, MAX_FILE_SIZE, SocialStatsTitles } from "@/constants";

import {
  getProfile,
  getUserByUsername,
  suggestedUsers,
  updateProfile,
  uploadAvatar,
} from "@/api/requests";

import {
  TProfileRequest,
  TProfileResponse,
  TUploadAvatarResponse,
} from "@/api/requests/users/types";

import ProfilePostsIcon from "@/public/icons/profile/posts.svg";
import ProfileAboutIcon from "@/public/icons/profile/about.svg";
import ProfileSavedIcon from "@/public/icons/profile/bookmark.svg";

const SOCIAL_ORDER = ["Telegram", "YouTube", "Instagram", "X (Twitter)"];
const SOCIAL_STATS_ORDER = [
  "Followers",
  "Following",
  "Posts",
  "Likes Received",
  "Comments",
];

const enum ErrorMessages {
  USER_NOT_FOUND = "User not found",
}

export const avatarSchema = z
  .file()
  .min(1)
  .max(MAX_FILE_SIZE, { message: "File size must be less than 5MB" })
  .refine((file) => ALLOWED_TYPES.includes(file.type), {
    message: "Please select an image in JPG, PNG or WEBP format",
  });

const StoreUsers = types
  .model("StoreUsers", {
    myProfile: types.optional(ProfileModel, {}),
    isMyProfileLoading: types.optional(types.boolean, false),
    name: types.optional(InputModel, {}),
    location: types.optional(InputModel, {}),
    aboutMe: types.optional(InputModel, {}),
    isEditMode: types.optional(types.boolean, false),
    profileActiveTab: types.optional(types.number, 0),
    usersProfileActiveTab: types.optional(types.number, 0),
    suggestedUsers: types.optional(types.array(ProfileModel), []),
    isSuggestedUsersLoading: types.optional(types.boolean, false),

    // avatar
    previewAvatar: types.maybeNull(types.string),
    avatarError: types.optional(types.string, ""),
    isAvatarErrorModal: types.optional(types.boolean, false),
    isUploadAvatarLoading: types.optional(types.boolean, false),

    // user by username
    userInfo: types.optional(ProfileModel, {}),
    isUserLoading: types.optional(types.boolean, false),
    userNotFound: types.optional(types.boolean, false),
  })
  .actions((self) => {
    const setMyProfile = (value: SnapshotIn<typeof ProfileModel>) => {
      applySnapshot(self.myProfile, value);
    };

    const setUserInfo = (value: SnapshotIn<typeof ProfileModel>) => {
      applySnapshot(self.userInfo, value);
    };

    const setSuggestedUsers = (value: SnapshotIn<typeof ProfileModel>[]) => {
      applySnapshot(self.suggestedUsers, value);
    };

    const setUserNotFound = (value: boolean) => {
      self.userNotFound = value;
    };

    const setIsMyProfileLoading = (value: boolean) => {
      self.isMyProfileLoading = value;
    };

    const setIsUploadAvatarLoading = (value: boolean) => {
      self.isUploadAvatarLoading = value;
    };

    const setIsUserLoading = (value: boolean) => {
      self.isUserLoading = value;
    };

    const setIsSuggestedUsersLoading = (value: boolean) => {
      self.isSuggestedUsersLoading = value;
    };

    const setIsEditMode = (value: boolean) => {
      self.isEditMode = value;
    };

    const setProfileActiveTab = (value: number) => {
      self.profileActiveTab = value;
    };

    const setUsersProfileActiveTab = (value: number) => {
      self.usersProfileActiveTab = value;
    };

    const setPreviewAvatar = (value: string | null) => {
      self.previewAvatar = value;
    };

    const setAvatarError = (value: string) => {
      self.avatarError = value;
    };

    const setIsAvatarErrorModal = (value: boolean) => {
      self.isAvatarErrorModal = value;
    };

    const openAvatarErrorModal = () => {
      setIsAvatarErrorModal(true);
    };

    const closeAvatarErrorModal = () => {
      setIsAvatarErrorModal(false);
    };

    const onChangeAboutMe = (value: string) => {
      self.aboutMe.setValue(value);
    };

    const onChangeName = (value: string) => {
      self.name.setValue(value);
    };

    const onChangeLocation = (value: string) => {
      self.location.setValue(value);
    };

    const updateLikesReceivedCount = (increment: boolean) => {
      const likesStats = self.myProfile.socialStats.find(
        (stat) => stat.title === SocialStatsTitles.LIKES_RECEIVED
      );
      if (likesStats) {
        increment ? likesStats.increment() : likesStats.decrement();
      }
    };

    const updateCommentsCount = (increment: boolean) => {
      const commentsStats = self.myProfile.socialStats.find(
        (stat) => stat.title === SocialStatsTitles.COMMENTS
      );
      if (commentsStats) {
        increment ? commentsStats.increment() : commentsStats.decrement();
      }
    };

    const updatePostsCount = (increment: boolean) => {
      const postsStats = self.myProfile.socialStats.find(
        (stat) => stat.title === SocialStatsTitles.POSTS
      );
      if (postsStats) {
        increment ? postsStats.increment() : postsStats.decrement();
      }
    };

    const updateFollowingCount = (increment: boolean) => {
      const followingStats = self.myProfile.socialStats.find(
        (stat) => stat.title === SocialStatsTitles.FOLLOWING
      );
      if (followingStats) {
        increment ? followingStats.increment() : followingStats.decrement();
      }
    };

    const updateUserFollowersCount = (userId: string, increment: boolean) => {
      const followersStats = self.userInfo?.socialStats.find(
        (stat) => stat.title === SocialStatsTitles.FOLLOWERS
      );
      if (followersStats && userId === self.userInfo?.id) {
        increment ? followersStats.increment() : followersStats.decrement();
      }
    };

    const validateAvatar = (file: File) => {
      const result = avatarSchema.safeParse(file);
      if (!result.success) {
        const errorMessage = result.error.issues[0]?.message || "Invalid file";
        setAvatarError(errorMessage);
        openAvatarErrorModal();
        return false;
      }
      setAvatarError("");
      return true;
    };

    const onPreviewAvatarFile = flow(function* (
      e: ChangeEvent<HTMLInputElement>
    ) {
      const file = e.target.files?.[0];
      const inputElement = e.target;

      if (!file) return;

      if (!validateAvatar(file)) {
        setPreviewAvatar(null);
        inputElement.value = "";
        return;
      }

      const preview: string = yield new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      setPreviewAvatar(preview);
      yield uploadMyAvatar(file);

      if (!self.myProfile.avatar) {
        setPreviewAvatar(null);
      }

      inputElement.value = "";
    });

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

    const updateSocialLink = (id: string, newLink: string) => {
      const updatedSocialNetwork = self.myProfile.socialNetworks.map(
        (network) => ({
          id: network.id,
          title: network.title,
          link: network.id === id ? newLink : network.link,
        })
      );

      updateMyProfile({
        socialNetworks: updatedSocialNetwork,
      });
    };

    const uploadMyAvatar = flow(function* (file: File) {
      setIsUploadAvatarLoading(true);

      try {
        const response: TUploadAvatarResponse = yield uploadAvatar(file);

        if (response?.url) {
          setMyProfile({
            ...getSnapshot(self.myProfile),
            avatar: response.url,
          });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("uploadMyAvatar", error.response);
        }
      } finally {
        setIsUploadAvatarLoading(false);
      }
    });

    const getUser = flow(function* (username: string) {
      setIsUserLoading(true);
      setUserNotFound(false);
      setUserInfo({});

      try {
        const response: TProfileResponse = yield getUserByUsername(username);

        if (response) {
          setUserInfo(response);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("getUser", error.response);
        }

        if (
          error instanceof AxiosError &&
          error.response?.data.message === ErrorMessages.USER_NOT_FOUND
        ) {
          setUserNotFound(true);
        }
      } finally {
        setIsUserLoading(false);
      }
    });

    const getSuggestedUsers = flow(function* () {
      setIsSuggestedUsersLoading(true);

      try {
        const response: TProfileResponse[] = yield suggestedUsers();
        if (response) {
          setSuggestedUsers(response);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("getSuggestedUsers", error.response);
        }
      } finally {
        setIsSuggestedUsersLoading(false);
      }
    });

    return {
      getMyProfile,
      getUser,
      onChangeAboutMe,
      onChangeName,
      onChangeLocation,
      updateMyProfile,
      updateSocialLink,
      uploadMyAvatar,
      setIsEditMode,
      setPreviewAvatar,
      onPreviewAvatarFile,
      closeAvatarErrorModal,
      setProfileActiveTab,
      setUsersProfileActiveTab,
      updateLikesReceivedCount,
      updateCommentsCount,
      updatePostsCount,
      updateFollowingCount,
      updateUserFollowersCount,
      getSuggestedUsers,
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
    get inputLocationHandler() {
      return {
        value: self.location.value,
        onChange: self.onChangeLocation,
        errors: self.location.errors,
        clear: self.location.clear,
        setValue: self.location.setValue,
      };
    },
    get profileTabsList() {
      return [
        {
          id: 0,
          title: "Posts",
          icon: ProfilePostsIcon,
        },
        {
          id: 1,
          title: "About",
          icon: ProfileAboutIcon,
        },
        {
          id: 2,
          title: "Saved",
          icon: ProfileSavedIcon,
        },
      ];
    },
    get usersProfileTabsList() {
      return [
        {
          id: 0,
          title: "Posts",
          icon: ProfilePostsIcon,
        },
        {
          id: 1,
          title: "About",
          icon: ProfileAboutIcon,
        },
      ];
    },
    get sortedSocialNetworks() {
      return [...self.myProfile.socialNetworks].sort((a, b) => {
        return SOCIAL_ORDER.indexOf(a.title) - SOCIAL_ORDER.indexOf(b.title);
      });
    },
    get sortedUserSocialNetworks() {
      return [...self.userInfo.socialNetworks].sort((a, b) => {
        return SOCIAL_ORDER.indexOf(a.title) - SOCIAL_ORDER.indexOf(b.title);
      });
    },
    get sortedSocialStats() {
      return [...self.myProfile.socialStats].sort((a, b) => {
        return (
          SOCIAL_STATS_ORDER.indexOf(a.title) -
          SOCIAL_STATS_ORDER.indexOf(b.title)
        );
      });
    },
    get sortedUserSocialStats() {
      return [...self.userInfo.socialStats].sort((a, b) => {
        return (
          SOCIAL_STATS_ORDER.indexOf(a.title) -
          SOCIAL_STATS_ORDER.indexOf(b.title)
        );
      });
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
