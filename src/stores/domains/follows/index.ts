import {
  applySnapshot,
  flow,
  Instance,
  SnapshotIn,
  types,
} from "mobx-state-tree";
import { AxiosError } from "axios";

import { errorDev } from "@/helpers";

import {
  followUser,
  getFollowers,
  getFollowing,
  getUserFollowers,
  getUserFollowing,
  unfollowUser,
} from "@/api/requests/follows";

import { useStoreUsers } from "../users";
import { FollowsUserModel } from "@/stores/models/Follow";

import {
  TFollowUserResponse,
  TFollowUsersResponse,
} from "@/api/requests/follows/types";

const StoreFollows = types
  .model("StoreFollows", {
    followers: types.optional(FollowsUserModel, {}),
    following: types.optional(FollowsUserModel, {}),
    isFollowingLoading: types.optional(types.boolean, false),
    isFollowersLoading: types.optional(types.boolean, false),
    isFollowersModalVisible: types.optional(types.boolean, false),
    isFollowingModalVisible: types.optional(types.boolean, false),

    isFollowUserLoading: types.optional(types.boolean, false),
    isUnfollowUserLoading: types.optional(types.boolean, false),

    userFollowing: types.optional(FollowsUserModel, {}),
    userFollowers: types.optional(FollowsUserModel, {}),
    isUserFollowingLoading: types.optional(types.boolean, false),
    isUserFollowersLoading: types.optional(types.boolean, false),
    isUserFollowersModalVisible: types.optional(types.boolean, false),
    isUserFollowingModalVisible: types.optional(types.boolean, false),
  })
  .actions((self) => {
    const setFollowers = (followers: SnapshotIn<typeof FollowsUserModel>) => {
      applySnapshot(self.followers, followers);
    };
    const setFollowing = (following: SnapshotIn<typeof FollowsUserModel>) => {
      applySnapshot(self.following, following);
    };

    const setUserFollowers = (
      followers: SnapshotIn<typeof FollowsUserModel>
    ) => {
      applySnapshot(self.userFollowers, followers);
    };

    const setUserFollowing = (
      following: SnapshotIn<typeof FollowsUserModel>
    ) => {
      applySnapshot(self.userFollowing, following);
    };

    const setIsFollowingLoading = (value: boolean) => {
      self.isFollowingLoading = value;
    };

    const setIsFollowersLoading = (value: boolean) => {
      self.isFollowersLoading = value;
    };

    const setIsFollowUserLoading = (value: boolean) => {
      self.isFollowUserLoading = value;
    };

    const setIsUserFollowersLoading = (value: boolean) => {
      self.isUserFollowersLoading = value;
    };

    const setIsUserFollowingLoading = (value: boolean) => {
      self.isUserFollowingLoading = value;
    };

    const setIsUnfollowUserLoading = (value: boolean) => {
      self.isUnfollowUserLoading = value;
    };

    const setIsFollowersModalVisible = (value: boolean) => {
      self.isFollowersModalVisible = value;
    };

    const setIsFollowingModalVisible = (value: boolean) => {
      self.isFollowingModalVisible = value;
    };

    const setIsUserFollowersModalVisible = (value: boolean) => {
      self.isUserFollowersModalVisible = value;
    };

    const setIsUserFollowingModalVisible = (value: boolean) => {
      self.isUserFollowingModalVisible = value;
    };

    const openFollowersModal = flow(function* () {
      setIsFollowersModalVisible(true);
      yield getProfileFollowers();
    });

    const closeFollowersModal = () => {
      setIsFollowersModalVisible(false);
    };

    const openFollowingModal = flow(function* () {
      setIsFollowingModalVisible(true);
      yield getProfileFollowing();
    });

    const closeFollowingModal = () => {
      setIsFollowingModalVisible(false);
    };

    const openUserFollowersModal = flow(function* (userId: string) {
      setIsUserFollowersModalVisible(true);
      yield getUsersFollowers(userId);
    });

    const closeUserFollowersModal = () => {
      setIsUserFollowersModalVisible(false);
    };

    const openUserFollowingModal = flow(function* (userId: string) {
      setIsUserFollowingModalVisible(true);
      yield getUsersFollowing(userId);
    });

    const closeUserFollowingModal = () => {
      setIsUserFollowingModalVisible(false);
    };

    const getProfileFollowers = flow(function* () {
      setIsFollowersLoading(true);

      try {
        const response: TFollowUsersResponse = yield getFollowers();

        if (response) {
          setFollowers(response);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("getProfileFollowers", error.response);
        }
      } finally {
        setIsFollowersLoading(false);
      }
    });

    const getProfileFollowing = flow(function* () {
      setIsFollowingLoading(true);

      try {
        const response: TFollowUsersResponse = yield getFollowing();

        if (response) {
          setFollowing(response);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("getProfileFollowing", error.response);
        }
      } finally {
        setIsFollowingLoading(false);
      }
    });

    const getUsersFollowers = flow(function* (userId: string) {
      setIsUserFollowersLoading(true);

      try {
        const response: TFollowUsersResponse = yield getUserFollowers(userId);

        if (response) {
          setUserFollowers(response);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("getUsersFollowers", error.response);
        }
      } finally {
        setIsUserFollowersLoading(false);
      }
    });

    const getUsersFollowing = flow(function* (userId: string) {
      setIsUserFollowingLoading(true);

      try {
        const response: TFollowUsersResponse = yield getUserFollowing(userId);

        if (response) {
          setUserFollowing(response);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("getUsersFollowing", error.response);
        }
      } finally {
        setIsUserFollowingLoading(false);
      }
    });

    const followUserAction = flow(function* (userId: string) {
      setIsFollowUserLoading(true);

      const { updateFollowingCount, updateUserFollowersCount, userInfo } =
        useStoreUsers();

      try {
        const response: TFollowUserResponse = yield followUser(userId);

        if (response) {
          updateFollowingCount(true);
          updateUserFollowersCount(userId, true);
          userInfo?.setIsFollowing(true);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("followUserAction", error.response);
        }
      } finally {
        setIsFollowUserLoading(false);
      }
    });

    const unfollowUserAction = flow(function* (userId: string) {
      setIsUnfollowUserLoading(true);

      const { updateFollowingCount, updateUserFollowersCount, userInfo } =
        useStoreUsers();

      try {
        const response: TFollowUserResponse = yield unfollowUser(userId);

        if (response) {
          updateFollowingCount(false);
          updateUserFollowersCount(userId, false);
          userInfo?.setIsFollowing(false);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("unfollowUserAction", error.response);
        }
      } finally {
        setIsUnfollowUserLoading(false);
      }
    });

    return {
      getProfileFollowing,
      getProfileFollowers,
      followUserAction,
      unfollowUserAction,
      openFollowersModal,
      closeFollowersModal,
      openFollowingModal,
      closeFollowingModal,
      getUsersFollowers,
      getUsersFollowing,
      openUserFollowersModal,
      closeUserFollowersModal,
      openUserFollowingModal,
      closeUserFollowingModal,
    };
  });

interface IStoreFollows extends Instance<typeof StoreFollows> {}
interface IStoreFollowsSnapshotIn extends SnapshotIn<typeof StoreFollows> {}

let store: IStoreFollows;

function useStoreFollows(snapshot?: IStoreFollowsSnapshotIn): IStoreFollows {
  if (!store) {
    store = StoreFollows.create();
  }

  if (snapshot) {
    applySnapshot(store, snapshot);
  }

  return store;
}

export { StoreFollows, useStoreFollows };
export type { IStoreFollows, IStoreFollowsSnapshotIn };
