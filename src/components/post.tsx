import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";
import VoteButtons from "./vote-buttons";

export interface IPost {
  id: string
  title?: string
  createdAt?: Date
  upVotesCount?: number
  downVotesCount?: number
}

 interface PostProps {
  post: IPost
}

const Post = ({ post }: PostProps) => {
  return (
    <HStack key={post.id} w="100%" alignItems="flex-start">
           <VoteButtons post={post} />
      <Box bg="gray.100" p={4} rounded="md" w="100%">
        <Text>{post.title}</Text>
      </Box>
    </HStack>
  );
};

export default Post;
