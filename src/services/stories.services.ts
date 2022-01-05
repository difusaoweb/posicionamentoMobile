// import api from './api'
// import { StoryInterface } from '../redux/types'

// export const storiesService = {
//   updateStories,
//   updateMyStory,
//   watchStory
// }

// async function updateStories(): Promise<StoryInterface[]> {
//   // return await getFromServer('/api/');
//   const { data } = await api
//     .get('affirmations/home')
//   return data
// }

// async function updateMyStory(): Promise<StoryInterface[]> {
//   // return await getFromServer('/api/');
//   return testData.myStory
// }

// async function watchStory({ storyId }: { storyId: String }): Promise<StoryInterface[]> {
//   // return await getFromServer('/api/');
//   const stories = testData.stories
//   stories.map(story => {
//     if (story.id == storyId) {
//       story.isSeen = true
//     }
//   })
//   return stories
// }
