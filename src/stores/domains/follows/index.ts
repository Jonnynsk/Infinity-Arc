import {
  applySnapshot,
  flow,
  Instance,
  SnapshotIn,
  types,
} from "mobx-state-tree";
import { AxiosError } from "axios";

import { errorDev } from "@/helpers";

import { followUser, getFollowing, unfollowUser } from "@/api/requests/follows";

import { useStoreUsers } from "../users";
import { FollowUserModel } from "@/stores/models/Follow";

import {
  TFollowUserResponse,
  TFollowUsersResponse,
} from "@/api/requests/follows/types";

const StoreFollows = types
  .model("StoreFollows", {
    following: types.optional(types.array(FollowUserModel), []),
    totalFollowing: types.optional(types.number, 0),
    followers: types.optional(types.array(FollowUserModel), []),
    totalFollowers: types.optional(types.number, 0),
    isFollowingLoading: types.optional(types.boolean, false),
    isFollowersLoading: types.optional(types.boolean, false),
    isFollowUserLoading: types.optional(types.boolean, false),
    isUnfollowUserLoading: types.optional(types.boolean, false),
  })
  .actions((self) => {
    const setFollowing = (following: SnapshotIn<typeof FollowUserModel>[]) => {
      applySnapshot(self.following, following);
    };

    const setTotalFollowing = (total: number) => {
      self.totalFollowing = total;
    };

    const setFollowers = (followers: SnapshotIn<typeof FollowUserModel>[]) => {
      applySnapshot(self.followers, followers);
    };

    const setTotalFollowers = (total: number) => {
      self.totalFollowers = total;
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

    const setIsUnfollowUserLoading = (value: boolean) => {
      self.isUnfollowUserLoading = value;
    };

    const getFollowingUsers = flow(function* () {
      setIsFollowingLoading(true);

      try {
        const response: TFollowUsersResponse = yield getFollowing();

        if (response) {
          setFollowing(response.users);
          setTotalFollowing(response.total);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("getFollowingUsers", error.response);
        }
      } finally {
        setIsFollowingLoading(false);
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
      getFollowingUsers,
      followUserAction,
      unfollowUserAction,
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
