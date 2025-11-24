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
import { ALLOWED_TYPES, MAX_FILE_SIZE } from "@/constants";

import { getProfile, updateProfile, uploadAvatar } from "@/api/requests";

import {
  TProfileRequest,
  TProfileResponse,
  TUploadAvatarResponse,
} from "@/api/requests/users/types";

import FollowersIcon from "@/public/icons/socials/followers.svg";
import FollowingIcon from "@/public/icons/socials/following.svg";
import PostsIcon from "@/public/icons/socials/posts.svg";
import LikesIcon from "@/public/icons/socials/likes.svg";
import CommentsIcon from "@/public/icons/socials/comments.svg";

const SOCIAL_ORDER = ["Telegram", "YouTube", "Instagram", "X (Twitter)"];

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
    aboutMe: types.optional(InputModel, {}),
    isEditMode: types.optional(types.boolean, false),
    
    // avatar
    previewAvatar: types.maybeNull(types.string),
    avatarError: types.optional(types.string, ""),
    isAvatarErrorModal: types.optional(types.boolean, false),
    isUploadAvatarLoading: types.optional(types.boolean, false),
  })
  .actions((self) => {
    const setMyProfile = (value: SnapshotIn<typeof ProfileModel>) => {
      applySnapshot(self.myProfile, value);
    };

    const setIsMyProfileLoading = (value: boolean) => {
      self.isMyProfileLoading = value;
    };

    const setIsUploadAvatarLoading = (value: boolean) => {
      self.isUploadAvatarLoading = value;
    };

    const setIsEditMode = (value: boolean) => {
      self.isEditMode = value;
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
          setMyProfile({ ...getSnapshot(self.myProfile), avatar: response.url })
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("uploadMyAvatar", error.response);
        }
      } finally {
        setIsUploadAvatarLoading(false);
      }
    });

    return {
      getMyProfile,
      onChangeAboutMe,
      onChangeName,
      updateMyProfile,
      updateSocialLink,
      uploadMyAvatar,
      setIsEditMode,
      setPreviewAvatar,
      onPreviewAvatarFile,
      closeAvatarErrorModal,
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
    get sortedSocialNetworks() {
      return [...self.myProfile.socialNetworks].sort((a, b) => {
        return SOCIAL_ORDER.indexOf(a.title) - SOCIAL_ORDER.indexOf(b.title);
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
