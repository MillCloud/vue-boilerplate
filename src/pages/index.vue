<template>
  <el-main>
    <el-row class="center">
      <h6 class="prose-lg">这里是首页</h6>
    </el-row>
    <el-row class="my-4 center">
      <el-button @click="refetchPosts">Refetch</el-button>
      <el-button @click="createPost">Create</el-button>
      <el-button @click="updatePost">Update</el-button>
      <el-button @click="patchPost">Patch</el-button>
      <el-button @click="deletePost">Delete</el-button>
    </el-row>
    <el-row>
      <div v-if="isPostsLoading" class="text-center">Loading posts...</div>
      <div v-else-if="isPostsError" class="text-center">
        An error has occurred: {{ postsError }}
      </div>
      <div v-else-if="posts">
        <ul>
          <li v-for="item in posts" :key="item.id">
            {{ item.id }}
          </li>
        </ul>
      </div>
    </el-row>
  </el-main>
</template>

<script setup lang="ts">
import { useQuery, useMutation, useQueryClient } from 'vue-query';

const queryClient = useQueryClient();

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const {
  isLoading: isPostsLoading,
  isError: isPostsError,
  data: posts,
  error: postsError,
  refetch: refetchPosts,
} = useQuery<Post[]>('https://jsonplaceholder.typicode.com/posts');

const { mutate: mutatePost } = useMutation<
  Response,
  unknown,
  Record<string, any>
>({
  onSuccess: () => {
    queryClient.invalidateQueries('https://jsonplaceholder.typicode.com/posts');
  },
});

const createPost = () => {
  mutatePost({
    url: 'https://jsonplaceholder.typicode.com/posts',
    data: {
      title: 'foo',
      body: 'bar',
      userId: 1,
    },
  });
};

const updatePost = () => {
  mutatePost({
    method: 'PUT',
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    data: {
      id: 1,
      title: 'foo',
      body: 'bar',
      userId: 1,
    },
  });
};

const patchPost = () => {
  mutatePost({
    method: 'PATCH',
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    data: {
      title: 'foo',
    },
  });
};

const deletePost = () => {
  mutatePost({
    method: 'DELETE',
    url: 'https://jsonplaceholder.typicode.com/posts/1',
  });
};
</script>
