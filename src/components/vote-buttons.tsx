import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IconButton, Text, VStack } from "@chakra-ui/react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import db from "../lib/firebase";
import { IPost } from "./post";

interface VoteButtonsProps {
  post: IPost
}

const VoteButtons: React.FC<VoteButtonsProps> = ({ post }) => {
  const getLocalStorageVotedPosts = () => {
    const localStorageVoted = localStorage.getItem("votes");
    return localStorageVoted ? JSON.parse(localStorageVoted) : []
  }


  const [voted, setVoted] = useState<boolean>(() => {
    return getLocalStorageVotedPosts().indexOf(post.id) > -1
  })

  
  const handleDisablingOfVoting = () => {
    const newVotedPosts = [...getLocalStorageVotedPosts(), post.id]

    localStorage.setItem("votes", JSON.stringify(newVotedPosts));
    setVoted(true)
  };

  const handleClick = async (type: string) => {
    handleDisablingOfVoting()

    // Do calculation to save the vote.
    let upVotesCount = post.upVotesCount ?? 0;
    let downVotesCount = post.downVotesCount ?? 0;

    const date = new Date();

    if (type === "upvote") {
      upVotesCount = upVotesCount + 1;
    } else {
      downVotesCount = downVotesCount + 1;
    }

    await db.collection("posts").doc(post.id).set({
      title: post.title,
      upVotesCount,
      downVotesCount,
      createdAt: post.createdAt,
      updatedAt: date.toUTCString(),
    });


  };


  return (
    <>
      <VStack>
        <IconButton
          size="lg"
          colorScheme="purple"
          aria-label="Upvote"
          icon={<FiArrowUp />}
          onClick={() => handleClick("upvote")}
          isDisabled={voted}
        />
        <Text bg="gray.100" rounded="md" w="100%" p={1}>
          {post.upVotesCount}
        </Text>
      </VStack>
      <VStack>
        <IconButton
          size="lg"
          colorScheme="yellow"
          aria-label="Downvote"
          icon={<FiArrowDown />}
          onClick={() => handleClick("downvote")}
          isDisabled={voted}
        />
        <Text bg="gray.100" rounded="md" w="100%" p={1}>
          {post.downVotesCount}
        </Text>
      </VStack>
    </>
  );
};

export default VoteButtons;