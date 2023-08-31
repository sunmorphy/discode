import React, { useEffect, useState } from "react";
import ThreadList from "../components/sections/threads/ThreadList";
import LeaderboardList from "../components/sections/leaderboards/LeaderboardList";
import { useDispatch, useSelector } from "react-redux";
import { asyncPopulateUsersThreadsAndLeaderboards } from "../state/shared/action";
import {
  asyncToggleVoteThread,
  filterThreadsActionCreator,
} from "../state/threads/action";
import PropTypes from "prop-types";
import CategoryList from "../components/sections/categories/CategoryList";
import { ClickableField } from "../components/fields";
import toast from "react-hot-toast";

function HomePage({ setLoginModal, setAddThreadModal }) {
  const [isCategoryExist, setIsCategoryExist] = useState(false);
  const {
    authUser,
    leaderboards = [],
    threads = [],
    tempThreads = [],
    categories = [],
    users = [],
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersThreadsAndLeaderboards()).catch((e) =>
      toast.error(e),
    );
  }, [dispatch]);

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUserId: authUser?.id,
  }));

  const onVoteThread = ({ id, isUpVote }) => {
    authUser
      ? dispatch(asyncToggleVoteThread({ threadId: id, isUpVote }))
          .catch((e) => toast.error(e))
      : setLoginModal(true);
  };

  const onCategoryFilter = (category) => {
    dispatch(filterThreadsActionCreator({ threads: tempThreads, category }));
    setIsCategoryExist(true);
  };

  const onClearFilter = () => {
    dispatch(asyncPopulateUsersThreadsAndLeaderboards()).catch((e) =>
      toast.error(e),
    );
    setIsCategoryExist(false);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-16 pt-8 sm:pt-12 lg:pt-16">
      <div className="col-span-2 md:col-span-1 flex flex-col gap-14">
        <CategoryList
          isCategoryExist={isCategoryExist}
          categories={categories}
          onCategoryClick={onCategoryFilter}
          onClearClick={onClearFilter}
        />
        <LeaderboardList leaderboards={leaderboards} />
      </div>
      <div className="flex flex-col gap-12 col-span-2 break-words mt-16 md:mt-0">
        {authUser && (
          <div className="w-full flex flex-row items-center gap-4">
            <img
              src={authUser.avatar}
              alt={authUser.name}
              className="w-10 h-10 aspect-square rounded-md"
            />
            <ClickableField
              placeholder="Create thread..."
              classes="w-full"
              onClick={() => {
                setAddThreadModal(true);
              }}
            />
          </div>
        )}
        <ThreadList
          threads={threadList}
          onVoteThread={(id, isUpVote) => onVoteThread({ id, isUpVote })}
          onCategoryClick={onCategoryFilter}
        />
      </div>
    </div>
  );
}

HomePage.propTypes = {
  setLoginModal: PropTypes.func.isRequired,
  setAddThreadModal: PropTypes.func.isRequired,
};

export default HomePage;
